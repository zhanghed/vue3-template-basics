# 说明

## 前端项目 project

Vue3 + Vite4 + TypeScript5 + Pinia + ElementPlus + echarts

## 后端项目 server

node + express + mockjs + mongodb

# 环境

## 安装 node

...

## 安装 pnpm

`npm i pnpm -g`

## 安装依赖 project、server

`pnpm i`

## 安装 mongodb

## 数据

`pnpm run mock`

# 部署

前端项目打包 project 根目录下运行`pnpm run build`

复制文件 project/dist/ --> server/static/

# 启动

启动服务 server 根目录下运行`pnpm run server`

浏览器访问 "http://127.0.0.1:3001"
