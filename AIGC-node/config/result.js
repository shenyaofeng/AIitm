//统一接口响应数据格式
const responseHandler = async (ctx,next) => {
  ctx.send = (
    data = null,
    code = 200,
    msg = "success",
    error = null,
    serviceCode = 200
  ) => {
    ctx.body = {
      code,
      msg,
      data,
      error,
      serviceCode
    }
  }
  await next()
}
module.exports = responseHandler