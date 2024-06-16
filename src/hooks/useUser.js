import { useContext } from 'react'
import { CurrentUserContext } from '../context'

export const useCurrentUser = () => useContext(CurrentUserContext)
