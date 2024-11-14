import {authController as controller} from '../config/IoC.ts'
import type {IRouter, IUserRequest} from '../interfaces'

const router: IRouter = {
  'getUserSession': () => controller.onGetUserSession(),
  'sign-up': (user) => controller.onSignUp(user as IUserRequest),
  'sign-in': (user) => controller.onSignIn(user as IUserRequest),
  'sign-out': () => controller.onSignOut(),
}

export default router
