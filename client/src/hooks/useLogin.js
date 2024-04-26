import { useState } from 'react'
import { message } from 'antd'
import { useAuth } from '../contexts/AuthContext.jsx'

const useLogin = () => {
  const { login } = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  const mongoDbRegisterEndpoint = `${import.meta.env.VITE_USER_API_URL}/signin`

  const loginUser = async (values) => {

    const { email, password } = values

    const jsonVals = JSON.stringify({
      email: email,
      password: password
    })

    try {
      setError(null)
      setLoading(true)
      const res = await fetch(mongoDbRegisterEndpoint, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonVals
      })

      const data = await res.json()

      if (res.status === 200) {
        message.success('User successfully logged in!')
        login(data.token, data.user)
      } else if (res.status === 404) {
        setError(data.message)
        console.log('Res.status === 404')
      } else if (res.status === 401) {
        setError(data.message)
        message.error('Resgistration failed.')
        console.log('Res.status === 401')
      } else {
        setError(data.message)
        message.error('Registration failed.')
      }

      console.log(`res`)
      console.log(res)
    } catch(err) {
      console.error(err)
      message.error('Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, loginUser }
}

export default useLogin