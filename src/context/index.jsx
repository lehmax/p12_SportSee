import { createContext } from 'react'
import { useFetch } from '../hooks/useFetch'

export const CurrentUserContext = createContext()
export const UserActivityContext = createContext()
export const UserAverageSessionContext = createContext()
export const UserPerformanceContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const { data: userInfo, isError } = useFetch(import.meta.env.VITE_ENDPOINT)

  if (!userInfo || isError) return false

  return (
    <CurrentUserContext.Provider value={userInfo}>
      {children}
    </CurrentUserContext.Provider>
  )
}
