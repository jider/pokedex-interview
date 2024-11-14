interface ICreateResponse {
  body?: unknown
  msg?: string
  status: number
}

export const createResponse = ({body, msg, status}: ICreateResponse): Response => {
  return new Response(
    body ? JSON.stringify(body) : null,
    {
      status,
      statusText: msg,
      headers: {'Content-Type': 'application/json'}
    }
  )
}
