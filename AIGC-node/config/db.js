const { Sequelize } = require("sequelize");
const { database, user, password, host } = require("@/config/default").db;

const db = new Sequelize(database, user, password, {
  host,
  dialect: "mysql",
  logging: false,
  define: {
    freezeTableName: true, //禁止给表命称加s
    timestamps: false, //不自动添加时间戳
  },
  sync: {
    force: false, //不会强制删除现有表并且重新创建表
  },
});
db.sync(); //如果表不存在则创建表，如果存在则不做任何操作
module.exports = db;