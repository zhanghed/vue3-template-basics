// 使用mock模拟数据
// 存入mongodb中

const Mock = require("mockjs");
const { client, movies_orders } = require("../db");

// 数据模板
const template = {
  "list|20": [
    {
      id: "@id", // id
      name: "@cname", // 名字
      status: "@boolean", // 状态
      "price|3": "@integer(0,9)", // 价格
      title: "@ctitle(10,20)", // 标题
      address: "@county(try)", // 地址
      date: "@date", // 日期
      "phone|11": "@integer(0,9)", // 手机号
    },
  ],
};

// 存入数据库
const set_db = async (movies, data) => {
  // 查询记录
  const count = await movies.countDocuments({ id: data.id });
  // 未查到则插入
  if (count === 0) return await movies.insertOne(data);
  // 查到则替换
  return await movies.replaceOne({ id: data.id }, data);
};

(async () => {
  try {
    // 生成数据列表
    const data = Mock.mock(template);
    // 存入数据库
    for (let i of data.list) {
      const result = await set_db(movies_orders, i);
      if (!result.acknowledged) console.log(result);
    }
  } catch (err) {
    throw err;
  } finally {
    client.close();
  }
})();
