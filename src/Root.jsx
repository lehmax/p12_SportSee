import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { UserProvider } from './context'

const Root = () => {
  return (
    <UserProvider>
      <Header />
      <SideBar />
      <Outlet />
    </UserProvider>
  )
}

export default Root
