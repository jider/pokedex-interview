import {type IPokemonDetailsRequest, IPokemonRequest, IUserRequest} from './contracts'

export type IControllerPayload = IUserRequest | IPokemonRequest[] | IPokemonDetailsRequest | number[] | number
export type IActionWithoutParam = () => Promise<Response>
export type IActionWithParam = (payload: IControllerPayload) => Promise<Response>
export type ControllerAction = IActionWithoutParam | IActionWithParam

export interface IRouter {
  [key: string]: ControllerAction
}
