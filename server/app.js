const express = require("express");
const cors = require("cors");
const expressJWT = require("express-jwt");
const router = require("./router");
const config = require("./config.json");
const history = require("connect-history-api-fallback"); //解决 访问资源 404 问题

//实例
const app = express();

// 使用中间件connect-history-api-fallback
app.use(history());

//静态资源
app.use(express.static(__dirname + "/static"));

//跨域
app.use(cors());

//解析json
app.use(express.json());

// 响应封装
app.use((req, res, next) => {
  res.ok = (code = NaN, r = "成功", data = null) => {
    res.send({
      code: code,
      message: r,
      data,
    });
  };
  res.err = (code = NaN, r = "错误", data = null) => {
    res.send({
      code: code,
      message: r instanceof Error ? r.message : r,
      data,
    });
  };
  next();
});

// 解析token  /api开头的不需要验证token
app.use(
  expressJWT
    .expressjwt({ secret: config.app.secretKey, algorithms: ["HS256"] })
    .unless({
      path: [/^\/api\//],
    })
);

//路由
app.use(router);

// 异常处理
app.use((err, req, res, next) => {
  // 统一处理token解析验证错误
  if (err.name === "UnauthorizedError") return res.err(401, "无效token");
  // 其他未知错误
  res.err(500, "未知错误");
});

// 监听端口
app.listen(config.app.listen, () => {
  console.log(String(config.app.http + ":" + config.app.listen));
});
