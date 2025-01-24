import { useState } from "react";
import "./index.scss"
// import axios from 'axios';
import React from 'react'
import { Button, Form, Input, message,} from "antd";
import { registerAPI } from '../../API/user/register'
import { useNavigate, Link } from "react-router-dom";
// http:192.168.43.147:7000;
interface RegisterFormValues {
  username: string;
  password: string;
}

const Login = () => {
  // 获取 Form 实例
  const [form] = Form.useForm();
  const navigate = useNavigate();

  //用户名
  const [username, setUsername] = useState("");
  const usernameChange = (value: string) => {
    setUsername(value);
  };
  //密码
  const [password, setPassword] = useState("");
  const passwordChange = (value: string) => {
    setPassword(value);
  };
  // 表单提交
  const onFinish = async (values: RegisterFormValues) => {
    const res = await registerAPI({
      username: values.username,
      password: values.password
    })
    console.log(res)
    if(res.data.code !== 200){
      if (res.data.serviceCode === 501){
        message.error('用户名已存在，请重新输入')
        // 清空表单
        form.resetFields(); 
      }
    }else{
      message.success('注册成功')
      navigate('/login', { replace: true })
    }
  }


  return (
    <div className="login-background">
      <div className="login-continer">
        <div className="title">注册体验更多精彩</div>
        <div className="form">
          <Form form={form} validateTrigger="onBlur" onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                // 非空校验
                {
                  required: true,
                  message: "请输入账号",
                },
                // 账号长度校验
                {
                  type: 'string', min: 5, max: 10, message: "账号长度为5-10位"
                },
                { pattern: /^[a-zA-Z0-9_]*$/, message: '用户名只能是字母、数字、下划线' }
              ]}>
              <Input className="number" placeholder="请输入账号" value={username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => usernameChange(e.target.value)} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                // 非空校验
                {
                  required: true,
                  message: "请输入密码",
                },
                // 账号长度校验
                {
                  type: 'string', min: 5, max: 10, message: "密码长度为5-10位"
                },
              ]}>
              <Input.Password className="number" placeholder="请输入密码" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => passwordChange(e.target.value)} />
            </Form.Item>
            <Form.Item name="confirmPassword" rules={[{ required: true, message: '请输入密码' }, ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致!'));
              },
            }),]} >
              <Input.Password className="number" placeholder="请确认密码"></Input.Password>
            </Form.Item>
            <Form.Item >
              <Link to={'/login'} replace>已有账户？请登陆</Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
              >
                注 册
              </Button>
            </Form.Item>    
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login;