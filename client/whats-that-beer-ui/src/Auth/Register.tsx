import { Button, Card, Flex, Form, Input, Typography, type FormProps } from "antd";
import { Link } from "react-router-dom"
import signupImage from '../../public/undraw_sign_up_n6im(1).svg'
import './Register.css'

type FieldType = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="btn">
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