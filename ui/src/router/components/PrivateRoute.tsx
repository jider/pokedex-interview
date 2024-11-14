import type {ReactNode} from 'react'
import {Redirect} from 'react-router-dom'
import {useAuthContext} from '../../hooks'

function PrivateRoute({children}: {children: ReactNode}) {
  const {isAuthenticated} = useAuthContext()

  return isAuthenticated
    ? children
    : <Redirect to={'/sign-in'} />
}

export default PrivateRoute;
