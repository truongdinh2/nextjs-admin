import React, { useEffect, useState } from 'react'

export default function List({getItem}) {
    const [list, setList] = useState([]);
    console.log(getItem(5),'hi')
    useEffect(() => {
      setList(getItem());
      console.log('update items')
    }, [getItem])
    return (
        <ul>
            {list.map(data=>{return <li key={data}>{data}</li>})}
        </ul>
    )
}
