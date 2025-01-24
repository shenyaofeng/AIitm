import "./index.scss"
// import axios from 'axios';
import { Button, Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { loginAPI } from '../../API/user/login'
// http:192.168.43.147:7000;

interface LoginFormValues {
  username: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values: LoginFormValues) => {
    const res = await loginAPI({
      username: values.username,
      password: values.password
    })
    console.log(res)
    if(res.data.code === 200){
      message.success('登陆成功')
      navigate('/', { replace: true })
    }else{
      message.error(res.data.data)
    }
  }
return (
  <div className="login-background">
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