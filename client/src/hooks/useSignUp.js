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

    const signupBody = JSON.stringify(values)
    console.log(`signupBody:`)
    console.log(signupBody)

    try {
      setError(null)
      setLoading(false)
      const res = await fetch(mongoDbRegisterEndpoint, {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: signupBody
      })

      const data = await res.json()
      console.log(`data`)
      console.log(data)
      if (res.status === 201) {
        message.success(data.message)
      } else if (res.status === 4000) {
        setError(data.message)
        login(data.token, data.user)
      } else {
        message.error('Registration failed')
      }
    } catch(err) {
      message.error(err)
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, registerUser }
}

export default useSignUp