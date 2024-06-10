import { useContext } from 'react'
import { CurrentUserContext } from '../context'

export const useCurrentUser = () => useContext(CurrentUserContext)

//'http://localhost:3000/user/18/activity'
//'http://localhost:3000/user/18/average-sessions'
//'http://localhost:3000/user/18/performance'
