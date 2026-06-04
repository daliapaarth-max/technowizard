import { type ReactNode } from 'react'
import { colors } from '../tokens'

type Variant = 'primary' | 'ghost'
type Size = 'sm' | 'md'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  onClick?: () => void
  disabled?: boolean
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors
    disabled:opacity-40 disabled:cursor-not-allowed ${sizeClasses[size]}`

  if (variant === 'primary') {
    return (
      <button
        className={base}
        onClick={onClick}
        disabled={disabled}
        style={{ background: colors.accent, color: '#fff' }}
        onMouseEnter={e => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = colors.accentHover
        }}
        onMouseLeave={e => {
          if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = colors.accent
        }}
      >
        {children}
      </button>
    )
  }

  return (
    <button
      className={base}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: 'transparent',
        border: `1px solid ${colors.border}`,
        color: colors.textSecondary,
      }}
      onMouseEnter={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover
      }}
      onMouseLeave={e => {
        if (!disabled) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
      }}
    >
      {children}
    </button>
  )
}
