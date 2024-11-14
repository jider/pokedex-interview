import {apiFetch} from '@my-pokedex-app/api'
import type {AuthUser, User} from '../interfaces'

export const getUserSession = async () => {
  const response = await apiFetch('auth/getUserSession')

  if (!response.ok) return null
  return await response.json()
}

export const signInUser = async (authUser: AuthUser): Promise<User | null> => {
  const response = await apiFetch('auth/sign-in', authUser)

  if (!response.ok) return null
  return await response.json()
}

export const signUpUser = async (authUser: AuthUser): Promise<User | null> => {
  const response = await apiFetch('auth/sign-up', authUser)

  if (!response.ok) return null
  return await response.json()
}

export const signOutUser = async (): Promise<boolean> => {
  const response = await apiFetch('auth/sign-out')
  return response.ok
}
