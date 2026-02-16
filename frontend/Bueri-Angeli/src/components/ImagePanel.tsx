type ImagePanelProps = {
  src: string
  title: string
  subtitle: string
}

const ImagePanel = ({ src, title, subtitle }: ImagePanelProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glass">
      <img src={src} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 bg-midnight/70" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-100/70">SIS</p>
        <h3 className="mt-2 text-xl font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-200">{subtitle}</p>
      </div>
    </div>
  )
}

export default ImagePanel
