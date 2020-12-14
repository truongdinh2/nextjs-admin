import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd'
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
    const [employeesData, setEmployeesData] =  React.useState([]);
    const text = 'Are you sure to delete this task?';
    // const checkEmail = arrKey.map(email => )
    useEffect(() => {
        fetch('https://5fbb65b4c09c200016d406f6.mockapi.io/employees')
            .then(response => response.json())
            .then(data => setEmployeesData(data));

    }, [isUpData])
    // console.log(employeesData)
    const onChangeOpen = () => {
        setOpen(false)
        setDataEdit(null);
        setIsUpData(!isUpData);
    }
    const handleDelete = async id => {
        console.log(id)
        fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/employees/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => { setIsUpData(!isUpData); success() })
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
    console.log(employeesData)
    return (
        <div>
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
                employeesData = {employeesData}
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
