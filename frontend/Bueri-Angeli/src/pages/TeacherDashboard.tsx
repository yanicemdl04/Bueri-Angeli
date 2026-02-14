import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import ChartCard from '../components/ChartCard'
import GlassCard from '../components/GlassCard'
import StatCard from '../components/StatCard'
import RiskBadge from '../components/RiskBadge'
import Skeleton from '../components/Skeleton'
import { dashboardStats } from '../data/metrics'
import { evaluations, teacherClasses } from '../data/mock'

const TeacherDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.slice(0, 3).map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} suffix={stat.suffix} />
        ))}
        <StatCard label="Évaluations en attente" value={6} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassCard className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Mes classes</h3>
          <div className="space-y-3">
            {teacherClasses.map((classe) => (
              <div
                key={classe.classe}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-white">{classe.classe}</p>
                  <p className="text-xs text-slate-400">{classe.eleves} élèves</p>
                </div>
                <RiskBadge score={Math.round(100 - classe.moyenne)} />
              </div>
            ))}
          </div>
        </GlassCard>

        <ChartCard title="Moyenne par classe" subtitle="Analyse des performances">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={teacherClasses}>
              <XAxis dataKey="classe" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip contentStyle={{ background: '#0f172a', border: '1px solid #1e293b' }} />
              <Bar dataKey="moyenne" fill="#23D5E7" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <GlassCard>
        <h3 className="text-lg font-semibold text-white">Encodage des notes</h3>
        <div className="mt-4 grid gap-3">
          {evaluations.map((evaluation) => (
            <div
              key={`${evaluation.eleve}-${evaluation.cours}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
            >
              <div>
                <p className="text-white">{evaluation.eleve}</p>
                <p className="text-xs text-slate-400">{evaluation.cours}</p>
              </div>
              <span className="rounded-full border border-sky-blue/40 bg-sky-blue/10 px-3 py-1 text-xs">
                {evaluation.type}
              </span>
              <span className="text-lg font-semibold text-white">{evaluation.note}/20</span>
            </div>
          ))}
        </div>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </GlassCard>
    </div>
  )
}

export default TeacherDashboard
