import "./index.scss"
// import axios from 'axios';
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from '../../API/user/login'
import { setToken } from '../../utils/index'
import { setUsername } from '../../utils/index'
import { useState } from 'react';
import { Mask, SpinLoading } from 'antd-mobile'
// http:192.168.43.147:7000;

interface LoginFormValues {
  username: string;
  password: string;
}
// 蒙层加载组件
const LoadingOverlay = () => {
  return (
    <div className = "overlay">
      <Mask >
        <div className="loading">
          <SpinLoading color='primary' style={{ '--size': '48px' }} />
          <div>
            加载中...
          </div>
        </div>
      </Mask>
    </div>
  );
}

const Login = () => {
  // 加载状态
  const [loading, setLoading] = useState(false);
  // 路由跳转
  const navigate = useNavigate();
  // 按钮状态
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  // 表单提交
  const onFinish = async (values: LoginFormValues) => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    setLoading(true);
    try {
      const res = await loginAPI({
        username: values.username,
        password: values.password
      });
      console.log(res.data.data);
      if (res.data.code === 200) {
        setToken(res.data.data.token);
        setUsername(values.username);
        message.success('登陆成功');
        setLoading(false);
        navigate('/', { replace: true });
      } else {
        setLoading(false);
        message.error(res.data.data);
      }
    } catch (error) {
      console.error('登录请求出错:', error);
    } 
    // 表单提交后，禁用按钮2秒节流
    finally {
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
    }
  };

  return (
    <div className="login-background">
      {loading && <LoadingOverlay />}
      <div className="login-continer">
        <div className="title">登陆体验更多精彩</div>
        <div className="form">
          <Form validateTrigger="onBlur" onFinish={onFinish}>
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
              <Input className="number" placeholder="请输入账号" />
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
              <Input.Password className="number" placeholder="请输入密码" />
            </Form.Item>
            <Form.Item >
              <Link to={'/register'} replace>没有账户？请注册</Link>
            </Form.Item>
            <Form.Item name="loginBtn">
              <Button
                type="primary"
                className="login-btn"
                htmlType="submit"
                disabled={isButtonDisabled}
              >
                登 陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;