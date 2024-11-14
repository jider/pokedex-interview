import {User} from '../entities'

export interface IAllUsers {
  [key: string]: User
}

export interface IUserRepository {
  create(data: User): Promise<User>

  closeSession(): Promise<void>

  createSession(userId: string): Promise<any>

  getAllUsers(): Promise<IAllUsers | null>

  searchUserByEmail(userId: string): Promise<User | null>

  findSessionUser(): Promise<User | null>
}
