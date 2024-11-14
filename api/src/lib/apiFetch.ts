import {authRoutes, pokedexRoutes, pokemonRoutes} from '../routes'
import {createResponse} from '../utils/response.ts'
import type {
  IActionWithoutParam,
  IActionWithParam,
  IControllerPayload,
  IRouter
} from '../interfaces'


interface IRouteMap {
  [key: string]: IRouter
}

const routesMap: IRouteMap = {
  auth: authRoutes,
  pokemon: pokemonRoutes,
  pokedex: pokedexRoutes,
}

const apiFetch = async (url: string, payload?: IControllerPayload) => {
  const [controllerName, path] = url.split('/');
  const routes = routesMap[controllerName];

  if (!routes)
    return createResponse({status: 404, msg: 'Not Found'})

  const action = routes[path]
  if (!action)
    return createResponse({status: 404, msg: 'Not Found'})

  return payload
    ? await (action as IActionWithParam)(payload)
    : await (action as IActionWithoutParam)()
}

export default apiFetch
