import { useMemo } from 'react'

export type UserRole = 'Admin' | 'Enseignant' | 'Parent'

const AUTH_KEY = 'sis-role'

export const useAuth = () => {
  const role = useMemo(() => {
    const stored = window.localStorage.getItem(AUTH_KEY)
    if (stored === 'Admin' || stored === 'Enseignant' || stored === 'Parent') {
      return stored
    }
    return null
  }, [])

  const loginAs = (nextRole: UserRole) => {
    window.localStorage.setItem(AUTH_KEY, nextRole)
  }

  const logout = () => {
    window.localStorage.removeItem(AUTH_KEY)
  }

  return { role, loginAs, logout }
}
