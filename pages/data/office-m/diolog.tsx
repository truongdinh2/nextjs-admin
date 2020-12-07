
import { Form, Input, InputNumber, Button, message, Radio } from 'antd';
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
      fetch("http://127.0.0.1:3000/office", {
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
      fetch(`http://127.0.0.1:3000/office/${dataEdit.id}`, {
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
  return (
    <div className="diolog">

      <Form {...layout} name="nest-messages" onFinish={onFinish}
        validateMessages={validateMessages}
        form={form}>
        <Form.Item name={['user', 'Floor']} label="Floor" rules={[{ required: true }]}>
          <Input

          />
        </Form.Item>
        <Form.Item name={['user', 'Status']} label="Status">
        <Radio.Group>
          <Radio value={true}>empty</Radio>
          <Radio value={false}>ordered</Radio>
        </Radio.Group>
      </Form.Item>
        <Form.Item name={['user', 'Time_from']}
          label="Time from"
          rules={[{ required: true }]}>
          <Input type="time"/>
        </Form.Item>
        <Form.Item name={['user', 'time_to']}
          label="Time to"
          rules={[{ required: true }]}
        >
          <Input type="time" />
        </Form.Item>
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit" className="btn"
          // onClick={()=>{setUserEdits(null)}}
          >
            Submit
        </Button>
        </Form.Item>
      </Form>
    </div>


  );
};
export default Diaolog;