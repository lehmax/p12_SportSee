import { useContext } from 'react'
import { CurrentUserContext } from '../context'
import { useFetch } from '../hooks/useFetch'

export const useCurrentUser = () => useContext(CurrentUserContext)

export const useUserData = () => {
  const { userEndpoints } = useCurrentUser()

  const { data: user, isError } = useFetch(userEndpoints.user)
  if (!user || isError) return false

  return {
    user,
  }
}
