import Head from 'next/head';
import 'antd/dist/antd.css'
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Col, InputNumber, Menu, Row, Switch } from 'antd';
import { useState } from 'react';
import Link from 'next/link'
import 'antd/dist/antd.css'
import '../styles/globals.css';
import '../styles/table.css';
import '../styles/diolog.css';
export default function ({ Component, pageProps }) {
    const [isMenu, setIsMenu] = useState(false);
    const [theme, setTheme] = useState('dark');
    const switchTheme = (theme) => {
        if (theme === 'dark') {
            setTheme('light')
            document.documentElement.setAttribute("data-theme", "light")
        } else {
            setTheme('dark')
            document.documentElement.setAttribute("data-theme", "dark")
        }
        console.log(theme)
    }

    return (
        <div className="total1">
            <Head>
                <title>Create Next App Edit</title>
                <link rel="icon" href="/icon.png" />
            </Head>
            <div className="bar" style={{ position: 'fixed', width: '100%' }}>
                <header >
                    <Row style={{ padding: '15px 0' }}>
                        <Col offset={1} md={11} xs={8} >
                            <Button onClick={() => setIsMenu(!isMenu)}>Menu</Button>
                        </Col>
                        <Col xs={4} md={4}  >
                            <Link href="/"><p>Home</p></Link>
                        </Col>
                        <Col xs={7} md={4}  >
                            <p>Entertainment</p>
                        </Col>
                        <Col xs={4} md={4}  >
                            <p>Login</p>
                        </Col>
                    </Row>
                </header >
            </div>
            {isMenu && <div className="modal" onClick={() => setIsMenu(false)}></div>}
            <div className="total">
                {isMenu ? <div >
                    <div className="navItem">
                        <Link href="/data/office-m/table">
                            Office manager
                            </Link>
                    </div>
                    <div className="navItem">
                        <Link href="/data/project-m/table">
                            Project manager
                            </Link>
                    </div>
                    <div className="navItem">
                        <Link href="/data/employees-m/table">
                            Employee manager
                            </Link>
                    </div>
                    <div className="navItem">
                        <div onClick={() => switchTheme(theme)} style={{ cursor: "pointer" }}>
                            {
                                theme === 'dark' ?
                                    <img className="switch" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQUfvZpCc11oskHodG5D7dCSdPZNwVlKUbw&usqp=CAU" />
                                    :
                                    <img className="switch" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPsIjSR6wJK4DbIPJM4UExLg2TJs8pe96hYw&usqp=CAU" />
                            }
                        </div>
                        {/* <button type="button" className="switch" onClick={() => switchTheme(theme)}>
                            {theme === 'dark' ? 'dark' : 'light'}
                        </button> */}
                    </div>
                </div>
                    : ''}
            </div>
            <Component {...pageProps} />
        </div>
    )
}