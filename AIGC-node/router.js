const Router = require("@koa/router"); //路由
const router = new Router();
//用户登陆相关
const zhipu = require("@/controller/zhipuai");
const user = require("@/controller/user");
//登陆接口
router.post('/login', user.login)

router.post("/aicompletions", zhipu.createCompletions);
module.exports = router;