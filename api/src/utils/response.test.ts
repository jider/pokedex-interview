import {describe, expect, test} from 'vitest'
import {createResponse} from './response.ts'

describe('Response util', () => {
  test('Returns a complete response (body, message and status)', async () => {
    const params = {
      body: {test: 'ok'},
      msg: 'test ok',
      status: 200
    }

    const response = createResponse(params)
    const data = await response.json()

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(params.status)
    expect(response.statusText).toBe(params.msg)
    expect(response.headers).not.toBeUndefined()
    expect(data).toStrictEqual(params.body)
  })

  test('Returns a response without body and statusText', async () => {
    const params = {status: 400}

    const response = createResponse(params)

    expect(response).toBeInstanceOf(Response)
    expect(response.status).toBe(params.status)
    expect(response.body).toBeNull()
    expect(response.statusText).toBe('')
    expect(response.headers).not.toBeUndefined()
  })
})
