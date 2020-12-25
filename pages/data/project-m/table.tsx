import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Popover } from 'antd';
import React, { useState } from 'react';
import Layout from '../../layout';
import PageTable from '../pageTable';
import Diolog from './diolog';

// interface Props {
//     employees: [{
//         Name: string,
//         id: number,
//         Date_begin: any,
//         Time_expected: string,
//         NumberPepole: string,
//         memberP: string[]

//     }],
//     employees1: [{
//         id: number,
//         name: string,
//         email: string,
//         address: string,
//         chuc_vu: string,
//         Age: number
//     }],

// }
const Table = ({ employees, employees1 }) => {
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
    const text1 = <span>List</span>;
    const [content, setContent] = useState<any>('')
    const [data1,setData1] = useState([])

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
    const handleDelete = async id => {
        fetch(` ${link}/${id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            }
        }).then(() => {
            setIsUpData(!isUpData);
            success();
            upDate();
        })
    }
    ProjectData.map((key) => {
        var index: number;
        index = key.Name.toLowerCase().indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    function confirm(id: number) {
        handleDelete(id);
    }
    const handlePover = (num: number) => {
        setContent(
            arrKey.map(data => {
                var result = '';
                if (data.id === num) {
                    result = data.memberP.map((data1: string) => {
                        return (<span style={{ marginLeft: '5px' }}>{data1};</span>);
                    })
                }
                return result;
            })
        )
    }
    const dataRender = (data:any) => {
        setData1(data)
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
            {open &&
                <Diolog
                    title="hii"
                    dataEdit={dataEdit}
                    employees1={employees1}
                    checkEdit={checkEdit}
                    onChangeOpen={onChangeOpen}
                />
            }
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1
                        // onClick={()=> console.log('hi')}
                        // style={{ cursor: 'pointer' }} onClick={() => { setProjectData(sortData); alert('da sap xep') }}
                        >Name</h1></th>
                        <th><h1>Member</h1></th>
                        <th><h1>Date begin</h1></th>
                        <th><h1>Time expected</h1></th>
                        <th><h1>Leader</h1></th>
                        <th><h1>Edit</h1></th>
                        <th><h1>Detele</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((data, index) => {
                        return (
                            data &&
                            (<tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.Name}</td>
                                <td>
                                    <Popover placement="topLeft" title={text1}
                                        content={content} trigger="click"
                                    >
                                        <Button className="Name" onClick={() => handlePover(data.id)} >
                                            {data.memberP.length}</Button>
                                    </Popover>
                                </td>
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
                            </tr>)
                        )
                    })}
                </tbody>
            </table>
            <PageTable
                hi={ProjectData}
                dataNum={['hi']}
                dataRender={dataRender}
            />
            <div style={{ height: '80px', }}></div>
        </Layout>
    )
}

export const getStaticProps = async () => {
    const link = process.env.PROJECT;
    const res = await fetch(link)
    const employees = await res.json();
    const link1 = process.env.NAME;
    const res1 = await fetch(link1)
    const employees1 = await res1.json();
    return {
        props: {
            employees1,
            employees,
        },
    };
};

export default Table;