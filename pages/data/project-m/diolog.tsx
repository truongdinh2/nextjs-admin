
import { Form, Input, InputNumber, Button, message, Select } from 'antd';
import { useEffect, useState } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

interface Props {
  title: string,
  checkEdit: boolean,
  dataEdit: {
    id: number,
  },
  onChangeOpen: () => void,
  employees1: [{
    id: number,
    name: string,
    email: string,
    address: string,
    chuc_vu: string,
    Age: number
  }],
}
// interface Val{
//  user: {
//   //  id: number
//  }, 
// }
const { Option }: any = Select;
const Diaolog: React.FC<Props> = (props: Props) => {
  const dataEdit = props.dataEdit;
  const [form] = Form.useForm();
  const checkEdit = props.checkEdit;
  const employees1 = props.employees1;
  const [dataSelect, setDataSelect] = useState([]);
  console.log(employees1)
  useEffect(() => {
    let dataS: string[] = [];
    employees1.map((dataObj: any) => {
      // console.log(dataObj.name) 
      dataS.push(dataObj.name);
    })
    setDataSelect(dataS);
    // console.log(dataSelect)

  }, [])
  useEffect(() => {
    form.setFieldsValue(
      checkEdit === true ? { user: dataEdit } : '');

    // console.log()
  });
  const onFinish = async (values: any) => {
    // console.log(values.user)
    if (!dataEdit) {
      fetch("https://5fbb65b4c09c200016d406f6.mockapi.io/Project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.user),
      }).then(() => {
        success()
        props.onChangeOpen()
      });
    } else {
      fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/Project/${dataEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values.user),
      }
      ).then(() => {
        props.onChangeOpen()
        success();
      })
    }
  };

  const success = () => {
    message.success('done !');
  };
  return (
    <div className="diologPro">

      <Form {...layout} name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}>
        <Form.Item name={['user', 'Name']} label="Name" rules={[{ required: true }]}>
          <Input
          />
        </Form.Item>
        <Form.Item name={['user', 'memberP']} label="Member" rules={[{ required: true }]}>
          <Select
            mode="multiple"
            placeholder="choose name"
          >
            {dataSelect.map((data, index) => {
              return (
                <Option key={index} value={data}>
                  {data}
                </Option>
              )
            })}
          </Select>
        </Form.Item>
        <Form.Item name={['user', 'Date_begin']} label="Date begin" rules={[
          { required: true }]}>
          <Input type="date" />
        </Form.Item>
        <Form.Item name={['user', 'Time_expected']}
          label="Time expected" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'NumberPepole']} label="Leader"
          rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" className="btn"
          >
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>


  );
};
// Diaolog.defaultProps = {
//   employees1: [{
//     // id: number,
//   }],
// }
export default Diaolog;