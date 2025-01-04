import { Input, Button } from 'antd';
const { TextArea } = Input;
import { SendOutlined } from '@ant-design/icons';
import {useState} from "react";
import {sendContent} from '../../../request/sendAPI'
function InputBox() {
  //输入框的值
  const [inputContent,setInputContent] = useState("")
  const toSend = async () => {
    console.log('send')
    console.log(inputContent)
    const res = await sendContent()
    console.log(res)
  }

  return (
    <div className='chatbox'>
      <TextArea className='input' 
      placeholder="有什么要问的尽管来问吧！" 
      autoSize={{ maxRows: 4 }} 
        onChange={(e) => setInputContent(e.target.value)}
      />
        <Button className='icon' type="primary" shape="circle">
        <SendOutlined onClick={toSend}/>
        </Button>
    </div>
  )
}

export default InputBox;