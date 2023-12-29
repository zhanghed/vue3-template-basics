<script setup lang="ts">
import { ref } from 'vue'
import { apiLogin } from '@/services/user'
import { storeUser } from '@/stores/user'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { init } from '@/utils/init'

const useStoreUser = storeUser()
const router = useRouter()
const form = ref({ username: 'root', password: 'admin123' })
const rules = ref({
  username: [{ required: true, trigger: 'blur', message: '账号不能为空' }],
  password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
})
const loginFormRef = ref()

// 登录
const onSubmit = async () => {
  // 验证表单
  await loginFormRef?.value?.validate()
  // 发请求
  const res = await apiLogin({
    username: form.value.username,
    password: form.value.password
  })
  // 用户信息持久化
  useStoreUser.setUser(res.data)

  // 初始化
  init()

  // 跳转到首页
  router.push('/home')

  ElMessage({ type: 'success', message: `登录成功` })
}
</script>
<template>
  <div class="login">
    <el-row justify="space-between">
      <el-col :span="8"></el-col>
      <el-col :span="8" class="col-center">
        <el-form :model="form" :rules="rules" ref="loginFormRef">
          <el-form-item label="" prop="username">
            <el-input :prefix-icon="User" v-model.trim="form.username" />
          </el-form-item>
          <el-form-item label="" prop="password">
            <el-input
              :prefix-icon="Lock"
              type="password"
              v-model.trim="form.password"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button class="but" type="primary" @click="onSubmit()"
              >登 录</el-button
            >
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100vh;
  .col-center {
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .but {
    width: 100%;
  }
}
</style>
