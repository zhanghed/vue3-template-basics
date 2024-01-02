## 项目说明

前端项目基于 Vue3 + Vite4 + TypeScript5 + Pinia + ElementPlus + echarts

后端项目基于 node + express + mockjs + mongodb

![avatar](http://baidu.com/pic/doge.png)

## 环境准备

安装 nodejs + mongodb

安装 pnpm `npm i pnpm -g`

安装依赖 server 与 project 根目录下分别运行`pnpm i`

导入数据 server 根目录下运行 `pnpm run mock`

## 部署启动

前端项目打包 project 根目录下运行 `pnpm run build`

文件部署 "project/dist/"下的文件复制到 "server/static/"下

启动服务 server 根目录下运行 `pnpm run server`

浏览器访问 "http://127.0.0.1:3001"
