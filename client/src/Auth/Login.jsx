import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
import { Link } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import loginImage from '/undraw_authentication_re_svpt.svg'
import './Auth.css'

const Login = () => {

  const { error, loading, loginUser } = useLogin()

  const handleLogin = async(values) => {
    await loginUser(values)
  };

  const onLoginFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card className='form-container'>
      <Flex gap='large' align='center'>
        <Flex flex={1}>
          <img
            className='login-img'
            alt='Illustration of online form with a person standing next to it.'
            src={loginImage}/>
        </Flex>
        <Flex vertical flex={1}>
          <Typography.Title
            level={3}
            className='title'>
            Sign In
          </Typography.Title>
          <Typography.Text
            type='secondary'
            strong
            className='subtitle'>
            Unlock exclusive features.
          </Typography.Text>
          <Form
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={handleLogin}
            onFinishFailed={onLoginFailed}
            autoComplete='off'>
            <Form.Item
              label='Email'
              name='email'
              rules={[
                { required: true, message: 'Please input your email.'},
                { type: 'email', message: 'The input is not a valid email.'}
              ]}>
              <Input placeholder='Enter your email'/>
            </Form.Item>
            <Form.Item
              label='Password'
              name='password'
              rules={[{ required: true, message: 'Please input your password.' }]}>
              <Input.Password placeholder='Enter your password' />
            </Form.Item>
            { error && (<Alert description={error} type='error' showIcon closable className='alert' />)}
            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType='submit'
                className='btn'>
                { loading ? <Spin /> : 'Sign In' }
              </Button>
            </Form.Item>
            <Form.Item>
              <Link
                to='/'>
                <Button className='btn'>Create an Account</Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
  )
}

export default Login