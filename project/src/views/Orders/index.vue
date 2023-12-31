<script setup lang="ts">
import { apiOrders } from '@/services'
import { ref, watch } from 'vue'

let data = ref()
const count = ref(0) //记录条数
const n = 100 //每页条数
const currentPage = ref(1) //页码
const dialogVisible = ref(false) // 弹出框
const dialogText = ref()
const form = ref({
  id: null,
  status: null
})

// 条件查询
const onSubmit = async () => {
  const condition = {} as any
  if (form.value.id) condition.id = form.value.id
  if (form.value.status) condition.status = form.value.status

  const res = await apiOrders(condition, 0, n)
  data.value = res.data.orders
  count.value = res.data.count
}

// 监听页码变化
watch(currentPage, async (newv) => {
  const skip = n * (newv - 1)
  const limit = n

  const res = await apiOrders({}, skip, limit)
  data.value = res.data.orders
  count.value = res.data.count
})

// 弹框
const dialog = (row: any) => {
  dialogVisible.value = true
  dialogText.value = row
}
</script>
<template>
  <div class="orders">
    <!-- 表单 -->
    <el-form class="form" :inline="true" :model="form">
      <el-form-item label="">
        <el-input
          class="el-form-item"
          v-model.trim="form.id"
          placeholder="订单编号"
          clearable
        />
      </el-form-item>
      <el-form-item class="el-form-item" label="">
        <el-select v-model.trim="form.status" placeholder="订单状态" clearable>
          <el-option label="已备货" value="已备货" />
          <el-option label="已出库" value="已出库" />
          <el-option label="配送中" value="配送中" />
          <el-option label="已完成" value="已完成" />
          <el-option label="售后中" value="售后中" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="data"
      height="80vh"
      style="width: 100%"
      @cell-click="dialog"
    >
      <el-table-column prop="id" label="订单编号" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="phone" label="电话" />
      <el-table-column prop="address" label="地址" />
      <el-table-column prop="price" label="金额" />
      <el-table-column prop="status" label="状态" />
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      v-show="count"
      v-model:current-page="currentPage"
      :page-size="n"
      layout="total, prev, pager, next"
      :total="count"
    />
    <!-- 弹框 -->
    <el-dialog v-model="dialogVisible" title="详情" width="30%">
      <el-card>
        <div v-for="(v, k) in dialogText" :key="v">{{ k }} : {{ v }}</div>
      </el-card>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-form-item {
  width: 20vh;
}
</style>
