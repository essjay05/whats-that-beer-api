// import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
// import { Link } from 'react-router-dom'

import NavBar from "../../global/NavBar/NavBar"
import CreateBreweryForm from "../../Forms/CreateBreweryForm"

const CreateBrewery = () => {
  return (
    <div className='page-container'>
      <NavBar/>
      <h1>Create Brewery</h1>
      <section>
        <h2>Add Brewery Form here:</h2>
        <CreateBreweryForm/>
      </section>
    </div>
  )
}

export default CreateBrewery