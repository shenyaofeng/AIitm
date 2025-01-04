import './navbar.scss'
// import { useState } from "react";
import { MessageOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
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
    // 导航栏的状态
    // const [curBar, setCurBar] = useState('对话')
    // const change = (name: string) => {
    //     setCurBar(name)
    // }
    const navigate = useNavigate()
    const switchRoute = (path:string) => {
        console.log(path);
        navigate(path)
    };
    return (
        <div className='layout'>
            <div>
                <Outlet />
            </div>
            <div className="navBars">
                {/* 导航栏的名字 */}
                <TabBar onChange={switchRoute}>
                    {barName.map((item) => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                    ))}
                </TabBar>
            </div>
        </div>
    )
}

export default NavBar;