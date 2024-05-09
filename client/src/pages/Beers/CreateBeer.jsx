// import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from 'antd';
// import { Link } from 'react-router-dom'
import CreateBeerForm from "../../Forms/CreateBeerForm"

import NavBar from "../../global/NavBar/NavBar"

const CreateBeer = () => {
  return (
    <div className='page-container'>
      <NavBar/>
      <h1>Create Beer</h1>
      <section>
        <h2>Add Beer Form here:</h2>
        <CreateBeerForm/>
      </section>
    </div>
  )
}

export default CreateBeer