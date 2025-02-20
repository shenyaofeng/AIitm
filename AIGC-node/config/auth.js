// token相关操作
const basicAuth = require("basic-auth");
const jwt = require("jsonwebtoken");
const authority = async (ctx,next) => {
  const token = ctx.get("Authorization");
  if (!token) {
    ctx.throw(401, "no authorization detected in request " + "headers");
  }
  try {
    const decoded = jwt.verify(token, "syfsyfsyfzuishuaihhh");
    console.log(decoded);
  } catch (err) {
    ctx.throw(401, "token失效");
  }
  await next();
};

module.exports = authority