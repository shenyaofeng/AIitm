const Validator = require("@/validator/index");
const User = require("@/model/userdb");
class UserController {
  async login(ctx) {
    console.log("login");
    console.log(ctx.request.body);
    const { phone } = ctx.request.body;
    console.log(typeof phone);
    await Validator.nullCheck(phone, "用户名不能为空", "phone");
    // await Validator.nullCheck(age, "年龄不能为空", "age");
    await User.create({
      phone: phone
    });
    ctx.send(ctx.request.body);
  }
}

module.exports = new UserController();