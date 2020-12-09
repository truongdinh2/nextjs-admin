
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

      console.log()
  });
  const onFinish = async values => {
    console.log(values.user)
    if (!dataEdit) {
      fetch("http://10.1.16.159:3000/Project", {
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
      fetch(`http://10.1.16.159:3000/Project/${dataEdit.id}`, {
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
  console.log(process.env)
  return (
    <div className="diologPro">

      <Form {...layout} name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}>
        <Form.Item name={['user', 'Name']} label="Name" rules={[{ required: true }]}>
          <Input
          />
        </Form.Item>

        <Form.Item name={['user', 'Date_begin']} label="Date begin" rules={[
        { required: true }]}>
          <Input type="date"/>
        </Form.Item>
        <Form.Item name={['user', 'Time_expected']}
          label="Time expected" rules={[ { required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name={['user', 'NumberPepole']} label="Number pepole" 
        rules={[ { required: true }]}>
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