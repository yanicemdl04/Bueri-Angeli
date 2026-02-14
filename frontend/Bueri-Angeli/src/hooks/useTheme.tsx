import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

const THEME_KEY = 'sis-theme'

type ThemeContextValue = {
  theme: ThemeMode
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY) as ThemeMode | null
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    }
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      window.localStorage.setItem(THEME_KEY, next)
      return next
    })
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit être utilisé dans ThemeProvider')
  }
  return context
}
