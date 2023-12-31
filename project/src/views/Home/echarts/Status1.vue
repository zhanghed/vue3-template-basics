<script setup lang="ts">
import { onMounted, ref, defineProps } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    default: null
  }
})

const main = ref()
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
// TODO
onMounted(() => {
  console.log(option)
  option.series[0].data = props.data as never
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
