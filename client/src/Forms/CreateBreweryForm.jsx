import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom'
import useAddBrewery from '../hooks/useAddBrewery';

const CreateBreweryForm = () => {

  const { loading, error, createBrewery } = useAddBrewery()

  const handleCreateBrewery = (values) => {
    createBrewery(values)
  }

  const onCreateBreweryFailed = (errorInfo) => {
    console.log('Failed: ', errorInfo)
  }

  return (
    <Card className='form-container'>
      <Flex vertical flex={1}>
        <Typography.Title
          level={3}
          className='title'>
          Create a Brewery
        </Typography.Title>
        <Form
          layout='vertical'
          initialValues={{ remember: true }}
          onFinish={handleCreateBrewery}
          onFinishFailed={onCreateBreweryFailed}
          autoComplete='off'>
          <Form.Item
            label='Brewery Name'
            name='name'
            rules={[{ required: true, message: 'Please input the brewery name.'}]}>
            <Input placeholder='Enter the brewery name'/>
          </Form.Item>
          <Form.Item
            label='Brewery Country'
            name='country'
            rules={[{ required: true, message: 'Please input the brewery country.'}]}>
            <Input placeholder='Enter the brewery country'/>
          </Form.Item>
          <Form.Item
            label='Brewery City'
            name='city'
            rules={[{ required: true, message: 'Please input the brewery city.'}]}>
            <Input placeholder='Enter the brewery city'/>
          </Form.Item>
          <Form.Item
            label='Brewery Region'
            name='region'
            rules={[{ required: true, message: 'Please input the brewery region.'}]}>
            <Input placeholder='Enter the brewery region'/>
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
              htmlType='submit'
              className='btn'>
              { loading ? <Spin /> : 'Create Brewery' }
            </Button>
          </Form.Item>
          <Form.Item>
            <Link
              to="/edit-brewery">
              <Button className="btn">Edit Brewery</Button>
            </Link>
          </Form.Item>
        </Form>
      </Flex>
      
    </Card>
  )
}

export default CreateBreweryForm