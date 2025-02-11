import './index.scss'
import { useState } from "react";
import { MessageOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { TabBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { SmileOutline, AddOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { getUsername } from '../../utils';
import { Button } from 'antd-mobile'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useEffect } from 'react';
// import { getToken } from '../../utils';
import { message } from 'antd';
const barName = [
    {
        key: "/",
        title: "对话",
        icon: <MessageOutlined />,
    },
    {
        key: "/paint",
        title: "AI绘画",
        icon: <FormOutlined />,
    },
    {
        key: "/me",
        title: "我的",
        icon: <UserOutlined />,
    },
]
const NavBar = () => {
    const username = getUsername()
    const barStatus = useSelector((state: RootState) => state.bar.barstatus)
    const [bar, setBar] = useState(barStatus)
    useEffect(() => {
        if (barStatus) {
            setBar(barStatus)
        } else {
            setBar(barStatus)
        }
    }, [barStatus])
    const navigate = useNavigate()
    //跳转页面
    const switchRoute = (path: string) => {
        navigate(path)
    };
    //添加新页面
    const y = useSelector((state: RootState) => state.content.message)
    const addNews = () => {
        if (!y[0]){
            message.error("已经是新页面")
        }else{
            window.location.reload()
        }
    }
    //根据当前路由给tabbar高亮,刷新页面不会丢失下面tabbar的高亮
    const location = useLocation()
    const activeKey = location.pathname
    return (
        <div className='layout'>
            <div className='naver'>
                <div className='title'>
                    <div className='smile'>
                        <SmileOutline />
                    </div>
                    <div className='title1'>
                        智能
                    </div>
                    <div className='title2'>
                        助手
                    </div>
                </div>
                <div className="add" onClick={addNews}>
                    <AddOutline />
                </div>
                <div className="more">
                    <UnorderedListOutline />
                </div>
                <div className='user'>
                    {username ? (username.length <= 4 ? `哈喽 ${username}` : `哈喽 ${username.slice(0, 4)}...`) :
                        <Button size='small' color='primary'
                            onClick={() => {
                                navigate('/login')
                            }}
                        >
                            登陆
                        </Button>}
                </div>
            </div>
            <div className="container">
                <Outlet />
            </div>
            <div className='footer1'>
            </div>
            <div className="footer">
                {/* 导航栏的名字 */}
                {!bar && <TabBar onChange={switchRoute} activeKey={activeKey}>
                    {barName.map((item) => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} className="custom-tabbar-item" />
                    ))}
                </TabBar>}
            </div>
        </div>
    )
}

export default NavBar;