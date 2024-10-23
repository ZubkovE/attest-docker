import { RouteObject } from 'react-router/dist/lib/context'
import { Outlet, useRoutes } from 'react-router-dom'

// import AuthRouteGuard from './guards/AuthRouteGuard'
//
// import AppInitializingGuard from '@/app/router/guards/AppInitializingGuard'
// import usersRoutes from '@/app/router/usersRoutes'
// import sellerRoutes from './sellerRoutes'
import Login from '../../../pages/Login'
import Forbidden from '../../../pages/Forbidden'
import MainPage from '../../../components/blocks/MainPage'
import BaseLayout from '../../../components/layouts/BaseLayout.tsx'
import AuthRouteGuard from './guards/AuthRouteGuard.tsx'

const router: RouteObject[] = [
  {
    path: '',
    element: <Outlet />,
    children: [
      {
        path: '/forbidden',
        element: (
          <AuthRouteGuard to="/" predicate={(v) => v}>
            <Forbidden />
          </AuthRouteGuard>
        )
      },
      {
        path: '/auth',
        element: (
          <AuthRouteGuard to="/" predicate={(v) => !v}>
            <Login />
          </AuthRouteGuard>
        )
      },
      {
        path: '/',
        element: (
          <AuthRouteGuard to="/auth" predicate={(v) => v}>
            <Outlet />
          </AuthRouteGuard>
        ),
        children: [
          {
            path: '',
            element: (
              <BaseLayout>
                <MainPage />
              </BaseLayout>
            )
          }
        ]
      }
    ]
  }
]

export const Routes = () => useRoutes(router)
