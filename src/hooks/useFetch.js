import { useEffect, useState } from 'react'

/**
 * Custom hook to fetch data from a given URL.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Object} An object containing the following properties:
 *   @returns {boolean} isLoading - Indicates if the data is currently being loaded.
 *   @returns {Object|null} data - The fetched data, or null if not yet available.
 *   @returns {boolean} isError - Indicates if there was an error during the fetch operation.
 */
export const useFetch = url => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isError, setError] = useState(false)

  useEffect(() => {
    if (!url) return

    const fetchData = async () => {
      try {
        const response = await fetch(url)
        const json = await response.json()

        setData(json?.data)
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
