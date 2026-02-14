import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useTheme } from './hooks/useTheme'

const App = () => {
  const { theme } = useTheme()

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return <AppRoutes />
}

export default App
