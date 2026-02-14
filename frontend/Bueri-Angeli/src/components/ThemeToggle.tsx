import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex items-center gap-2 rounded-full border border-sky-blue/30 bg-white/5 px-4 py-2 text-sm text-sky-100 transition hover:border-sky-blue/60 hover:text-white"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      <span>{isDark ? 'Mode clair' : 'Mode sombre'}</span>
    </button>
  )
}

export default ThemeToggle
