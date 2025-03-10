import { Input, Button, message } from 'antd';
const { TextArea } = Input;
import { SendOutlined } from '@ant-design/icons';
import { useState } from "react";
import { CreateImagesAPI } from '../../../API/AI/createImages';
import { getToken } from '../../../utils';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'antd-mobile';
// 封装一个自定义hook tabBar的状态
import useTabBarStatus from '../../../hooks/useTabBarStatus';
interface InputBoxProps {
  tabs: React.ReactNode;
  onResponse: (data: string) => void;
}
const InputBox: React.FC<InputBoxProps> = ({ tabs, onResponse }) => {
  const navigate = useNavigate()
  // 按钮状态
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //输入框的值
  const [inputContent, setInputContent] = useState("请输入中文描述,比如画一位女子,身穿汉服,手拿佩剑,眼神凌厉")
  // tabBar的状态自定义hooks
  const { setVisibleTabBar, setUnvisibleTabBar } = useTabBarStatus()
  const toSend = async () => {
    if (getToken()) {
      setIsButtonDisabled(true);
      Toast.show({
        icon: 'loading',
        content: '生成中...',
        duration: 7000,
      })
      const res = await CreateImagesAPI({ prompt: inputContent + tabs })
      if(res.data.code === 401){
        message.error("token过期,请重新登录")
        navigate("/login")
      }
      onResponse(res.data.data.url); 
      localStorage.setItem("imgUrl", res.data.data.url)
      setIsButtonDisabled(false);
    } else {
      alert("请先登录")
      window.location.href = "/login"
    }
  }
  return (
    <div className='chatbox'>
      <TextArea className='input'
        placeholder="请输入中文描述,比如画一位女子,身穿汉服,手拿佩剑,眼神凌厉"
        autoSize={{ minRows: 4, maxRows: 4 }}
        onChange={(e) => setInputContent(e.target.value)}
        onFocus={setVisibleTabBar}
        onBlur={setUnvisibleTabBar}
        value={inputContent}
      />
      <Button className='icon' type="primary" shape="circle" disabled={isButtonDisabled} onClick={toSend}>
        <SendOutlined />
      </Button>
    </div>
  )
}

export default InputBox;