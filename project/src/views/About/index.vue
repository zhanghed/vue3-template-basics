<script setup lang="ts">
import { apiUrl } from '@/services'
import { ref, onMounted } from 'vue'

const data = ref()
const click = () => {
  window.open(data.value) // 跳转
}
onMounted(async () => {
  const res = await apiUrl() // 获取链接
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
