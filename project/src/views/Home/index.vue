<script setup lang="ts">
import Status from './echarts/Status.vue'
import Orders from './echarts/Orders.vue'
</script>
<template>
  <div class="home">
    <Orders></Orders>
    <Status></Status>
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
