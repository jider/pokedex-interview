import {createContext, type ReactNode, useEffect, useReducer} from 'react'
import type {AuthUser, User} from '../interfaces'
import {getUserSession, signInUser, signOutUser, signUpUser} from '../services'

// Interfaces
interface AuthState {
  isAuthenticated: boolean
  user?: User
}

interface AuthContextValue extends AuthState {
  signIn: (authUser: AuthUser) => Promise<boolean>
  logout: () => Promise<boolean>
  signUp: (authUser: AuthUser) => Promise<boolean>
}

// Types & Initial State
type InitializeAction = {type: 'INITIALIZE',  payload: AuthState}
type LoginAction = {type: 'SIGNIN', payload: User }
type LogoutAction = {type: 'LOGOUT'}
type RegisterAction = {type: 'SIGNUP', payload: User }
type Action = InitializeAction | LoginAction | LogoutAction | RegisterAction;

const initialState: AuthState = { isAuthenticated: false }

// Handlers
const handlers = {
  INITIALIZE: (state: AuthState, action: InitializeAction | any): AuthState => {
    const { isAuthenticated, user } = action.payload;

    return {
      ...state,
      isAuthenticated,
      user
    }
  },
  SIGNIN: (state: AuthState, action: LoginAction | any): AuthState => {
    const user = action.payload
    return {
      ...state,
      isAuthenticated: true,
      user
    }
  },
  LOGOUT: (state: AuthState, action: LogoutAction | any): AuthState => ({
    ...state,
    isAuthenticated: false,
    user: undefined,
  }),
  SIGNUP: (state: AuthState, action: RegisterAction | any): AuthState => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user
    };
  }
}

const reducer = (state: AuthState, action: Action): AuthState =>
  handlers[action.type] ? handlers[action.type](state, action) : state

export const AuthContext = createContext<AuthContextValue>({
  ...initialState,
  signIn: () => Promise.resolve(false),
  logout: () => Promise.resolve(false),
  signUp: () => Promise.resolve(false)
})

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Initialize the authentication state
  useEffect(() => {
    (async () => {
      try {
        const authenticatedUser = await getUserSession()

        if (authenticatedUser) {
          dispatch({type: 'INITIALIZE', payload: {isAuthenticated: true, user: authenticatedUser}})
        } else {
          dispatch({type: 'INITIALIZE', payload: {isAuthenticated: false, user: undefined}})
        }
      } catch (error) {
        dispatch({type: 'INITIALIZE', payload: {isAuthenticated: false, user: undefined}})
      }
    })()
  }, []);

  const signIn = async (authUser: AuthUser) => {
    const user = await signInUser(authUser)
    if (user) {
      dispatch({type: 'SIGNIN', payload: user})
      return true
    }
    return false
  }

  const signUp = async (authUser: AuthUser) => {
    const user = await signUpUser(authUser)
    if (user) {
      dispatch({type: 'SIGNUP', payload: user})
      return true
    }
    return false
  }

  const logout = async () => {
    const wasOk = await signOutUser()
    if (wasOk) {
      dispatch({type: 'LOGOUT'})
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{
      ...state,
      logout,
      signIn,
      signUp,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
