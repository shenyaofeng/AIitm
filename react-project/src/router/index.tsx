import Chat from '../views/Chat/index.tsx'
import Paint from '../views/Paint/index.tsx'
import Layout from '../views/Layout/index.tsx'
import Login from '../views/Login/index.tsx'
import { createBrowserRouter } from 'react-router-dom'

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
        element: <Paint />
      },
      {
        path: '/me',
        element: <div>我的</div>
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
])

export default router