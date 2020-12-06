import Head from 'next/head';
import 'antd/dist/antd.css'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Row, Switch } from 'antd';
import { useState } from 'react';
import Link from 'next/link'
import 'antd/dist/antd.css'
import '../styles/globals.css';
import '../styles/table.css';
import '../styles/diolog.css';
export default function L({ Component, pageProps }) {
    const { SubMenu } = Menu;
    const [isMenu, setIsMenu] = useState(false)
    const [theme, setTheme] = useState('dark')
    const [current, setCurrent] = useState('1')
    const handleClick = e => {
        // console.log('click ', e);
        setCurrent(
            e.key,
        );
    };
    return (
        <div className="total1">
            <Head>
                <title>Create Next App Edit</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="bar" style={{position:'fixed',width:'100%'}}>
                <header >
                    <Row style={{ padding: '15px 0' }}>
                        <Col offset={1} md={11} xs={8} >
                            <Button onClick={() => setIsMenu(!isMenu)}>Menu</Button>
                        </Col>
                        <Col xs={5} md={4}  >
                            <Link href="/"><p>Home</p></Link>
                        </Col>
                        <Col xs={5} md={4}  >
                            <p>Entertainment</p>
                        </Col>
                        <Col xs={5} md={4}  >
                            <p>Login</p>
                        </Col>
                    </Row>
                </header >
            </div>
            {isMenu && <div className="modal" onClick={()=>setIsMenu(false)}></div>}
            <div className="total">
                {isMenu ? <Menu
                    onClick={handleClick}
                    // theme={theme}
                    style={{ width: 256 }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                >
                    <SubMenu key="sub1" icon={<MailOutlined />} title="Manager">
                        <Menu.Item key="1">
                            <Link href="/data/employees-m/table">
                                Employee manager
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link href="/data/office-m/table">
                                Room manager
                            </Link>

                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link href="/data/project-m/table">
                                Project manager
                            </Link>

                        </Menu.Item>
                    </SubMenu>
                </Menu> : ''}
            </div>
            <Component {...pageProps} />
        </div>
    )
}