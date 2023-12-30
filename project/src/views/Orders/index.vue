<script setup lang="ts">
import { apiOrders } from '@/services'
import { ref, onMounted, watch } from 'vue'

let data = ref()
const count = ref(1)
const n = 100
const currentPage = ref(1)

// 获取订单列表
const getOrders = async (condition: object, skip: number, limit: number) => {
  const res = await apiOrders({
    condition: JSON.stringify({ ...condition }), //筛选条件
    skip: skip, //起始序号
    limit: limit //获取个数
  })
  data.value = res.data.orders
  count.value = res.data.count
}
// 监听页码变化
watch(currentPage, (newv) => {
  const skip = n * (newv - 1)
  const limit = n
  getOrders({}, skip, limit)
})
// 初始加载
onMounted(async () => {
  getOrders({}, 0, n)
})
</script>
<template>
  <!-- 表单 -->
  TODO
  <!-- 表格 -->
  <el-table :data="data" height="80vh" style="width: 100%">
    <el-table-column prop="id" label="Id" />
    <el-table-column prop="name" label="Name" />
    <el-table-column prop="phone" label="Phone" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="price" label="Price" />
    <el-table-column prop="status" label="Status" />
  </el-table>
  <!-- 分页器 -->
  <el-pagination
    v-model:current-page="currentPage"
    :page-size="n"
    layout="total, prev, pager, next"
    :total="count"
  />
</template>

<style lang="scss" scoped></style>
