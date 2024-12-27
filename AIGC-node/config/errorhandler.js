const logger = require("@/loggerMiddleware");
//捕获错误的中间件
const errorhandler = async (ctx, next) => {
  try {
    await next();
    logger.info(`输出日志：${ctx.request.method} ${ctx.request.url}`);
  } catch (errorData) {
    logger.error(errorData)
    console.log("有错误",errorData)
    //参数相关错误
    if(errorData.code){
      ctx.send(null,errorData.code,errorData.msg)
    }else{
      const error = errorData.message || "未知错误";
      const status = errorData.status || errorData.statusCode || 500;
      ctx.send(null, status, "服务器异常", error);
    }
  }
};
module.exports = errorhandler;