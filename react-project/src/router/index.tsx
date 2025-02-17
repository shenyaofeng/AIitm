import Chat from '../views/Chat/index.tsx'
import Layout from '../views/Layout/index.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthRoute }  from '../components/AuthRoute.tsx'
import React from 'react';
// 使用 React.lazy 动态导入组件
import Login from '../views/Login/index1.tsx';
const Register = React.lazy(() => import('../views/Register/index.tsx'));
const Paint = React.lazy(() => import('../views/Paint/index.tsx'));
const Person = React.lazy(() => import('../views/Person/index.tsx'));

const routers = [
  {
    path: '/',
    element: (
        <Layout />
    ),
    children: [
      {
        index: true,
        element: (
            <Chat />
        )
      },
      {
        path: '/paint',
        element: (
            <AuthRoute>
              <Paint />
            </AuthRoute>
        )
      },
      {
        path: '/me',
        element: (
            <AuthRoute>
              <Person />
            </AuthRoute>
        )
      }
    ]
  },
  {
    path: '/login',
    element: (
        <Login />
    )
  },
  {
    path: '/register',
    element: (
        <Register />
    )
  }
];
const router = createBrowserRouter(routers)

const Routes = () => {
  return <RouterProvider router={router} />
}

export default Routes;