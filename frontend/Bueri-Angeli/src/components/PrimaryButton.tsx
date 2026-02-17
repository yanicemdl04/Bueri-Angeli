import { ReactNode } from 'react'

type PrimaryButtonProps = {
  children: ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

const PrimaryButton = ({ children, onClick, href, type = 'button', disabled }: PrimaryButtonProps) => {
  const className =
    'inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-blue to-turquoise px-6 py-3 text-sm font-semibold text-midnight shadow-neon transition hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed'

  if (href) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  )
}

export default PrimaryButton
