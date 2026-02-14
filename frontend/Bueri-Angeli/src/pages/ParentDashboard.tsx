import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from '../components/ChartCard'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import Loader from '../components/Loader'
import { parentNotes } from '../data/mock'

const ParentDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Moyenne générale" value={15} suffix="/20" />
        <StatCard label="Présence simulée" value={94} suffix="%" />
        <StatCard label="Notifications" value={7} />
        <StatCard label="Niveau de risque" value={28} suffix="%" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ChartCard title="Bulletin de l'élève" subtitle="Moyennes par cours">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={parentNotes}>
              <XAxis dataKey="cours" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
              <Line type="monotone" dataKey="moyenne" stroke="#6EC1FF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <GlassCard className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Suivi IA</h3>
          <p className="text-sm text-slate-300">
            Le score prédictif indique un niveau de risque faible, continuez les
            efforts et suivez les recommandations.
          </p>
          <RiskBadge score={28} />
          <div className="space-y-3 text-sm text-slate-200">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Notification : réunion parents 24/02.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Rappel : devoir de mathématiques à rendre.
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              Félicitations : progression en sciences.
            </div>
          </div>
        </GlassCard>
      </div>
      <GlassCard>
        <h3 className="text-lg font-semibold text-white">Synchronisation en cours</h3>
        <p className="mt-2 text-sm text-slate-300">
          Chargement des prochaines évaluations et des retours enseignants.
        </p>
        <Loader />
      </GlassCard>
    </div>
  )
}

export default ParentDashboard
