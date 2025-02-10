import { Input, Button } from 'antd';
const { TextArea } = Input;
import { SendOutlined } from '@ant-design/icons';
import { useState } from "react";
// import {sendContent} from '../../../request/sendAPI'
import { setbarstatus } from '../../../store/modules/tabBarStore';
import { useDispatch } from 'react-redux';
const InputBox = () => {
  const dispatch = useDispatch()
  //输入框的值
  const [inputContent, setInputContent] = useState("")

  const setVisibleTabBar = () => {
    dispatch(setbarstatus(true))
  }
  const setUnvisibleTabBar = () => {
    dispatch(setbarstatus(false))
  }
  return (
    <div className='chatbox'>
      <TextArea className='input'
        placeholder="请输入中文描述,比如画一位女子,身穿汉服,手拿佩剑,眼神凌厉"
        autoSize={{ minRows: 4, maxRows: 4 }}
        onChange={(e) => setInputContent(e.target.value)}
        onFocus={setVisibleTabBar}
        onBlur={setUnvisibleTabBar}
      />
      <Button className='icon' type="primary" shape="circle">
        <SendOutlined  />
      </Button>
    </div>
  )
}

export default InputBox;