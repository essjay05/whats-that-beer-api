import { Alert, Button, Card, Flex, Form, Input, Spin, Typography, type FormProps } from "antd";
import { Link } from "react-router-dom"
import loginImage from '../../public/undraw_authentication_re_svpt.svg'
import './Auth.css'

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

const handleLogin: FormProps<FieldType>["onFinish"] = async(values) => {
  console.log('Success:', values);
};

const onLoginFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex flex={1}>
          <img
            className="login-img"
            alt="Illustration of online form with a person standing next to it."
            src={loginImage}/>
        </Flex>
        <Flex vertical flex={1}>
          <Typography.Title
            level={3}
            className="title">
            Sign In
          </Typography.Title>
          <Typography.Text
            type="secondary"
            strong
            className="subtitle">
            Unlock exclusive features.
          </Typography.Text>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onLoginFailed}
            autoComplete="off">
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email."},
                { type: 'email', message: 'The input is not a valid email.'}
              ]}>
              <Input placeholder="Enter your email"/>
            </Form.Item>
            <Form.Item<FieldType>
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password.' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            {/* { errorInfo && (<Alert description={errorInfo} type='error' showIcon closable className='alert' />)} */}
            <Form.Item>
              <Button
                // type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                className="btn">
                {/* { loading ? <Spin /> : 'Sign In' } */}
                Sign In
              </Button>
            </Form.Item>
            <Form.Item>
              <Link
                to="/">
                <Button className="btn">Create an Account</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Login