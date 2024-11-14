import type {IUserRequest, IUserResponse} from './contracts'

export interface IAuthInteractor {
  getCurrentUser(): Promise<IUserResponse | null>

  SignInUser({email, password}: IUserRequest): Promise<IUserResponse | null>

  signOutUser(): Promise<void>

  SignUpUser({email, password}: IUserRequest): Promise<IUserResponse | null>
}
