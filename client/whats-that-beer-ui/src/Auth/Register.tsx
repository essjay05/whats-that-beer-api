import { Button, Card, Flex, Form, Input, Typography, type FormProps } from "antd";

type FieldType = {
  name?: string;
  password?: string;
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
      <Flex>
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
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password.' }]}>
              <Input.Password placeholder="Enter your password" />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Flex>
        {/* <Flex></Flex> */}
      </Flex>
    </Card>
  )
}

export default Register