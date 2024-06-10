import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'
import { CurrentUserProvider } from './context'

const Root = () => {
  return (
    <CurrentUserProvider>
      <Header />
      <SideBar />
      <Outlet />
    </CurrentUserProvider>
  )
}

export default Root
