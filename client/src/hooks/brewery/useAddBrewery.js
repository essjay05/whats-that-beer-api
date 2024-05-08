import { useState } from 'react'
import { message } from 'antd'
import { capitalizeWords, convertToUrlString } from '../../utils/FormatUtils'

// import { useAuth } from '../contexts/AuthContext.jsx'

const useAddBrewery = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null )

  const createBrewery = async (values) => {

    const { name, country, city, region } = values
    
    // Prep name for upsert
    const capitalizedString = capitalizeWords(name)
    const urlString = convertToUrlString(capitalizedString)

    // Insert formatted brewery name for upsert
    const breweryApi = `${import.meta.env.VITE_BREWERY_API_URL}/${urlString}`

    // Format Brewery values for database
    const jsonVals = JSON.stringify({
      name: capitalizeWords(name),
      country: capitalizeWords(country),
      city: capitalizeWords(city),
      region: capitalizeWords(region)
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