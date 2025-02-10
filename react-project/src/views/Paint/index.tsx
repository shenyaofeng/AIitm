import InputBox from "./component/inputBox";
import "../Chat/Chat.scss"
import React from 'react'
import { CapsuleTabs } from 'antd-mobile'
const Paint = () => {
  return (
    <div className="chatI">
      生成风格
      <CapsuleTabs defaultActiveKey='1'>
        <CapsuleTabs.Tab title='无风格' key='1'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='动漫风格' key='2'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='写实' key='3'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='Q版简绘' key='4'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='治愈男生' key='5'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='治愈女生' key='6'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='卡通手绘' key='7'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='复古动漫' key='8'>
        </CapsuleTabs.Tab>
        <CapsuleTabs.Tab title='港风胶片' key='9'>
        </CapsuleTabs.Tab>
      </CapsuleTabs>
      <div className="chat">
        <InputBox />
      </div>
    </div>
  )
}

export default Paint;