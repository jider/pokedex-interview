import {describe, expect, test} from 'vitest'
import {hashPassword, validatePassword} from './security.ts'

describe('Security util', () => {
  test('hashPassword: The plain password informed is returned as a correct hash', () => {
    const password = '123'
    const expected = '#3#2#1'

    expect(hashPassword(password)).toBe(expected)
  })

  test('validatePassword: The plain password and hash informed are a perfect match', () => {
    const password = '123'
    const hash = '#3#2#1'

    expect(validatePassword(password, hash)).toBeTruthy()
  })

  test('Complete use case: The hashed password and the expected hash are equal', () => {
    const password = '123'
    const expectedHash = '#3#2#1'

    const hashedPassword = hashPassword(password)

    expect(hashedPassword === expectedHash).toBeTruthy()
    expect(validatePassword(password, hashedPassword)).toBeTruthy()
  })
})
