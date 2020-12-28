import Layout from 'antd/lib/layout/layout'
import React, { useCallback, useState } from 'react'
import List from './callbackList'

export default function Testcallback() {
    const [Number, setNumber] = useState(5);
    var hihi = 'hi'
    const text = hihi;
    const getItem = useCallback(() => {
        return [Number, Number + 1, Number + 2]
    }, [Number])
    // console.log(getItem(),text)
    return (
        <Layout>
            <div style={{ color: "black" }}>
                <input
                    onChange={(e) => { setNumber(parseFloat(e.target.value)) }}
                    type="text" />
                <input
                    onChange={(e) => hihi = e.target.value}
                    type="text" />
                <List getItem={getItem} />
            </div>
        </Layout>
    )
}
