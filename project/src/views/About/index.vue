<script setup lang="ts">
import { apiUrl } from '@/services'
import { ref, onMounted } from 'vue'

const data = ref()
const click = () => {
  // 跳转
  window.open(data.value)
}
onMounted(async () => {
  // 获取链接
  const res = await apiUrl()
  data.value = res.data
})
</script>
<template>
  <el-card class="card" shadow="hover">
    <template #header>
      <span>项目地址</span>
    </template>
    <a href="" @click="click">{{ data }}</a>
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  width: 30%;
}
</style>
