import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import Diaolog from './diolog';

export default function Table() {
    const success = () => {
        message.success('deleted sucessfully');
    };
    const arrKey = [];
    const [valSearch, setValSearch] = useState('');
    const [isUpData, setIsUpData] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const text = 'Are you sure to delete this task?';
    const [officeData, setOfficeData] = useState([]);

    useEffect(() => {
        fetch('https://5fbb65b4c09c200016d406f6.mockapi.io/office')
            .then(response => response.json())
            .then(data => setOfficeData(data));

    }, [isUpData])
    const onChangeOpen = () => {
        setOpen(false)
        setDataEdit(null);
        setIsUpData(!isUpData);
    }
    const handleDelete = async id => {
        // console.log(id)
        fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/office/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => { setIsUpData(!isUpData); success() })
    }
    officeData.map((key) => {
        var index;
        index = key.Floor.indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    function confirm(id) {
        message.info('Clicked on Yes.');
        handleDelete(id)
    }
    // console.log(officeData)
    return (
        <div>
            <h1 className="title">Office manager </h1>
            <div className="button">
                <input type="search" placeholder="search" className="search"
                    onChange={(e) => { setValSearch(e.target.value); console.log(valSearch) }}
                />
                <Button className="button__add"
                    onClick={() => { setOpen(!open), setCheckEdit(false) }}
                >
                    Add
            </Button>

            </div>
            {open && <div className="modal" onClick={() => setOpen(false)}></div>}
            {open && <Diaolog dataEdit={dataEdit} checkEdit={checkEdit}
                onChangeOpen={onChangeOpen}
            />}
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1
                        //  style={{ cursor: 'pointer' }} onClick={() => { setOfficeData(sortData); alert('da sap xep') }}
                        >Floor</h1></th>
                        <th><h1>Status</h1></th>
                        <th><h1>Time from</h1></th>
                        <th><h1>Time to</h1></th>
                        <th><h1>Edit</h1></th>
                        <th><h1>Detele</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {arrKey.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.Floor}</td>
                                <td>{data.Status === true ? 'empty' : 'ordered'}</td>
                                <td>{data.Time_from}</td>
                                <td>{data.time_to}</td>
                                <td className="icon">
                                    <a style={{ color: "blue", textDecoration: "underLine", cursor: "pointer" }}
                                        onClick={() => { setOpen(true); setDataEdit(data); setCheckEdit(true) }}
                                    >
                                        <EditOutlined />
                                    </a>
                                </td>
                                <td className="icon">
                                    <Popconfirm placement="topLeft" title={text} onConfirm={() => confirm(data.id)}
                                        okText="Yes" cancelText="No"
                                    ><a
                                        style={{ color: "red", textDecoration: "underLine", cursor: "pointer" }}>
                                            <DeleteOutlined /></a>
                                    </Popconfirm>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div style={{ height: '80px', }}></div>
        </div>
    )
}
