import { Input, Button } from 'antd';
const { TextArea } = Input;
import { SendOutlined } from '@ant-design/icons';
import { useState} from "react";
// import {sendContent} from '../../../request/sendAPI'
import { setbarstatus } from '../../../store/modules/tabBarStore';
import { useDispatch } from 'react-redux';
import { AItext, userSendText } from '../../../store/modules/sendStore'
import { getToken } from '../../../utils';
const InputBox = () => {
  const dispatch = useDispatch()
  //输入框的值
  const [inputContent,setInputContent] = useState("")
  const toSend = async () => {
    if(getToken()){
      await dispatch(userSendText(inputContent))
      await dispatch(AItext())
    }else{
      alert("请先登录")
      window.location.href = "/login"
    }
    
  }

  const setVisibleTabBar = () => {
    dispatch(setbarstatus(true))
  }
  const setUnvisibleTabBar = () => {
    dispatch(setbarstatus(false))
  }
  return (
    <div className='chatbox'>
      <TextArea className='input' 
      placeholder="有什么要问的尽管来问吧！" 
      autoSize={{ maxRows: 4 }} 
        onChange={(e) => setInputContent(e.target.value)}
        onFocus={setVisibleTabBar}
        onBlur={setUnvisibleTabBar}
      />
        <Button className='icon' type="primary" shape="circle">
        <SendOutlined onClick={toSend}/>
        </Button>
    </div>
  )
}

export default InputBox;