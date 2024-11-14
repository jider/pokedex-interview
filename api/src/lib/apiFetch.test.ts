import {afterEach, describe, expect, test, vi} from 'vitest'
import {apiFetch} from '../index.ts'
import {IUserRequest} from '../interfaces'

vi.mock('../routes/auth.routes.ts', () => {
  const authRoutes = {
    'sign-up': (payload: IUserRequest) => payload
  }
  return {default: authRoutes}
})

vi.mock('../routes/pokedex.routes.ts', () => {
  return {default: {}}
})

vi.mock('../routes/pokemon.routes.ts', () => {
  return {default: {}}
})

describe('API Fetch library', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('Returns a 400 response if the url is not correct', async () => {
    const url = 'test/test-ko'
    const payload: IUserRequest = {email: '', password: ''}

    const response = await apiFetch(url, payload)

    console.log(response)

    expect(response).toBeInstanceOf(Response)
    expect(response.body).toBeNull()
    expect(response.status).toBe(404)
    expect(response.statusText).toBe('Not Found')
  })

  test('Calls the correct controller based on the url', async () => {
    const url = 'auth/sign-up'
    const payload: IUserRequest = {email: 'test@example.com', password: 'test123'}

    const response = await apiFetch(url, payload)

    expect(response).toBe(payload)
  })
})
