const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const { movies_users, movies_orders } = require("../db");
const config = require("../config.json");
const datetime = require("silly-datetime");

// 登录
router.post("/api/login", async (req, res) => {
  try {
    const info = req.body;
    const query = { username: info.username };
    const count = await movies_users.countDocuments(query);
    if (count === 0) return res.err(403, "账号错误");
    const cursor = movies_users.find(query);
    for await (let i of cursor) {
      if (i.status === "1") return res.err(403, "账号已关闭");
      if (i.password != info.password) return res.err(403, "密码错误");
      // 验证通过
      i.token = jwt.sign({ username: info.username }, config.app.secretKey, {
        expiresIn: "60s",
      });
      res.ok(200, "登录成功", i);
    }
  } catch (err) {
    console.log(err);
  }
});

// 订单
router.get("/orders", async (req, res) => {
  try {
    const info = req.query;
    const query = { ...JSON.parse(info.condition) }; //条件
    const skip = parseInt(info.skip); //起始序号
    const limit = parseInt(info.limit); //获取个数

    const count = await movies_orders.countDocuments(query);

    if (count === 0) {
      return res.ok(200, "获取成功", { orders: [], count: count });
    }

    const cursor = movies_orders.find(query).skip(skip).limit(limit);
    const orders = [];
    for await (let i of cursor) {
      orders.push(i);
    }

    res.ok(200, "获取成功", { orders: orders, count: count });
  } catch (err) {
    console.log(err);
  }
});

// 项目链接
router.get("/url", async (req, res) => {
  const url = "https://gitee.com/zhanghed/vue3-template-basics";
  res.ok(200, "获取成功", url);
});

// 退出登录
router.get("/api/logout", (req, res) => {
  res.ok(200, "退出登录", null);
});

module.exports = router;
