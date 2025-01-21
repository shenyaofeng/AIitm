const db = require('@/config/db')
const { DataTypes } = require("sequelize");
const dayjs = require("dayjs");
//用户表
const user = db.define("user-info", {
  phone: {
    type: DataTypes.STRING,
    allowNull: false, //不允许为空
    primaryKey: true, //主键不重复不为空
    comment: "用户手机号",
  },
  date: {
    type: DataTypes.STRING,
    defaultValue: dayjs().format("YYYY-MM-DD HH:mm:ss"),
  },
});

module.exports = user