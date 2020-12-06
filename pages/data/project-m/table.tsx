import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message } from 'antd';
import React, { useEffect, useState } from 'react'
import Diolog from './diolog'
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
    const [ProjectData, setProjectData] = useState([])
    useEffect(() => {
        fetch('http://127.0.0.1:3000/Project')
            .then(response => response.json())
            .then(data => setProjectData(data));

    }, [isUpData])
    const onChangeOpen = () => {
        setOpen(false)
        setDataEdit(null);
        setIsUpData(!isUpData);
    }
    const sortData = ProjectData.sort(function (a, b) {
        var x = a.Name.toLowerCase();
        var y = b.Name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
    const handleDelete = async id => {
        console.log(id)
        fetch(`http://127.0.0.1:3000/Project/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => { setIsUpData(!isUpData); success() })
    }
    ProjectData.map((key) => {
        var index;
        index = key.Name.indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    return (
        <div>
            <h1 className="title">Project manager </h1>
            <div className="button">
                <input type="search" placeholder="search" className="search"
                    onChange={(e) => { setValSearch(e.target.value) }}
                />
                <Button className="button__add"
                    onClick={() => { setOpen(!open) }}
                >
                    Add
            </Button>

            </div>
            {open && <div className="modal" onClick={() => setOpen(false)}></div>}
            {open && <Diolog dataEdit={dataEdit} checkEdit={checkEdit}
                onChangeOpen={onChangeOpen}
            />}
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1 
                        // style={{ cursor: 'pointer' }} onClick={() => { setProjectData(sortData); alert('da sap xep') }}
                        >Name</h1></th>
                        <th><h1>Date begin</h1></th>
                        <th><h1>Time expected</h1></th>
                        <th><h1>Number pepole</h1></th>
                        <th><h1>Edit</h1></th>
                        <th><h1>Detele</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {arrKey.map((data, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{data.Name}</td>
                                <td>{data.Date_begin}</td>
                                <td>{data.Time_expected}</td>
                                <td>{data.NumberPepole}</td>
                                <td className="icon">
                                    <a style={{ color: "blue", textDecoration: "underLine", cursor: "pointer" }}
                                        onClick={() => { setOpen(true); setDataEdit(data); setCheckEdit(true) }}
                                    >
                                        <EditOutlined />
                                    </a>
                                </td>
                                <td className="icon" >
                                    <a onClick={() => { handleDelete(data.id) }}
                                        style={{ color: "red", textDecoration: "underLine", cursor: "pointer" }}>
                                        <DeleteOutlined /></a>
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
