import { FC, PropsWithChildren } from 'react'
import { Navigate, NavigateProps, useLocation } from 'react-router-dom'

import { AuthProviderValue, useAuth } from '../../providers/AuthProvider'

const AuthRouteGuard: FC<
  PropsWithChildren<{
    to: NavigateProps['to']
    predicate: (value: AuthProviderValue['authed']) => boolean
  }>
> = ({ to, children, predicate }) => {
  const location = useLocation()
  const { authed } = useAuth()
  if (!predicate(authed)) return <Navigate replace state={{ from: location }} to={to} />
  return <>{children}</>
}

export default AuthRouteGuard
