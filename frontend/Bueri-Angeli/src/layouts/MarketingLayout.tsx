import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import Logo from '../components/Logo'
import ThemeToggle from '../components/ThemeToggle'
import PrimaryButton from '../components/PrimaryButton'

const MarketingLayout = () => {
  return (
    <div className="min-h-screen text-white">
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 border-b border-white/10 bg-midnight/70 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-200 md:flex">
            <a href="#solution" className="transition hover:text-white">
              Solution
            </a>
            <a href="#modules" className="transition hover:text-white">
              Modules
            </a>
            <a href="#innovation" className="transition hover:text-white">
              IA & Innovation
            </a>
            <a href="#dashboards" className="transition hover:text-white">
              Dashboards
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <PrimaryButton href="/login">Se connecter</PrimaryButton>
          </div>
        </div>
      </motion.header>
      <Outlet />
    </div>
  )
}

export default MarketingLayout
