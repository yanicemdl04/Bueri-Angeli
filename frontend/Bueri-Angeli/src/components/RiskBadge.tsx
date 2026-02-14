import { formatPercent } from '../services/formatters'

type RiskBadgeProps = {
  score: number
}

const RiskBadge = ({ score }: RiskBadgeProps) => {
  const level = score >= 70 ? 'Élevé' : score >= 40 ? 'Modéré' : 'Faible'
  const color =
    score >= 70
      ? 'bg-red-500/20 text-red-200 border-red-400/40'
      : score >= 40
      ? 'bg-yellow-500/20 text-yellow-100 border-yellow-400/40'
      : 'bg-emerald-500/20 text-emerald-100 border-emerald-400/40'

  return (
    <span className={`rounded-full border px-3 py-1 text-xs ${color}`}>
      Risque {level} • {formatPercent(score)}
    </span>
  )
}

export default RiskBadge
