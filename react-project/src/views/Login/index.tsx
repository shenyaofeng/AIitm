import { useState } from "react";
import "./login.scss"
// import axios from 'axios';
import { Button, Form, Input, message } from "antd";
// http:192.168.43.147:7000;



const Login = () => {
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
    }
  };
  // 登陆按钮状态
  const [login, setLogin] = useState(true);
  // const [inputPhone, setInputPhone] = useState("");
  // const tologin = () => {
  //   console.log(inputPhone)
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
    }else if(captcha !== '' && captcha !== '123456'){
      message.error('验证码错误,验证码为123456')
    }else{
      message.success('登陆成功')
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
            <Form.Item>
              <Button
                type="primary"
                className="login-captcha"
                htmlType="submit"
              >
                获取验证码
              </Button>
            </Form.Item>
            <Form.Item>
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