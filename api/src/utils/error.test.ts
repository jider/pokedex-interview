import {describe, expect, test} from 'vitest'
import {catchErrorAsync} from './error.ts'

describe('Error util', () => {
  test('catchErrorAsync: returns the expected value from the promise', async () => {
    const promise = Promise.resolve('ok')

    const [error, response] = await catchErrorAsync<string>(promise)

    expect(error).toBeUndefined()
    expect(response).toBe('ok')
  })

  test('catchErrorAsync: returns an error response from the promise is rejected', async () => {
    const promise = Promise.reject('error')

    const [error, response] = await catchErrorAsync<string>(promise)

    expect(error).not.toBeUndefined()
    expect(response).toBeUndefined()
  })

  test('catchErrorAsync: returns an error response from the promise when an error is thrown', async () => {
    const promise = new Promise(() => {
      throw Error('error')
    })

    const [error, response] = await catchErrorAsync(promise)

    expect(error?.message).toBe('error')
    expect(response).toBeUndefined()
  })
})
