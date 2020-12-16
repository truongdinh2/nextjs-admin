import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, message, Popconfirm } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../../layout';
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

const Table: React.FC<Props> = ({ employees }) => {
    const success = () => {
        message.success('deleted sucessfully');
    };
    const arrKey = [];
    const [valSearch, setValSearch] = useState('');
    const [isUpData, setIsUpData] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [dataEdit, setDataEdit] = useState<object>(null);
    const [open, setOpen] = useState(false);
    const text = 'Are you sure to delete this task?';
    const [officeData, setOfficeData] = useState(employees);
    const link = process.env.FLOOR;


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
                "content-type": "application/json"
            }
        }).then(() => {
            upDate()
            setIsUpData(!isUpData);
            success();
        })
    }
    officeData.map((key) => {
        var index: number;
        index = key.Floor.indexOf(valSearch);
        if (index !== -1) {
            arrKey.push(key)
        }
        return arrKey
    });
    function confirm(id: number) {
        message.info('Clicked on Yes.');
        handleDelete(id)
    }
    // console.log(link)
    return (
        <Layout title="office-manager">
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
            {open && <Diaolog
                dataEdit={dataEdit} 
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
        </Layout>
    )
}
export const getStaticProps = async () => {
    const link = process.env.FLOOR;
    const res = await fetch(link)
    const employees = await res.json();
    return {
        props: {
            employees,
        },
    };
};
export default Table;