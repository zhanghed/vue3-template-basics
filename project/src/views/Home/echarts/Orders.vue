<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { apiOrders } from '@/services'

const main = ref()
let option = {
  title: {
    text: '订单情况'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: ['订单']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '订单',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: [120, 132, 101, 134, 90, 230, 210]
    }
  ]
}
// TODO 按日期聚合统计单数  日期为x轴 单数为series
onMounted(async () => {
  // 已完成
  const res1 = await apiOrders({ status: true }, 0, 100)
  const countTrue1 = res1.data.count

  // 未完成
  const res2 = await apiOrders({ status: false }, 0, 100)
  const countTrue2 = res2.data.count

  // 渲染图表
  echarts.init(main.value).setOption(option)
})
</script>
<template>
  <el-card class="card">
    <div ref="main" style="width: 100%; height: 35vh"></div>
  </el-card>
</template>
<style lang="scss" scoped>
.card {
  width: 45%;
}
</style>
