import Layout from 'antd/lib/layout/layout'
import React, { useState } from 'react'
import List from './callbackList'

export default function Testcallback() {
    const [Number, setNumber] = useState(5)
    const getItem = () => {
        return [Number, Number + 1, Number + 2]
    }
    return (
        <Layout>
            <div style={{color: "black"}}>
                <input
                    onChange={(e) => { setNumber(parseFloat(e.target.value)) }}
                    type="text" />
                <List getItem={getItem} />
            </div>
        </Layout>
    )
}
