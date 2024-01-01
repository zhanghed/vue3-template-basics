# 说明

前后端项目 基础模板

前端项目 Vue3+Vite4+TypeScript5+Pinia+ElementPlus+echarts

后端项目 node+express+mockjs+mongodb

## 数据库

服务器安装 mongodb 数据库 默认地址为"mongodb://localhost:27017"

创建数据库"vue3-templote-basics"

创建用户集合"users"与订单集合"orders"

server 根目录下运行`pnpm run mock` 存入模拟数据

## 前端

project 根目录下运行`pnpm run build` 打包项目

将打包后的"project/dist"文件复制到"server/static"中

## 后端

server 根目录下运行`pnpm run server`启动服务端 默认监听地址"http://127.0.0.1:3001"

## 浏览器

浏览器访问"http://127.0.0.1:3001"
