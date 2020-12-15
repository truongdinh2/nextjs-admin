import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout';
import Diolog from './diolog'
export default function Table({ employees }) {
    const success = () => {
        message.success('deleted sucessfully');
    };
    const arrKey = [];
    const [valSearch, setValSearch] = useState('');
    const [isUpData, setIsUpData] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [employeesData, setEmployeesData] = React.useState(employees);
    const text = 'Are you sure to delete this task?';
    const link = process.env.NAME;
    // const [idEdit, setIdEdit] = useState(null)
    // const checkEmail = arrKey.map(email => )
    const upDate = async () => {
        const reload = await fetch(link)
        const employees = await reload.json();
        setEmployeesData(employees);

    }
    const onChangeOpen = () => {
        setOpen(false)
        setDataEdit(null);
        setIsUpData(!isUpData);
        upDate();
    }
    console.log(process.env.NAME)
    const handleDelete = async id => {
        // console.log(id)
        fetch(`${link}/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => {
            upDate()
            setIsUpData(!isUpData);
            success();
        })
    }
    console.log(employeesData)
    employeesData.map((key) => {
        // console.log(key.name)
        var index;
        index = key.name.indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    function confirm(id) {
        message.info('Clicked on Yes.');
        handleDelete(id)
    }
    // console.log(arrKey)
    // checkEmail (newEmail){
    //     var result = true;
    //     arrKey.map(){
    //         if()
    //     }


    // }
    console.log(employees)
    return (
        <Layout title="employees manager">
            <h1 className="title">Employees manager </h1>
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
                employeesData={employeesData}
            />}
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1
                        // style={{ cursor: 'pointer' }} onClick={() => { setEmployeesData(sortData); alert('da sap xep') }}
                        >Name</h1></th>
                        <th><h1>Email</h1></th>
                        <th><h1>Age</h1></th>
                        <th><h1>Address</h1></th>
                        <th><h1>position</h1></th>
                        <th><h1>Edit</h1></th>
                        <th><h1>Detele</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {arrKey.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.Age}</td>
                                <td>{data.address}</td>
                                <td>{data.chuc_vu}</td>
                                <td className="icon">
                                    <a style={{ color: "blue", textDecoration: "underLine", cursor: "pointer" }}
                                        onClick={() => {
                                            setOpen(true);
                                            setDataEdit(data);
                                            setCheckEdit(true);
                                            // setIdEdit(data.id)
                                        }}
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
        </Layout>
    )
}
export const getStaticProps = async () => {
    const link = process.env.NAME;
    const res = await fetch(link)
    const employees = await res.json();
    return {
        props: {
            employees,
        },
    };
};