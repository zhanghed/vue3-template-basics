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
  <a href="" @click="click">{{ data }}</a>
</template>

<style lang="scss" scoped></style>
