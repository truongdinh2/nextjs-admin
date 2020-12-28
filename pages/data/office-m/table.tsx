import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm, Popover } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout';
import PageTable from '../pageTable';
import Diaolog from './diolog';


interface Props {
    title: string,
    employees: [
        { Floor: string, }
    ],
    isUpData: boolean,
    checkEdit: boolean,
    open: boolean,
    text: string,
    link: string,
    onChangeOpen: () => void,
}

const Table: React.FC<Props> = ({ employees, employees1 }: any) => {
    const success = () => {
        message.success('deleted sucessfully');
    };
    const [arrKey,setArrKey] = useState([]);
    const [valSearch, setValSearch] = useState('');
    const [isUpData, setIsUpData] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState<object>(null);
    const [open, setOpen] = useState(false);
    const text = 'Are you sure to delete this task?';
    const [officeData, setOfficeData] = useState(employees);
    const link = process.env.FLOOR;
    const text1 = <span>List</span>;
    const [content, setContent] = useState<any>('');
    const [data1, setData1] = useState([])
    useEffect(() => {
        var arrKey1 = [];
        officeData.map((key: { Floor: string }) => {
            var index: number;
            index = key.Floor.indexOf(valSearch);
            if (index !== -1) {
                arrKey1.push(key)
            }
            return arrKey1;
        }
        );
        setArrKey(arrKey1)
    },[valSearch])
    const upDate = async () => {
        const reload = await fetch(link)
        const employees = await reload.json();
        setOfficeData(employees);

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
            }
        }).then(() => {
            upDate()
            setIsUpData(!isUpData);
            success();
        })
    }
    function confirm(id: number) {
        handleDelete(id)
    }
    // console.log(link)
    const handlePover = (num: number) => {
        console.log(arrKey)
        setContent(
            arrKey.map(data => {
                var result = '';
                if (data.id === num) {
                    // console.log(data.member)
                    result = data.member.map((data1: string) => {
                        // console.log(data1)
                        return (<span style={{ marginLeft: '5px' }}>{data1},</span>);
                    })
                }
                return result;
            })
        )
    }
    const dataRender = (data: any) => {
        setData1(data)
    }
    const handleSearch = (e: any) => {
        setValSearch(e.target.value)
    }
    // console.log(arrKey)
    return (
        <Layout title="office-manager">
            <h1 className="title">Office manager </h1>
            <div className="button">
                <input type="search" placeholder="search" className="search"
                    onChange={handleSearch}
                />
                <Button className="button__add"
                    onClick={() => { setOpen(!open), setCheckEdit(false) }}
                >
                    Add
            </Button>

            </div>
            {open && <div className="modal" onClick={() => setOpen(false)}></div>}
            {open && <Diaolog
                dataEdit={dataEdit}
                employees1={employees1}
                checkEdit={checkEdit}
                onChangeOpen={onChangeOpen}
            />}
            <table className="container">
                <thead>
                    <tr>
                        <th><h1>STT</h1></th>
                        <th><h1
                        //  style={{ cursor: 'pointer' }} onClick={() => { setOfficeData(sortData); alert('da sap xep') }}
                        >Floor</h1></th>
                        <th><h1>Member</h1></th>
                        <th><h1>Số bàn</h1></th>
                        <th><h1>DM</h1></th>
                        <th><h1>Edit</h1></th>
                        <th><h1>Detele</h1></th>
                    </tr>
                </thead>
                <tbody>
                    {data1.map((data, index) => {
                        return (
                            <tr key={data.id}>
                                <td>{index + 1}</td>
                                <td>{data.Floor}</td>
                                <td  >
                                    <Popover placement="topLeft" title={text1}
                                        content={content} trigger="click"
                                    >
                                        <Button className="Name" onClick={() => handlePover(data.id)} >
                                            {data.member.length}</Button>
                                    </Popover>
                                </td>
                                <td>{data.Time_from}</td>
                                <td>{data.time_to.toUpperCase()}</td>
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
                                    >
                                        <a
                                            style={{ color: "red", textDecoration: "underLine", cursor: "pointer" }}>
                                            <DeleteOutlined />
                                        </a>
                                    </Popconfirm>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <PageTable
                hi={arrKey}
                dataNum={['hi']}
                dataRender={dataRender}
            />
            <div style={{ height: '80px', }}></div>
        </Layout>
    )
}
export const getStaticProps = async () => {
    const link = process.env.FLOOR;
    const res = await fetch(link)
    const employees = await res.json();
    const link1 = process.env.NAME;
    const res1 = await fetch(link1)
    const employees1 = await res1.json();
    return {
        props: {
            employees,
            employees1
        },
    };
};

export default Table;