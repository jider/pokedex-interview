import type {ReactNode} from 'react'
import {Redirect} from 'react-router-dom'
import {useAuthContext} from '../../hooks'


function PublicRoute({children}: {children: ReactNode}) {
  const {isAuthenticated} = useAuthContext()

  return isAuthenticated
    ? <Redirect to={'/'} />
    : children
}

export default PublicRoute;
