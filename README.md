## 项目说明

前端项目基于"Vue3 + Vite4 + TypeScript5 + Pinia + ElementPlus + echarts"

后端项目基于"node + express + mockjs + mongodb"

## 环境准备

安装 nodejs + mongodb

全局安装 `npm i pnpm -g`

安装依赖 server 与 project 根目录下分别运行`pnpm i`

导入数据 server 根目录下运行 `pnpm run mock`

## 部署启动

project 根目录下运行 `pnpm run build`

"project/dist/"下的文件复制到 "server/static/"下

server 根目录下运行 `pnpm run server`

浏览器访问"http://127.0.0.1:3001"
