import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useEffect, useState } from 'react'
import Layout from '../../layout';
import Diolog from './diolog'
export default function Table({employees}) {
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
    const [ProjectData, setProjectData] = useState(employees);
    const link = process.env.PROJECT;
    const upDate = async () => {
        const reload = await fetch(link)
        const employees = await reload.json();
        setProjectData(employees);
    }
    const onChangeOpen = () => {
        setOpen(false)
        setDataEdit(null);
        setIsUpData(!isUpData);
        upDate();
    }
    const sortData = ProjectData.sort(function (a, b) {
        var x = a.Name.toLowerCase();
        var y = b.Name.toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
    });
    const handleDelete = async id => {
        // console.log(id)
        fetch(` ${link}/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => { 
            setIsUpData(!isUpData); 
            success() ;
            upDate();
        })
    }
    ProjectData.map((key) => {
        var index;
        index = key.Name.toLowerCase().indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    function confirm(id:number) {
        handleDelete(id);
    }
    return (
        <Layout title="project manager">
            <h1 className="title">Project manager </h1>
            <div className="button">
                <input type="search" placeholder="search" className="search"
                    onChange={(e) => { setValSearch(e.target.value) }}
                />
                <Button className="button__add"
                    onClick={() => { setOpen(!open); setCheckEdit(false) }}
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
                            style={{ cursor: 'pointer' }} onClick={() => { setProjectData(sortData); alert('da sap xep') }}
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
                            <tr key={data.id}>
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
        </Layout>
    )
}
export const getStaticProps = async () => {
    const link = process.env.PROJECT;
    const res = await fetch(link)
    const employees = await res.json();
    return {
        props: {
            employees,
        },
    };
};