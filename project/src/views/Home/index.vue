<script setup lang="ts">
import StatusOne from './echarts/StatusOne/index.vue'
import StatusTwo from './echarts/StatusTwo/index.vue'
import { apiOrders } from '@/services'
import { ref, onMounted } from 'vue'

let data: any = ref([])

onMounted(async () => {
  const list = ['已完成', '配送中', '已出库', '售后中', '已备货']
  let temp = []
  for (let i = 0; i < list.length; i++) {
    const res = await apiOrders({ status: list[i] }, 0, 100)
    temp.push({ name: list[i], value: res.data.count })
  }
  data.value.push(...temp) //解决父子组件异步重复监听的问题
})
</script>
<template>
  <div class="home">
    <StatusOne :data="data"></StatusOne>
    <StatusTwo :data="data"></StatusTwo>
    <StatusOne :data="data"></StatusOne>
    <StatusTwo :data="data"></StatusTwo>
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
