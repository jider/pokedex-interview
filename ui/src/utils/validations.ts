const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

export const isValidEmail = (value: string) => {
  return value.match(emailRegex) !== null
}
