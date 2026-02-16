import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'
import GlassCard from '../components/GlassCard'
import { useAuth, UserRole } from '../hooks/useAuth'
import { getImageByCategory } from '../data/images'

const roles: UserRole[] = ['Admin', 'Enseignant', 'Parent']

const LoginPage = () => {
  const [role, setRole] = useState<UserRole>('Admin')
  const navigate = useNavigate()
  const { loginAs } = useAuth()
  const heroImage = getImageByCategory('hero')

  const handleLogin = () => {
    loginAs(role)
    navigate(`/${role.toLowerCase()}`)
  }

  return (
    <PageTransition>
      <div className="mx-auto grid min-h-[85vh] max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-xs uppercase tracking-[0.4em] text-sky-100/70">
            Accès sécurisé
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Connexion SIS</h1>
          <p className="mt-4 text-slate-300">
            Sélectionnez votre rôle pour accéder à un tableau de bord adapté.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-full border px-5 py-2 text-sm font-semibold transition ${
                  role === item
                    ? 'border-sky-blue/70 bg-sky-blue/20 text-white'
                    : 'border-white/10 text-slate-300 hover:border-sky-blue/50'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-10 max-w-sm">
            <PrimaryButton onClick={handleLogin}>
              <ShieldCheck size={16} />
              Accéder au tableau de bord
            </PrimaryButton>
          </div>
        </motion.div>

        <GlassCard className="relative overflow-hidden">
          <img src={heroImage.src} alt={heroImage.title} className="h-72 w-full rounded-2xl object-cover" />
          <div className="mt-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Accès par rôle (RBAC)</h2>
            <p className="text-sm text-slate-300">
              Les administrateurs, enseignants et parents disposent de permissions
              strictes et d’un parcours sécurisé.
            </p>
            <div className="grid gap-3 text-sm text-slate-200">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Contrôle d’accès avancé
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Historique et traçabilité
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                Sécurité des données scolaires
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </PageTransition>
  )
}

export default LoginPage
