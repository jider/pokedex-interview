export const hashPassword = (password: string): string => {
  let hashedPassword = ''
  for (let char of password) {
    hashedPassword = `#${char}${hashedPassword}`
  }
  return hashedPassword
}

export const validatePassword = (password: string, hash: string): boolean => {
  let originalPassword = ''
  const cleanedHash = hash.replaceAll('#', '')

  for (let char of cleanedHash) {
    originalPassword = `${char}${originalPassword}`
  }

  return password === originalPassword
}


