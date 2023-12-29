import 'normalize.css' //初始化样式
import '@/styles/index.scss' //自定义样式
import { createApp } from 'vue'
import App from '@/App.vue'
import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate' //pinia持久化插件
import router from '@/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn' //elementplus中文插件
import 'virtual:svg-icons-register' //svg图标
import { init } from '@/utils/init' //初始化

// app实例
const app = createApp(App)

// pinia
const pinia = createPinia().use(persist)
app.use(pinia)

// 初始化
init()

//路由
app.use(router)

// ElementPlus
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
