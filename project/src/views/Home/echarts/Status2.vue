<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { apiOrders } from '@/services'

const main = ref()
let option = {
  title: {
    text: '订单完成情况'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  xAxis: {
    type: 'category',
    data: ['已完成', '未完成']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
}

onMounted(async () => {
  const l = ['已完成', '配送中', '已出库', '售后中', '已备货']
  option.xAxis.data = l
  for (let index = 0; index < l.length; index++) {
    const res = await apiOrders({ status: l[index] }, 0, 100)
    const count = res.data.count
    option.series[0].data.push(count as never)
  }

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
