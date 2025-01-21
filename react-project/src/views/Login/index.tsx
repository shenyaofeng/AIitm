import { useState } from "react";
import "./index.scss"
// import axios from 'axios';
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../store/modules/userStore"
import { useNavigate } from "react-router-dom";
// http:192.168.43.147:7000;

const Login = () => {
  //
  const navigate = useNavigate();
  //
  const dispatch = useDispatch()
  // 倒计时
  const [tiem,setTime] = useState(10)
  //手机号
  const [phone, setPhone] = useState("");
  const phoneChange = (value:string) => {
    setPhone(value);
  };
  //验证码
  const [captcha, setCaptcha] = useState("");
  const captchaChange = (value:string) => {
    setCaptcha(value);
    if(value === '123456'){
      setLogin(false)
      setCapBtn(true)
      setCapBtn1(true)
    } 
    else{
      setLogin(true)
      setCapBtn1(false)
    }
  };
  // 登陆按钮状态
  const [login, setLogin] = useState(true);
  const [capBtn,setCapBtn] = useState(false)
  const [capBtn1,setCapBtn1] = useState(false)
  // const [inputPhone, setInputPhone] = useState("");
  // const tologin = () => {
  //   axios({
  //     method: 'post',
  //     url: 'http://127.0.0.1:7000/login',
  //     data: {
  //       phone: inputPhone
  //     }
  //   });
  // }
  // 表单提交
  const onFinish = () => {
    if(captcha === ''){
      message.success('发送成功,验证码为123456')
      setCapBtn(true)
      let time = 10
      const timer = setInterval(()=>{
        time--
        setTime(time)
        if(time === 0){
          clearInterval(timer)
          setCapBtn(false)
          setTime(10)
        }
      },1000)
    }else if(captcha !== '' && captcha !== '123456'){
      message.error('验证码错误请重新获取')
    }
    else{
      dispatch(setUserInfo({
        username: phone
      }))
      message.success('登陆成功')
      navigate('/', { replace: true })
    }
  }

  function btnText (){
    if (capBtn ){
      return `请${tiem}秒后重新获取`
    }else{
      return "获取验证码"
    }
  }
  return (
    <div className="login-background">
      <div className="login-continer">
        <div className="title">登陆体验更多精彩</div>
        <div className="form">
          <Form onFinish={onFinish} validateTrigger="onBlur" >
            <Form.Item
              name="phone"
              rules={[
                // 非空校验
                {
                  required: true,
                  message: "请输入手机号",
                },
                // 手机号校验
                {
                  pattern: /^1[3-9]\d{9}$/,
                  message: "请输入正确的手机号",
                },
              ]}>
              <Input className="number" placeholder="请输入手机号" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => phoneChange(e.target.value)}/>
            </Form.Item>
            <Form.Item
              rules={[{
                required: true,
                message: "请输入验证码",
              }]}>
              <Input className="number" placeholder="请输入验证码" value={captcha} onChange={(e: React.ChangeEvent<HTMLInputElement>) => captchaChange(e.target.value)}/>
            </Form.Item>
            {!capBtn1 && <Form.Item name="sendBtn">
              <Button
                type="primary"
                className="login-captcha"
                htmlType="submit"
                disabled={capBtn}
              >
                {btnText()}
              </Button>
            </Form.Item>}
            {}
            <Form.Item name="loginBtn">
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
                disabled={login}
              >
                登 陆
              </Button>
            </Form.Item>       
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;