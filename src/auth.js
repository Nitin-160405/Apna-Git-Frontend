import { createContext, useContext } from 'react'

export const AuthContext = createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const getStoredUserId = () => {
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

  if (!token || !userId) {
    return null
  }

  try {
    const payloadPart = token.split('.')[1]
    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/')
    const paddedBase64 = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const payload = JSON.parse(atob(paddedBase64))

    if (
      payload.id !== userId ||
      typeof payload.exp !== 'number' ||
      payload.exp * 1000 <= Date.now()
    ) {
      return null
    }

    return userId
  } catch {
    return null
  }
}
