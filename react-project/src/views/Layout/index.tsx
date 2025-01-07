import './navbar.scss'
// import { useState } from "react";
import { MessageOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { TabBar } from "antd-mobile";
import { useNavigate } from "react-router-dom";
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
function NavBar() {
    const navigate = useNavigate()
    //跳转页面
    const switchRoute = (path:string) => {
        navigate(path)
    };
    //根据当前路由给tabbar高亮
    const location = useLocation()
    const activeKey = location.pathname
    return (
        <div className='layout'>
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                {/* 导航栏的名字 */}
                <TabBar onChange={switchRoute} activeKey={activeKey}>
                    {barName.map((item) => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default NavBar;