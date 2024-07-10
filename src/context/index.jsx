import { createContext } from 'react'
import { useLocation } from 'react-router-dom'
import { createUserEndpoints } from '../config'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = ({ children }) => {
  const { pathname } = useLocation()
  const userId = pathname.split('/').pop()
  const userEndpoints = createUserEndpoints(userId)

  return (
    <CurrentUserContext.Provider value={{ userId, userEndpoints }}>
      {children}
    </CurrentUserContext.Provider>
  )
}
