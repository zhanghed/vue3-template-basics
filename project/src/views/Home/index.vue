<script setup lang="ts">
import Status1 from './echarts/Status1.vue'
import Status2 from './echarts/Status2.vue'
import { apiOrders } from '@/services'
import { ref, onMounted } from 'vue'

let data: any = ref([])

onMounted(async () => {
  const list = ['已完成', '配送中', '已出库', '售后中', '已备货']
  for (let i = 0; i < list.length; i++) {
    const res = await apiOrders({ status: list[i] }, 0, 100)
    data.value.push({ name: list[i], value: res.data.count })
  }
})
</script>
<template>
  <div class="home">
    <Status1 :data="data"></Status1>
    <!-- <Status2 :data="data"></Status2> -->
  </div>
</template>
<style lang="scss" scoped>
.home {
  height: 90vh;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
</style>
