import { useContext } from 'react'
import { CurrentUserContext } from '../context'
import { useFetch } from '../hooks/useFetch'

/**
 * Custom hook to get user context.
 */
export const useCurrentUser = () => useContext(CurrentUserContext)

/**
 * Custom hook to fetch the current user's data.
 *
 * @returns {Object} An object containing the user's data.
 */
export const useUserData = () => {
  const { userEndpoints } = useCurrentUser()

  const { data: user } = useFetch(userEndpoints.user)

  return {
    user,
  }
}
