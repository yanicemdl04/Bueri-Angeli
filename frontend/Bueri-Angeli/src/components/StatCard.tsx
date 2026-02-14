import { useEffect, useState } from 'react'
import GlassCard from './GlassCard'

type StatCardProps = {
  label: string
  value: number
  suffix?: string
}

const StatCard = ({ label, value, suffix }: StatCardProps) => {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    let start = 0
    const duration = 1000
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const next = Math.floor(start + (value - start) * progress)
      setDisplay(next)
      if (progress < 1) {
        requestAnimationFrame(tick)
      }
    }

    requestAnimationFrame(tick)
  }, [value])

  return (
    <GlassCard className="neon-hover flex h-full flex-col gap-2">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="text-3xl font-semibold text-white">
        {display}
        {suffix}
      </p>
    </GlassCard>
  )
}

export default StatCard
