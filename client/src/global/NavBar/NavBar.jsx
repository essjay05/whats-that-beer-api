import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd'
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className='nav-container'>
      <Flex>
        <h1 className='logo-text'>What's That Beer?</h1>
        <ul className='nav-links'>
          <li className='nav-link'>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
          <li className='nav-link'>
            <Link to='/breweries'>Breweries</Link>
          </li>
          <li className='nav-link'>
            <Link to='/beers'>Beers</Link>
          </li>
        </ul>
      </Flex>
    </nav>
  )
}

export default NavBar