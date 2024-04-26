import { useState } from 'react'
import { message } from 'antd'
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

    const { name, email, password } = values

    const jsonVals = JSON.stringify({
      name: name,
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

      if (res.status === 201) {
        message.success('User successfully registered!')
        login(data.token, data.user)
      } else if (res.status === 400) {
        setError(data.message)
        console.log('Res.status === 400')
      } else if (res.status === 409) {
        setError(data.message)
        message.error('User already exists.')
        console.log('Res.status === 409')
      } else {
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

  return { loading, error, registerUser }
}

export default useSignUp