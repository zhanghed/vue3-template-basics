<script setup lang="ts">
import Menu from './Menu/index.vue'
import Tabbar from './Tabbar/index.vue'
import Logo from './Logo/index.vue'
</script>
<template>
  <div class="layout">
    <el-row class="row">
      <!-- 左侧 -->
      <el-col class="col-left" :span="3">
        <!-- logo -->
        <div class="logo">
          <Logo></Logo>
        </div>
        <!-- 菜单 -->
        <div class="menu">
          <el-scrollbar class="el-scrollbar">
            <!-- 菜单栏 -->
            <Menu></Menu>
          </el-scrollbar>
        </div>
      </el-col>
      <!-- 右侧 -->
      <el-col class="col-right" :span="21">
        <!-- 导航 -->
        <div class="tab">
          <div class="tabbar"><Tabbar></Tabbar></div>
        </div>
        <!-- 内容 -->
        <div class="content">
          <el-scrollbar class="el-scrollbar">
            <!-- 二级路由出口 -->
            <RouterView />
          </el-scrollbar>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.layout {
  width: 100vw;
  height: 100vh;
  .row {
    width: 100vw;
    height: 100vh;
    .col-left {
      height: 100vh;
      .logo {
        padding: 1vh;
      }
      .menu {
        padding: 1vh;
        .el-scrollbar {
          height: 92vh;
        }
      }
    }
    .col-right {
      height: 100vh;
      .tab {
        padding: 1vh;
        .tabbar {
          height: 4vh;
        }
      }
      .content {
        padding: 1vh;
        .el-scrollbar {
          height: 92vh;
        }
      }
    }
  }
}
</style>
