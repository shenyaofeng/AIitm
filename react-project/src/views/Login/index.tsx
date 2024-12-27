// import { useState } from "react";
import "./login.scss"
// import axios from 'axios';
import { Button, Form, Input } from "antd";
// http:192.168.43.147:7000;



const Login = () => {
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
  const [form] = Form.useForm();

  const isPhoneValid = () => {
    const errors = form.getFieldsError();

    console.log(errors)
    return !errors;
  };

  return (
    <div className="login-background">
      <div className="login-continer">
        <div className="title">登陆体验更多精彩</div>
        {/* <input type="text" value={inputPhone} onChange={(e) => setInputPhone(e.target.value)} />
        <Button type="primary" shape="round" onClick={tologin}>
          登 陆
        </Button> */}
        <div className="form">
          <Form form={form} >
            <Form.Item
              name="phone"
              rules={[{ required: true, message: '请输入正确的手机号', pattern: new RegExp(/^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/, "g") }]}>
              <Input className="number" placeholder="请输入手机号" />
            </Form.Item>
          </Form>
          {/* <Input className="number" /> */}
          <Input className="number" placeholder="请输入验证码" />
          <Button
            type="primary"
            className="login-captcha"
          >
            获取验证码
          </Button>
          <Button
            type="primary"
            className="login-btn"
            // onClick={tologin}
            disabled={!isPhoneValid()}
          >
            登 陆
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login;