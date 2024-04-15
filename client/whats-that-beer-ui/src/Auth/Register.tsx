import { Alert, Button, Card, Flex, Form, Input, Spin, Typography, type FormProps } from "antd";
import { Link } from "react-router-dom"
import signupImage from '../../public/undraw_sign_up_n6im(1).svg'
import './Auth.css'

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  remember?: string;
};

const handleRegister: FormProps<FieldType>["onFinish"] = (values) => {
  console.log('Success:', values);
};

const onRegisterFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Register = () => {

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
            <Form.Item<FieldType>
              label="Full Name"
              name="name"
              rules={[{ required: true, message: "Please input your full name."}]}>
              <Input placeholder="Enter your full name"/>
            </Form.Item>
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
            <Form.Item<FieldType>
              label="Confirm Password"
              name="passwordConfirm"
              rules={[{ required: true, message: 'Please confirm your password.' }]}>
              <Input.Password placeholder="Re-enter your password" />
            </Form.Item>
            {/* { error && (<Alert description={error} type='error' showIcon closable className='alert' />)} */}
            <Form.Item>
              <Button
                // type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                className="btn">
                {/* { loading ? <Spin /> : 'Create Account' } */}
                Create Account
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