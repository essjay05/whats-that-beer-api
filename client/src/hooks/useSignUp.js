import { useState } from 'react'
import { message } from 'antd'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext.jsx'

const useSignUp = () => {
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null )

  const mongoDbRegisterEndpoint = `${import.meta.env.VITE_USER_API_URL}`

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError('Passwords do not match!')
    }

    console.log(`registerUser values:`)
    console.log(values)

    const signupBody = JSON.stringify(values)
    console.log(`signupBody:`) 
    console.log(signupBody)

    const { name, email, password } = values

    console.log(`name: ${name}, email: ${email}, password: ${password}`)

    axios.defaults.headers.post['Content-Type'] ='application/json; charset=utf-8';
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

    try {
      setError(null)
      setLoading(false)
      // const res = await fetch(mongoDbRegisterEndpoint, {
      //   mode: 'no-cors',
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: signupBody
      // })

      const res = await axios.post(
        mongoDbRegisterEndpoint,
        {
          name: name,
          email: email,
          password: password
        },
        {headers})

      const data = await res.json()
      console.log(`data`)
      console.log(data)

      if (res.status === 201) {
        message.success('User successfully registered!')
      } else if (res.status === 400) {
        setError(data.message)
        login(data.token, data.user)
      } else {
        message.error('Registration failed.')
      }
    } catch(err) {
      message.error('Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, registerUser }
}

export default useSignUp