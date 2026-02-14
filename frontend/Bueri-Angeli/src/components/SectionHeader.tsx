type SectionHeaderProps = {
  kicker: string
  title: string
  subtitle: string
}

const SectionHeader = ({ kicker, title, subtitle }: SectionHeaderProps) => {
  return (
    <div className="max-w-2xl">
      <p className="text-xs uppercase tracking-[0.4em] text-sky-100/70">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">{title}</h2>
      <p className="mt-3 text-slate-300">{subtitle}</p>
    </div>
  )
}

export default SectionHeader
