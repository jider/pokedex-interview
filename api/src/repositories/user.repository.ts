import {User} from '../entities'
import type {IAllUsers, IStorageService, IUserRepository} from '../interfaces'

const DEFAULT_KEYS = {
  users: 'users',
  session: 'session',
}

export class UserRepository implements IUserRepository {
  constructor(private readonly storageService: IStorageService) {
  }

  async create(user: User): Promise<User> {
    let usersData = await this.getAllUsers()
    if (!usersData) usersData = {}
    usersData[user.email] = user

    return await this.storageService.set(DEFAULT_KEYS.users, usersData)
  }

  async closeSession() {
    return await this.storageService.remove(DEFAULT_KEYS.session)
  }

  async createSession(userId: string) {
    return await this.storageService.set(DEFAULT_KEYS.session, userId)
  }

  async getAllUsers(): Promise<IAllUsers | null> {
    return await this.storageService.get(DEFAULT_KEYS.users)
  }

  async searchUserByEmail(email: string): Promise<User | null> {
    const usersData = await this.storageService.get(DEFAULT_KEYS.users)
    return usersData ? usersData[email] : null
  }

  async findSessionUser(): Promise<User | null> {
    const userId = await this.storageService.get(DEFAULT_KEYS.session)
    if (!userId) return null

    const allUsers = await this.getAllUsers()
    if (!allUsers) return null

    return Object.values(allUsers).find(user => user.id === userId) ?? null
  }
}
