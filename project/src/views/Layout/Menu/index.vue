<script setup lang="ts">
import router from '@/router'
import { storeUser } from '@/stores'
import type { RouteRecordName } from 'vue-router'
import SvgIcon from '@/components/SvgIcon/index.vue'

const useStoreUser = storeUser()
// 菜单列表
const routerList = router.getRoutes().find((item) => item.name === 'layout')
// 菜单序号
const menuIndex = useStoreUser.user!.menuIndex

// 回调函数
const callback = (item: String, index: String) => {
  // 跳转页面
  router.push({
    name: item as RouteRecordName
  })
  // 菜单序号持久化
  useStoreUser.setMenuIndex(String(index))
}
</script>
<template>
  <el-menu :default-active="menuIndex">
    <template v-for="(item1, index1) in routerList?.children" :key="item1.name">
      <!-- 有子菜单 -->
      <el-sub-menu v-if="item1.children" :index="String(index1)">
        <template #title>
          <el-icon>
            <svg-icon
              :name="item1.meta?.icon as string"
              width="20px"
              height="20px"
              color="#000"
            >
            </svg-icon>
          </el-icon>
          <span>{{ item1.meta?.title }}</span>
        </template>
        <template v-for="(item2, index2) in item1.children" :key="item2.name">
          <el-menu-item
            @click="
              callback(
                item2.name as string,
                String(index1) + '-' + String(index2)
              )
            "
            :index="String(index1) + '-' + String(index2)"
            ><template #title>
              <el-icon>
                <svg-icon
                  :name="item2.meta?.icon as string"
                  width="20px"
                  height="20px"
                  color="#000"
                ></svg-icon>
              </el-icon>
              <span>{{ item2.meta?.title }}</span>
            </template></el-menu-item
          >
        </template>
      </el-sub-menu>
      <!-- 没有子菜单 -->
      <el-menu-item
        v-else
        @click="callback(item1.name as string, String(index1))"
        :index="String(index1)"
      >
        <template #title>
          <el-icon>
            <svg-icon
              :name="item1.meta?.icon as string"
              width="20px"
              height="20px"
              color="#000"
            ></svg-icon>
          </el-icon>
          <span>{{ item1.meta?.title }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="scss" scoped></style>
