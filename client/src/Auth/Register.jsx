import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import { Link } from "react-router-dom"
import signupImage from '/undraw_sign_up_n6im(1).svg'
import './Auth.css'
import useSignUp from "../hooks/useSignUp";

const Register = () => {

  const { loading, error, registerUser } = useSignUp()

  const handleRegister = (values) => {
    registerUser(values);
  };

  const onRegisterFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        <Flex vertical flex={1}>
          <Typography.Title
            level={3}
            className="title">
            Create an Account
          </Typography.Title>
          <Typography.Text
            type="secondary"
            strong
            className="subtitle">
            Join for exclusive access!
          </Typography.Text>
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={handleRegister}
            onFinishFailed={onRegisterFailed}
            autoComplete="off">
            <Form.Item
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please input your full name."}]}>
              <Input placeholder="Enter your full name"/>
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input your email."},
                { type: 'email', message: 'The input is not a valid email.'}
              ]}>
              <Input placeholder="Enter your email"/>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password.' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[{ required: true, message: 'Please confirm your password.' }]}>
              <Input.Password placeholder="Re-enter your password" />
            </Form.Item>
            { error && (
              <Alert
                description={error}
                type='error'
                showIcon
                closable
                className='alert' />
            )}
            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                className="btn">
                { loading ? <Spin /> : 'Create Account' }
              </Button>
            </Form.Item>
            <Form.Item>
              <Link
                to="/login">
                <Button className="btn">Sign In</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
        <Flex flex={1}>
          <img
            className="register-img"
            alt="Illustration of online form with a person standing next to it."
            src={signupImage}/>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Register