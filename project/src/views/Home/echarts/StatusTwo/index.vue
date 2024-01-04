<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    default: null
  }
})

const main = ref()
let chart = ref()
let option = {
  title: {
    text: '订单情况'
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
    data: ['已完成', '配送中', '已出库', '售后中', '已备货']
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

onMounted(() => {
  chart.value = echarts.init(main.value)
})

watch(props.data, (v) => {
  option.series[0].data = v as any
  chart.value.setOption(option)
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
