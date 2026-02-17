import { useState, useCallback, useEffect } from 'react'
import { authApi, type User, type UserRole } from '../services/authApi'

const TOKEN_KEY = 'sis-token'
const USER_KEY = 'sis-user'

function getStoredUser(): User | null {
  try {
    const raw = window.localStorage.getItem(USER_KEY)
    if (!raw) return null
    const user = JSON.parse(raw) as User
    if (user?.role) return user
  } catch {
    // ignore
  }
  return null
}

export type { UserRole }

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => getStoredUser())
  const role = user?.role ?? null

  useEffect(() => {
    setUser(getStoredUser())
  }, [])

  const login = useCallback(async (email: string, motDePasse: string) => {
    const { token, user: u } = await authApi.login(email, motDePasse)
    window.localStorage.setItem(TOKEN_KEY, token)
    window.localStorage.setItem(USER_KEY, JSON.stringify(u))
    setUser(u)
    return u
  }, [])

  const logout = useCallback(() => {
    window.localStorage.removeItem(TOKEN_KEY)
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  const loginAs = useCallback((nextRole: UserRole) => {
    const mockUser = { role: nextRole } as User
    window.localStorage.setItem(USER_KEY, JSON.stringify(mockUser))
    window.localStorage.setItem(TOKEN_KEY, 'mock')
    setUser(mockUser)
  }, [])

  return { user, role, login, logout, loginAs }
}
