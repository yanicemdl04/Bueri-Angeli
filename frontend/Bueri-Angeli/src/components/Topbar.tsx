import { Bell, Search } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import { UserRole } from '../hooks/useAuth'

const Topbar = ({ role }: { role: UserRole }) => {
  return (
    <header className="glass flex flex-col gap-4 rounded-3xl px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm text-slate-300">Tableau de bord</p>
        <h1 className="text-2xl font-semibold text-white">Bienvenue, {role}</h1>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
          <Search size={16} />
          <span>Rechercher</span>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:border-sky-blue/60"
        >
          <Bell size={16} />
          Notifications
        </button>
        <ThemeToggle />
      </div>
    </header>
  )
}

export default Topbar
