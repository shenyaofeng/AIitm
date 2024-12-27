class Validator{
  //校验缺少字段名
  async undefinedCheck(val,par){
    if(val === undefined){
      throw {msg:`缺少${par}字段`,code:400}
    }
  }
  //空值和字符串
  async nullCheck(val,tips,par){
    await this.undefinedCheck(val,par)
    //参数为空的情况
    if(val.trim() === ""){
      throw {msg:tips,code:400}
    }
    //参数为非字符串的情况
    if(typeof val !== 'string'){
      throw {msg:`${par}字段必须是字符串类型`,code:422}
    }
  }
}
module.exports = new Validator();