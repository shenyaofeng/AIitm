import { Button, Modal, Space} from 'antd-mobile'
import './index.scss'
import { removeToken , removeUsername } from "../../utils";
import { useNavigate } from "react-router-dom";
import { message } from 'antd';
const Person = () => {
  const navigate = useNavigate()

  return (
    <div className="me">
      <div className="login-continer">
        <div className="title">哈喽！亲爱的用户</div>
        <div className="return">
          <Space direction='vertical' block>
            <Button
              block
              onClick={() => {
                Modal.confirm({
                  title: '退出登陆',
                  showCloseButton: true,
                  onConfirm: () => {
                    navigate('/login', { replace: true })
                    message.success('退出成功')
                    removeToken()
                    removeUsername()
                  },
                })
              }}
            >
              退出登陆
            </Button>
          </Space>
        </div>
        
      </div>
    </div>
  )
}

export default Person;