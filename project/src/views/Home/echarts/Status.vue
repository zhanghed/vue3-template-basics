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
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
}

onMounted(async () => {
  // 未完成
  const res2 = await apiOrders({ status: false }, 0, 100)
  const countTrue2 = res2.data.count
  option.series[0].data.push({ value: countTrue2, name: '未完成' })
  // 已完成
  const res1 = await apiOrders({ status: true }, 0, 100)
  const countTrue1 = res1.data.count
  option.series[0].data.push({ value: countTrue1, name: '已完成' })
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
