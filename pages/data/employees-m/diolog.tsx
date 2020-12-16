
import { Form, Input, InputNumber, Button, message } from 'antd';
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
  dataEdit: any,
  checkEdit: boolean,
  onChangeOpen: any,
  employeesData: any,
  // email: any
}
interface Values {
  user: object,
  email: string,
}
interface DataEdit {
  id: number

}
interface Data {
  email: string,
  id: number
}
const Diaolog: React.FC<Props> = (props) => {
  // console.log(props)

  const dataEdit : DataEdit = props.dataEdit
  const [form] = Form.useForm();
  const checkEdit = props.checkEdit;
  const [employeeData, setEmployeeData] = useState(props.employeesData);
  const arrayEmail = [];
  const idEdit: any = dataEdit ? dataEdit.id : '';
  employeeData.map((data: Data, index: number) => {
    var ind: number;
    if (idEdit === data.id) {
      ind = index;
      arrayEmail.push(data.email);
      arrayEmail[ind] = 'abcbccb';
    } else {
      arrayEmail.push(data.email);
    }
    console.log(arrayEmail)
    return arrayEmail;
  })
  useEffect(() => {
    // setDataEdit()
    form.setFieldsValue(
      checkEdit === true ? { user: dataEdit } : '');
  });
  const onFinish = async (values) => {
    var index = true;
    arrayEmail.map(email => {
      if (email.indexOf(values.user.email) !== -1) {
        return index = false;
      }
    })

    if (index) {
      if (!dataEdit) {
        fetch("https://5fbb65b4c09c200016d406f6.mockapi.io/employees", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values.user),
        }).then(async () => {
          success()
          props.onChangeOpen()
        });
      }
      else if (dataEdit) {
        fetch(`https://5fbb65b4c09c200016d406f6.mockapi.io/employees/${dataEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(values.user),
        }
        ).then(() => {
          props.onChangeOpen()
          // setDataEdit(null)
          success();
        })
      }
    } else {
      window.alert('email đã trùng lặp')
    }
  };

  const success = () => {
    message.success('done !');
  };
  return (
    <div className="diolog">

      <Form {...layout} name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}>
        <Form.Item name={['user', 'name']} label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'email']} label="Email" rules={[{ type: 'email' },
        { required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'Age']}
          label="Age" rules={[{ type: 'number', min: 0, max: 99 }, { required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name={['user', 'address']} label="position" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'chuc_vu']} label="address" rules={[{ required: true }]}>
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
export default Diaolog;
