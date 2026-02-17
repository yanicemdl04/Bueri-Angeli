import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import PageTransition from '../components/PageTransition'
import PrimaryButton from '../components/PrimaryButton'
import GlassCard from '../components/GlassCard'
import { useAuth } from '../hooks/useAuth'
import { getImageByCategory } from '../data/images'
import type { ApiError } from '../services/api'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [motDePasse, setMotDePasse] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const heroImage = getImageByCategory('hero')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!email.trim() || !motDePasse) {
      setError('Email et mot de passe requis.')
      return
    }
    setLoading(true)
    try {
      const user = await login(email.trim(), motDePasse)
      navigate(`/${user.role.toLowerCase()}`)
    } catch (err) {
      const apiErr = err as ApiError
      setError(apiErr.message || 'Connexion impossible. Vérifiez l’email et le mot de passe.')
    } finally {
      setLoading(false)
    }
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
            Connectez-vous avec votre compte pour accéder au tableau de bord.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-sm">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@bueri-angeli.cd"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-sky-blue/50 focus:outline-none"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="motDePasse" className="block text-sm font-medium text-slate-300 mb-1">
                Mot de passe
              </label>
              <input
                id="motDePasse"
                type="password"
                value={motDePasse}
                onChange={(e) => setMotDePasse(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 focus:border-sky-blue/50 focus:outline-none"
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}
            <PrimaryButton type="submit" disabled={loading}>
              <ShieldCheck size={16} />
              {loading ? 'Connexion...' : 'Accéder au tableau de bord'}
            </PrimaryButton>
          </form>
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
