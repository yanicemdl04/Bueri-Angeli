import { ReactNode } from 'react'
import GlassCard from './GlassCard'

type FeatureCardProps = {
  title: string
  description: string
  icon: ReactNode
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <GlassCard className="neon-hover flex h-full flex-col gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-blue/20 text-sky-blue">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-300">{description}</p>
      </div>
    </GlassCard>
  )
}

export default FeatureCard
