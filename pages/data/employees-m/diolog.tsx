
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

const Diaolog = (props) => {
  const [dataEdit, setDataEdit] = useState(props.dataEdit);
  const [form] = Form.useForm();
  const checkEdit = props.checkEdit;
  useEffect(() => {
    form.setFieldsValue(
      checkEdit === true ? { user: dataEdit } : '');

  });
  const onFinish = async values => {
    if (!dataEdit) {
      fetch("http://127.0.0.1:3000/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values.user),
      }).then(() => {
        // props.checkData();
        success()
        props.onChangeOpen()
      });
    } else {
      fetch(`http://127.0.0.1:3000/employees/${dataEdit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values.user),
      }
      ).then(() => {
        // alert("hi")
        props.onChangeOpen()
        setDataEdit(null)
        success();
      })
    }
    setDataEdit(null)
  };

  const success = () => {
    message.success('done !');
  };
  console.log(dataEdit,"hi")
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
        <Form.Item name={['user', 'address']} label="chức vụ" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'chuc_vu']} label="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" className="btn"
            // onClick={() => { setDataEdit(null) }}
          >
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>


  );
};
export default Diaolog;