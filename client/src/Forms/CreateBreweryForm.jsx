import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";

const CreateBreweryForm = () => {
  return (
    <Card className='form-container'>
      <Flex vertical flex={1}>
        <Typography.Title
          level={3}
          className="title">
          Create a Brewery
        </Typography.Title>
        <Form
          layout="vertical"
          initialValues={{ remember: true }}
          // onFinish={handleRegister}
          // onFinishFailed={onRegisterFailed}
          autoComplete="off">
          <Form.Item
            label="Brewery Name"
            name="name"
            rules={[{ required: true, message: "Please input the brewery name."}]}>
            <Input placeholder="Enter the brewery name"/>
          </Form.Item>
          <Form.Item>
            <Button
              // type={`${loading ? '' : 'primary'}`}
              htmlType="submit"
              className="btn">
              {/* { loading ? <Spin /> : 'Create Brewery' } */}
              Create Brewery
            </Button>
          </Form.Item>
        </Form>
      </Flex>
      
    </Card>
  )
}

export default CreateBreweryForm