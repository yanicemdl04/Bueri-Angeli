import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import ChartCard from '../components/ChartCard'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import Skeleton from '../components/Skeleton'
import { adminKpis, dashboardStats } from '../data/metrics'
import { classeRisqueData, elevesRisques, performanceData } from '../data/mock'

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <ChartCard title="Tendance académique" subtitle="Moyenne globale et score de risque IA">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <XAxis dataKey="mois" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
              <Line type="monotone" dataKey="moyenne" stroke="#6EC1FF" strokeWidth={3} />
              <Line type="monotone" dataKey="risque" stroke="#23D5E7" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Risque par classe" subtitle="Score de décrochage simulé">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={classeRisqueData}>
              <XAxis dataKey="classe" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
              <Bar dataKey="risque" fill="#6EC1FF" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.6fr_1.4fr]">
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-semibold text-white">KPIs stratégiques</h3>
          <div className="space-y-3">
            {adminKpis.map((kpi) => (
              <div key={kpi.label} className="flex items-center justify-between text-sm text-slate-200">
                <span>{kpi.label}</span>
                <span className="text-white">{kpi.value}{kpi.suffix}</span>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-sky-blue/20 bg-sky-blue/10 p-4 text-sm text-slate-100">
            8 actions recommandées pour réduire le risque de décrochage.
          </div>
          <div className="space-y-3">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-5/6" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-lg font-semibold text-white">Élèves à risque élevé</h3>
          <div className="mt-4 space-y-3">
            {elevesRisques.map((eleve) => (
              <div
                key={eleve.nom}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{eleve.nom}</p>
                  <p className="text-xs text-slate-400">Classe {eleve.classe}</p>
                </div>
                <RiskBadge score={eleve.score} />
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}

export default AdminDashboard
