import React from 'react';
import { Button, Col, Row, Spin } from 'antd';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { Router } from 'next/router';

interface Props {
    title: string,
}
const Layout: React.FC<Props> = ({ children, title = "create app by nextjs" }) => {
    const [isMenu, setIsMenu] = useState<boolean>(false);
    const [theme, setTheme] = useState<string>('dark');
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
        const start = () => {
            console.log("start");
            setLoading(true);
        };
        const end = () => {
            console.log("findished");
            setLoading(false);
        };
        Router.events.on("routeChangeStart", start);
        Router.events.on("routeChangeComplete", end);
        Router.events.on("routeChangeError", end);
        return () => {
            Router.events.off("routeChangeStart", start);
            Router.events.off("routeChangeComplete", end);
            Router.events.off("routeChangeError", end);
        };
    }, []);
    const switchTheme = (theme: string) => {
        if (theme === 'dark') {
            setTheme('light')
            document.documentElement.setAttribute("data-theme", "light")
        } else {
            setTheme('dark')
            document.documentElement.setAttribute("data-theme", "dark")
        }
    }
    return (
        <>
            <div className="total1">
                <Head>
                    <title>{title}</title>
                    <link rel="icon" href="/icon.png" />
                </Head>
                <div className="header">
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
                                    <a>
                                        Office manager
                                       </a>
                                </Link>
                            </div>
                            <div className="navItem">
                                <Link href="/data/project-m/table">
                                    <a>
                                        Project manager
                                       </a>
                                </Link>
                            </div>
                            <div className="navItem">
                                <Link href="/data/employees-m/table">

                                    <a>
                                        Employee manager
                                       </a>
                                </Link>
                            </div>
                            <div className="navItem item4">
                                <div onClick={() => switchTheme(theme)} style={{ cursor: "pointer" }}>
                                    {
                                        theme === 'dark' ?
                                            <img className="switch" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDQUfvZpCc11oskHodG5D7dCSdPZNwVlKUbw&usqp=CAU" />
                                            :
                                            <img className="switch" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPsIjSR6wJK4DbIPJM4UExLg2TJs8pe96hYw&usqp=CAU" />
                                    }
                                </div>
                            </div>
                        </div>
                            : ''}
                    </div>
                </div>
                <div className="main">
                    {loading ? (<>
                        <a className="spin"><Spin /><p style={{ marginLeft: '-10px' }}>Loading...</p></a>

                    </>
                    ) :
                        children
                    }
                </div>
                <div className="footer">
                    <footer style={{ textAlign: 'center' }}>by: dinhtruong @ </footer>
                </div>
            </div>
        </>
    );
}
export default Layout;