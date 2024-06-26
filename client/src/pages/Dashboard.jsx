import { Avatar, Button, Card, Flex, Typography } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useAuth } from '../contexts/AuthContext.jsx'
import NavBar from '../global/NavBar/NavBar.jsx'

import './Dashboard.css'

const Dashboard = () => {
  
  const { userData, logout } = useAuth()

  const handleLogout = async() => {
    await logout()
  }

  return (
    <div className='page-container dashboard'>
      <NavBar />
      <Card className='profile-card'>
        <Flex vertical gap='small' align='center'>
          <Avatar
            size={150}
            icon={
            <UserOutlined className='avatar '/>
          }/>
          <Typography.Title
            level={2}
            strong
            className='username'>
            {userData.name}
          </Typography.Title>
          <Typography.Text type='secondary' strong>
            Email: {userData.email}
          </Typography.Text>
          <Button
            className='profile-btn'
            size='large'
            type='primary'
            onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      </Card>
    </div>
  )
}

export default Dashboard