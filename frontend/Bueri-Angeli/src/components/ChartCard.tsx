import { ReactNode } from 'react'
import GlassCard from './GlassCard'

type ChartCardProps = {
  title: string
  subtitle: string
  children: ReactNode
}

const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <GlassCard className="flex h-full flex-col gap-4">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-slate-300">{subtitle}</p>
      </div>
      <div className="h-64">{children}</div>
    </GlassCard>
  )
}

export default ChartCard
