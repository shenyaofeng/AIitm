const Koa = require('koa');
const app = new Koa();
//将http响应的数据转化为json格式
const json = require('koa-json'); 
//解析http请求的消息体
const bodyParser = require('koa-bodyparser'); 
//跨域处理
const cors = require('@koa/cors'); 
// 路径设置
const {addAliases} = require("module-alias")
addAliases({
    "@": __dirname
})
const router = require('@/router');
// 统一响应数据格式中间件
const responseHandler = require('@/config/result');
//捕获错误中间件
const errorhandler = require('@/config/errorhandler');
app.use(json());
app.use(bodyParser());
app.use(cors());
app.use(responseHandler);
app.use(errorhandler);
//有坑最后要加
app.use(router.routes()).use(router.allowedMethods());

app.listen(7000);
console.log('server is running at port 7000');