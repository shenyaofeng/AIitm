import InputBox from "./component/inputBox";
import { useState } from "react";
import "../Chat/Chat.scss"
import { CapsuleTabs } from 'antd-mobile'
import { Tag } from 'antd-mobile'
import './index.scss'
import { useEffect } from "react";
const Paint = () => {
  const [selectedTitle, setSelectedTitle] = useState<string>('无风格'); // 初始化选中的标题
  //
  const [responseData, setResponseData] = useState<string>('');
  // 处理选项卡切换的函数
  const handleTabChange = (key: string) => {
    const tabTitles: { [key: string]: string } = {
      '1': '无s风格',
      '2': '动漫风格',
      '3': '写实',
      '4': 'Q版简绘',
      '5': '治愈男生',
      '6': '治愈女生',
      '7': '卡通手绘',
      '8': '复古动漫',
      '9': '港风胶片'
    };
    const title = tabTitles[key];
    setSelectedTitle(title);
    // 你可以在这里添加其他逻辑，比如将选中的标题传递给 InputBox 组件
  };
  const handleResponse = (response: string) => {
    // 处理响应数据
    setResponseData(response);
  };
  useEffect(() => {
    const url = localStorage.getItem("imgUrl")
    if(url){
      setResponseData(url)
    }
  },[])
  const tabs = (
    <CapsuleTabs defaultActiveKey='1' onChange={handleTabChange} style={{ backgroundColor: '#f0f0f0' }}>
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
  )
  return (
    <div className="chatI">
      <div style={{ backgroundColor: '#f0f0f0',display: 'flex', justifyContent: 'center' }}>
        <Tag color='primary' style={{ fontSize: '1.2rem', padding: '8px 16px' }}>
          选择生成风格
        </Tag>
      </div>
      {tabs}
      {responseData && <div className="creativeImage">
        <img className="image" src={responseData}></img>
      </div>}
      <div className="chat">
        <InputBox tabs={selectedTitle} onResponse={handleResponse} />
      </div>
    </div>
  )
}

export default Paint;