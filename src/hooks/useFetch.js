import { useEffect, useState } from 'react'

export const useFetch = (url) => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()

        setData(json)
      } catch (error) {
        console.log(error)

        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { isLoading, data, isError }
}
