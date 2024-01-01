// 使用mock模拟数据 并且 存入mongodb

const Mock = require("mockjs");
const { client, movies_orders, movies_users } = require("../db");
// 存用户信息
const set_user = async () => {
  // 用户数据
  const users = [
    {
      username: "root", //用户名
      password: "admin123", //密码
      status: "0", //状态
      menuIndex: "0", //菜单序号
      router:
        '{"router":[{"name":"login"},{"name":"home"},{"name":"orders"},{"name":"about"},{"name":"more","children":[{"name":"about"}]},{"name":"layout","children":[{"name":"home"},{"name":"orders"},{"name":"more","children":[{"name":"about"}]}]},{"name":"404"},{"name":"any"}]}', //路由权限
      avatar:
        "https://foruda.gitee.com/avatar/1676339226088898195/5449503_zhanghed_1676339226.png!avatar200", //头像
    },
  ];
  await movies_users.deleteMany();
  return await movies_users.insertMany(users);
};

// 存订单信息
const set_orders = async () => {
  // 订单数据模板
  const template = {
    "list|168": [
      {
        id: "@id", // id
        name: "@cname", // 名字
        "status|1": ["已完成", "配送中", "已出库", "售后中", "已备货"], // 状态
        "price|3": "@integer(0,9)", // 价格
        title: "@ctitle(10,20)", // 标题
        address: "@county(try)", // 地址
        date: "@date", // 日期
        "phone|11": "@integer(0,9)", // 手机号
      },
    ],
  };
  const data = Mock.mock(template);
  await movies_orders.deleteMany();
  return await movies_orders.insertMany(data.list);
};

(async () => {
  try {
    const result1 = await set_user();
    console.log("set_user:", result1.acknowledged);
    const result2 = await set_orders();
    console.log("set_orders:", result2.acknowledged);
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
})();
