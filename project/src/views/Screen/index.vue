<script setup lang="ts">
import { apiOrders } from '@/services/orders'
import { ref, onMounted } from 'vue'

let data = ref()
onMounted(async () => {
  //  加载订单数据
  const res = await apiOrders({ condition: JSON.stringify({ status: true }) })
  data.value = res.data
})
</script>
<template>{{ data }}</template>

<style lang="scss" scoped></style>
