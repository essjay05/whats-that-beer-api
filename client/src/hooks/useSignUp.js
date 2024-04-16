import { useState } from 'react'
import { message } from 'antd'
import { useAuth } from '../contexts/AuthContext.jsx'

const useSignUp = () => {
  const login = useAuth()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null )

  const registerUser = async (values) => {
    if (values.password !== values.passwordConfirm) {
      return setError('Passwords do not match!')
    }

    try {
      setError(null)
      setLoading(false)
      const res = await fetch(`http://localhost:${import.meta.env.PORT}/api/signup`, {
        method: 'POST',
        body: JSON.stringify(values)
      })

      const data = await res.json()
      if (res.status === 201) {
        message.success(data.message)
      } else if (res.status === 4000) {
        setError(data.message)
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