import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd';
import React, { useState } from 'react';
import Layout from '../../layout';
import PageTable from '../pageTable';
import Diolog from './diolog';
// interface Props {
//     title: string,
//     employees: [
//         {name: string,}
//     ],
//     isUpData: boolean,
//     checkEdit: boolean,
//     dataEdit: {},
//     open: boolean,
//     text: string,
//     link: string,
//     onChangeOpen : () => void,
// }
const Table: React.FC = ({ employees }: any) => {
    const success = () => {
        message.success('deleted sucessfully');
    };
    const arrKey = [];
    const [valSearch, setValSearch] = useState('');
    const [isUpData, setIsUpData] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState(null);
    const [open, setOpen] = useState(false);
    const [employeesData, setEmployeesData] = React.useState<any>(employees);
    const text = 'Are you sure to delete this task?';
    const link = process.env.NAME;
    const [data1, setData1] = useState([])
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
    const handleDelete = async (id: number) => {
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
    employeesData.map((key: { name: string }) => {
        var index: number;
        index = key.name.toLowerCase().indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey;
    });
    function confirm(id: number) {
        handleDelete(id)
    }
    const dataRender = (data: any) => {
        setData1(data)
    }
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
            {open && <Diolog
                dataEdit={dataEdit}
                checkEdit={checkEdit}
                onChangeOpen={onChangeOpen}
                employeesData={employeesData}
            />}
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1
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
                    {data1.map((data, index) => {
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
            <PageTable
                hi={employeesData}
                dataNum={['hi']}
                dataRender={dataRender}
            />
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
export default Table;