import './index.scss'
import { useState } from "react";
import { MessageOutlined, FormOutlined, UserOutlined } from '@ant-design/icons';
import { Outlet, useLocation } from 'react-router-dom';
import { TabBar, Popup, List, Empty } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import { SmileOutline, AddOutline, UnorderedListOutline } from 'antd-mobile-icons'
import { getUsername } from '../../utils';
import { Button } from 'antd-mobile'
import { useSelector } from 'react-redux';
import { RootState } from '../../store/index';
import { useEffect } from 'react';
import { History} from '../../store/modules/sendStore'
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
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
    const addNews = async () => {
        if (!y[0]){
            message.error("已经是新对话")
        }else{
            await message.success("开启新对话")
            window.location.reload()
        }
    }
    //根据当前路由给tabbar高亮,刷新页面不会丢失下面tabbar的高亮
    const location = useLocation()
    // 当前路由
    const activeKey = location.pathname
    // 所有对话
    const ListRes = useSelector((state: RootState) => state.content.message)
    // 跳转历史
    const goHistory = (index:number) => {
        dispatch(History(index))
        setVisible(false)
    }
    // 继续对话
    const backChat = () => {
        setVisible(false)
        dispatch(History(-1))
    }
    return (
        <div className='layout'>
            <Popup
                visible={visible}
                onMaskClick={() => {
                    setVisible(false)
                }}
                position='left'
                bodyStyle={{ width: '60vw' }}
            >
                <div className='popup'>
                    <div className='popup-title' style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: "10vw", marginBottom: "10vw",textAlign: 'center'}}>
                        对话历史
                    </div>
                    <div style={{ fontSize: '1rem', height: '130vw' ,overflowY: 'auto' }}>
                        {ListRes.length > 0 ? (<List>
                            {ListRes.map((item, index) => {
                                if (index % 2 === 0) {
                                    return (
                                        <List.Item
                                            // onClick={() => dispatch(History(index))}
                                            onClick={() => goHistory(index)}
                                            key={index}
                                            description={item.content}
                                        >
                                        </List.Item>
                                    );
                                }
                            })}
                        </List>) : (<Empty description='暂无历史对话' />)}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button color='primary' onClick={backChat}>
                            继续对话
                        </Button>
                    </div>
                </div>
            </Popup>
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
                <div className="more" onClick={()=>{
                    setVisible(true)
                }}>
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