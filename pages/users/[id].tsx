import React from 'react'
import { useRouter } from 'next/router'
import { Button } from 'antd';
export default function AdminUser() {
    const Router = useRouter();
    console.log(Router)
    const handleClick = () => {
        Router.push('/login')
    }
    return (
        <div>
            Hihi {Router.query.id}
            <Button onClick={handleClick}>go to Home Page</Button>
        </div>
    )
}
