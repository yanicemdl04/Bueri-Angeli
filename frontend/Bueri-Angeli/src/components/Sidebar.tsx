import { LayoutGrid, Users, BookOpen, GraduationCap, ShieldCheck, Bell } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import { UserRole } from '../hooks/useAuth'

const navConfig: Record<UserRole, { label: string; to: string; icon: JSX.Element }[]> = {
  Admin: [
    { label: 'Vue d’ensemble', to: '/admin', icon: <LayoutGrid size={18} /> },
    { label: 'Élèves', to: '/admin?tab=eleves', icon: <Users size={18} /> },
    { label: 'Enseignants', to: '/admin?tab=enseignants', icon: <GraduationCap size={18} /> },
    { label: 'Cours & classes', to: '/admin?tab=classes', icon: <BookOpen size={18} /> },
    { label: 'Sécurité', to: '/admin?tab=securite', icon: <ShieldCheck size={18} /> }
  ],
  Enseignant: [
    { label: 'Mes classes', to: '/enseignant', icon: <LayoutGrid size={18} /> },
    { label: 'Notes', to: '/enseignant?tab=notes', icon: <BookOpen size={18} /> },
    { label: 'Notifications', to: '/enseignant?tab=notifications', icon: <Bell size={18} /> }
  ],
  Parent: [
    { label: 'Bulletin', to: '/parent', icon: <LayoutGrid size={18} /> },
    { label: 'Notes', to: '/parent?tab=notes', icon: <BookOpen size={18} /> },
    { label: 'Notifications', to: '/parent?tab=notifications', icon: <Bell size={18} /> }
  ]
}

const Sidebar = ({ role }: { role: UserRole }) => {
  return (
    <aside className="hidden h-screen w-72 flex-col gap-6 border-r border-white/5 bg-midnight/90 px-6 py-8 lg:flex">
      <Logo />
      <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.3em] text-sky-100/60">
        {role}
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navConfig[role].map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-sky-blue/20 text-white'
                  : 'text-slate-300 hover:bg-white/5 hover:text-white'
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-200">
        Plateforme SIS sécurisée avec RBAC et traçabilité complète.
      </div>
    </aside>
  )
}

export default Sidebar
