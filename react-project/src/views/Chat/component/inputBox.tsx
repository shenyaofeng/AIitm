import { Input } from 'antd';
const { TextArea } = Input;
import { Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
function InputBox() {
  const Send = () => {
    console.log('send')
  }
  return (
    <div className='chatbox'>
      <TextArea className='input' placeholder="有什么要问的尽管来问吧！" autoSize={{ maxRows: 4 }} />
        <Button className='icon' type="primary" shape="circle">
        <SendOutlined onClick={Send}/>
        </Button>
    </div>
  )
}

export default InputBox;