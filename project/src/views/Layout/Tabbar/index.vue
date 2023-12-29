<!-- tabbar -->
<script setup lang="ts">
import {
  ArrowRight,
  Refresh,
  Setting,
  CloseBold
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { storeUser } from '@/stores/user'
import { apiLogout } from '@/services/user'
import router from '@/router'
import { ElMessage } from 'element-plus'

const useStoreUser = storeUser()
// 路由信息
const $useRoute = useRoute()
// 刷新
const reload = () => {
  window.location.reload()
}
// 退出
const confirmEvent = async () => {
  await apiLogout()
  useStoreUser.delUser() //删用户信息
  router.push({ path: '/login' })
  ElMessage({ type: 'success', message: '退出登录' })
}
</script>
<template>
  <el-row class="tabbar">
    <!-- 左侧 -->
    <el-col class="col-left" :span="12">
      <!-- 面包屑 -->
      <el-breadcrumb :separator-icon="ArrowRight">
        <template v-for="(item, index) in $useRoute.matched" :key="index">
          <el-breadcrumb-item v-if="item.name != 'layout'">{{
            item.meta.title
          }}</el-breadcrumb-item>
        </template>
      </el-breadcrumb>
    </el-col>
    <!-- 右侧 -->
    <el-col class="col-right" :span="12">
      <el-space wrap size="large">
        <!-- 刷新 -->
        <el-button :icon="Refresh" circle @click="reload" />
        <!-- 退出 -->
        <el-popconfirm title="是否退出？" @confirm="confirmEvent">
          <template #reference>
            <el-button :icon="CloseBold" circle />
          </template>
        </el-popconfirm>
        <!-- 头像 -->
        <img
          :src="useStoreUser.user?.avatar"
          alt=""
          style="width: 32px; height: 32px"
        />
        <!-- 用户名 -->
        <span>{{ useStoreUser.user?.username }}</span>
      </el-space>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.tabbar {
  height: 100%;
  .col-left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .col-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>
