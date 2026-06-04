import { type ReactNode } from 'react'
import { colors } from '../tokens'

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'accent' | 'muted'

const variantStyles: Record<Variant, { bg: string; color: string }> = {
  default:  { bg: colors.activeNavBg,  color: colors.textSecondary },
  muted:    { bg: colors.activeNavBg,  color: colors.textMuted },
  success:  { bg: colors.successLight, color: colors.success },
  warning:  { bg: colors.warningLight, color: colors.warning },
  danger:   { bg: colors.dangerLight,  color: colors.danger },
  accent:   { bg: colors.accentLight,  color: colors.accent },
}

interface PillProps {
  children: ReactNode
  variant?: Variant
}

export default function Pill({ children, variant = 'muted' }: PillProps) {
  const { bg, color } = variantStyles[variant]
  return (
    <span
      className="inline-flex items-center rounded-pill px-2 py-0.5 font-medium"
      style={{ fontSize: '11px', background: bg, color }}
    >
      {children}
    </span>
  )
}
