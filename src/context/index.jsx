import { createContext, useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const { data } = useFetch('http://localhost:3000/user/18')
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!data) return

    setUser(data.data)
  }, [data])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
