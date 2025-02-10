import Chat from '../views/Chat/index.tsx'
import Paint from '../views/Paint/index.tsx'
import Layout from '../views/Layout/index.tsx'
import Login from '../views/Login/index1.tsx'
import Register from '../views/Register/index.tsx'
import Person from '../views/Person/index.tsx'
import { createBrowserRouter } from 'react-router-dom'
import {AuthRoute}  from '../components/AuthRoute.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Chat />
      },
      {
        path: '/paint',
        element: (
          <AuthRoute><Paint /></AuthRoute>
        )
      },
      {
        path: '/me',
        element: (
          <AuthRoute><Person /></AuthRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
])

export default router