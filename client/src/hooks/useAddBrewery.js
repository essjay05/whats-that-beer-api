import { useState } from 'react'
import { message } from 'antd'
// import { useAuth } from '../contexts/AuthContext.jsx'

const useAddBrewery = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null )

  const breweryApi = `${import.meta.env.VITE_BREWERY_API_URL}/upsert`

  const createBrewery = async (values) => {

    const { name, country, city, region } = values

    const jsonVals = JSON.stringify({
      name: name,
      country: country,
      city: city,
      region: region
    })

    try {
      setError(null)
      setLoading(true)
      const res = await fetch(breweryApi, {
        mode: 'cors',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonVals
      })

      const data = await res.json()

      if (res.status === 200) {
        message.success(data.message)
      } else {
        message.error(data.message)
      }

      console.log(`res`)
      console.log(res)
      console.log(`data`)
      console.log(data)

    } catch(err) {
      console.error(err)
      message.error('Brewery creation failed.')
    } finally {
      setLoading(false)
    }
  }

  return { loading, error, createBrewery }
}

export default useAddBrewery