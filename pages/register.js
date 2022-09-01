import AuthLayout from "../components/layouts/authLayout";
import { Form, Input, Button, Space,Typography  } from "antd";
import Link from 'next/link'
import { REGISTER_API } from '../helpers/constants';
import { useRouter } from 'next/router'
const { Title } = Typography;
const Register = ({callBackendAPI}) => {
  const router = useRouter()
  const onFinish = async(values) => {
    const result = await callBackendAPI({...REGISTER_API, requestBody:{...values}});
    if(result.status)
        router.push('/login')
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
      <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
       <Form.Item
        wrapperCol={{
          offset: 8
        }}
      >

        <Title>Register</Title>
      </Form.Item>
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name='emailId'
        label="Email"
        rules={[
          {
            type: 'email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Re-Enter Password"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      
      <Form.Item
        wrapperCol={{
          offset: 8
        }}
      >
      
        <Link href="/login">or Login here!.</Link>
     
        </Form.Item>
      

      <Form.Item
        wrapperCol={{
          offset: 8
        }}
      >
        <Space size='large'>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            <Button htmlType="button">
            Clear
          </Button>
        </Space>
      </Form.Item>
    </Form>
    
  );
};
Register.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Register;
