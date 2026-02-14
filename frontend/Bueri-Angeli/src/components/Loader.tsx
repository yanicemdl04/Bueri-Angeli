const Loader = () => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-ping rounded-full border border-sky-blue/40" />
        <div className="absolute inset-2 animate-spin rounded-full border-2 border-turquoise border-t-transparent" />
        <div className="absolute inset-5 rounded-full bg-sky-blue/40" />
      </div>
    </div>
  )
}

export default Loader
