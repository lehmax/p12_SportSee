import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Root from './Root.jsx'

import Community from './pages/Community'
import Error404 from './pages/Error404'
import Home from './pages/Home'
import Profil from './pages/Profil'
import Settings from './pages/Settings'

import './styles/global.scss'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'profil',
        element: <Profil />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'community',
        element: <Community />,
      },
      {
        path: '*',
        element: <Error404 />,
      },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
