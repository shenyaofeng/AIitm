const Validator = require("@/validator/index");
const User = require("@/model/userdb");
const generateToken = require("@/config/jwt");
class UserController {
  // 登录
  async login(ctx) {
    try {
      const { username, password } = ctx.request.body;
      // 查询用户
      const user = await User.findOne({
        where: {
          username: username,
        },
      });
      // 验证用户是否存在
      if (user) {
        // 验证密码是否正确
        if (user.password !== password) {
          ctx.send("登录失败密码错误", 500, "fail", "登录失败密码错误", 502);
        } else {
          // 验证成功
          ctx.send({data:"登录成功",token:generateToken(username),username}, 200, "success", 200);
        }
      } else {
        ctx.send(
          "登录失败该用户未注册",
          500,
          "fail",
          "登录失败该用户未注册",
          503
        );
      }
      //其他未知错误
    } catch (error) {
      ctx.send(`登录失败:${error.message}`, 500, "fail", error.message, 504);
    }
  }
  // 注册
  async register(ctx) {
    try {
      const { username, password } = ctx.request.body;
      // 创建用户
      await User.create({
        username: username,
        password: password,
      });
      ctx.send(ctx.request.body);
    } catch (error) {
      // ctx.status = 500; // 设置状态码为 500，表示服务器内部错误
      ctx.send(`注册失败:${error.message}`, 500, "fail", error.message, 501);
    }
  }
}

module.exports = new UserController();
