type SkeletonProps = {
  className?: string
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse rounded-2xl bg-white/10 ${className ?? ''}`}
    />
  )
}

export default Skeleton
