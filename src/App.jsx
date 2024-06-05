import { Route, Routes } from 'react-router-dom'

import Community from './pages/Community'
import Home from './pages/Home'
import Layout from './pages/Layout'
import Profil from './pages/Profil'
import Settings from './pages/Settings'

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />} path="/">
        <Route element={<Home />} index />
        <Route element={<Profil />} path="/profil" />
        <Route element={<Settings />} path="/settings" />
        <Route element={<Community />} path="/community" />
      </Route>
    </Routes>
  )
}

export default App
