import AuthLayout from "../components/layouts/authLayout";
import { Form, Input, Button, Space,Typography  } from "antd";
import {LOGIN_API } from '../helpers/constants';
import { useRouter } from 'next/router'
const { Title } = Typography;
import Link from 'next/link'
const Login = ({callBackendAPI}) => {
  const router = useRouter()
  const onFinish = async(values) => {
    
    const result = await callBackendAPI({...LOGIN_API, requestBody:{...values}});
    if(result.status)
        router.push('/project')
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

        <Title>Login</Title>
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
        wrapperCol={{
          offset: 8
        }}
      >
      
        <Link href="/register">or Register here!.</Link>
     
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
Login.getLayout = function getLayout(page) {
  return <AuthLayout>{page}</AuthLayout>;
};
export default Login;
