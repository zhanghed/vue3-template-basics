<script setup lang="ts">
import { apiDate } from '@/services'
import { ref, onMounted } from 'vue'

let data = ref()
onMounted(async () => {
  // 获取系统时间
  const res = await apiDate()
  data.value = res.data
})
</script>
<template>
  <div>
    {{ data }}
  </div>
</template>
<style lang="scss" scoped></style>
