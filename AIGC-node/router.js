const Router = require("@koa/router"); //路由
const router = new Router();
//用户登陆相关
const zhipu = require("@/controller/zhipuai");
const user = require("@/controller/user");
//注册接口
router.post("/user/register", user.register);
//登陆接口
router.post("/user/login", user.login);
router.post("/aicompletions", zhipu.createCompletions);
// router.post("/user/register", );
module.exports = router;