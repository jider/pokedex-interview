import {createResponse} from '../utils/response.ts'
import type {IAuthInteractor, IUserRequest} from '../interfaces'
import {catchErrorAsync} from '../utils/error.ts'

export class AuthController {
  constructor(private readonly interactor: IAuthInteractor) {
  }

  async onGetUserSession() {
    const [_error, userData] = await catchErrorAsync(this.interactor.getCurrentUser())

    return userData
      ? createResponse({status: 200, body: userData})
      : createResponse({status: 400, msg: 'Not Found'})
  }

  async onSignUp(user: IUserRequest) {
    const [_error, userData] = await catchErrorAsync(this.interactor.SignUpUser(user))

    return userData
      ? createResponse({status: 201, body: userData})
      : createResponse({status: 404, msg: 'Bad Request'})
  }

  async onSignIn(user: IUserRequest) {
    const [error, userData] = await catchErrorAsync(this.interactor.SignInUser(user))

    return error
      ? createResponse({status: 404, msg: 'Bad Request'})
      : userData
        ? createResponse({status: 200, body: userData})
        : createResponse({status: 401, msg: 'Unauthorized'})
  }

  async onSignOut() {
    await this.interactor.signOutUser()
    return createResponse({status: 200})
  }
}
