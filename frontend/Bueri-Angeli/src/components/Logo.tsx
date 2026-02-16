import { GraduationCap } from 'lucide-react'

const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-blue/15 text-sky-blue">
        <GraduationCap size={20} />
      </span>
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-sky-100/70">SIS</p>
        <p className="text-lg font-semibold text-white">Bueri Angeli</p>
      </div>
    </div>
  )
}

export default Logo
