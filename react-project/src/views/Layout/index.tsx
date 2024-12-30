import './navbar.scss'
import { useState } from "react";
import { MessageOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { Outlet } from 'react-router-dom';
const barName = [
    {
        name: "对话",
        icons: <MessageOutlined />,
        path: "/",
    },
    {
        name: "AI绘画",
        icons: <FormOutlined />,
        path:"/paint"
    },
    {
        name: "我的",
        icons: <UserOutlined />,
        path:"/"
    },
]
function NavBar() {
    // 导航栏的状态
    const [curBar, setCurBar] = useState('对话')
    const change = (name:string)=>{
        setCurBar(name)
    }
    return (
        <div className='layout'>
            <Outlet />
            <div className="navBars">
                {/* 导航栏的名字 */}
                {barName.map((item, index) => {
                    return (
                        <div key={index} 
                        onClick={() => change(item.name)} 
                        className={classNames("bar", { font: curBar == item.name })}>
                            {item.icons}{item.name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default NavBar;