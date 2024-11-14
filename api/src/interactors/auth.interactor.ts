import {User} from '../entities'
import {hashPassword, validatePassword} from '../utils/security.ts'
import type {IAuthInteractor, IUoW, IUserRequest, IUserResponse} from '../interfaces'

export class AuthInteractor implements IAuthInteractor {
  constructor(private readonly uow: IUoW) {
  }

  async getCurrentUser(): Promise<IUserResponse | null> {
    const userData = await this.uow.auth.findSessionUser()

    if (!userData) return null

    return {
      id: userData.id,
      email: userData.email,
      nickname: userData.nickname
    }
  }

  async SignInUser(userRequest: IUserRequest): Promise<IUserResponse | null> {
    const {email, password} = userRequest
    const userData = await this.uow.auth.searchUserByEmail(email)

    if (!userData || !validatePassword(password, userData.password)) return null

    const loggedUser = await this.uow.auth.createSession(userData.id)
    if (!loggedUser) return null

    return {
      id: userData.id,
      email: userData.email,
      nickname: userData.nickname,
    }
  }

  async signOutUser() {
    return await this.uow.auth.closeSession()
  }

  async SignUpUser(userRequest: IUserRequest): Promise<IUserResponse | null> {
    const {email, password} = userRequest
    const storedUser = await this.uow.auth.searchUserByEmail(email)

    if (storedUser) return null

    const newUser = new User(
      crypto.randomUUID(),
      email,
      email.split('@')[0],
      hashPassword(password)
    )

    const userData = await this.uow.auth.create(newUser)

    if (!userData) return null

    return await this.SignInUser(userRequest)
  }
}
