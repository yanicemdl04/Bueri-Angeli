import { ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
}

const PrimaryButton = ({ children, onClick, href }: PrimaryButtonProps) => {
  const className =
    'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-blue to-turquoise px-6 py-3 text-sm font-semibold text-midnight shadow-neon transition hover:brightness-110'

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export default PrimaryButton
