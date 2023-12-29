// 连接mongodb数据库

const config = require("../config.json");
const { MongoClient } = require("mongodb");

// 连接
const client = new MongoClient(config.mongodb.client);
// 数据库
const db = client.db(config.mongodb.db);
// 用户
const movies_users = db.collection("users");
// 数据
const movies_orders = db.collection("orders");

module.exports = {
  client,
  db,
  movies_users,
  movies_orders,
};
