import { Lock } from 'lucide-react'
import { colors } from '../tokens'

export default function PHIBadge() {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-pill px-2 py-0.5 font-medium"
      style={{ fontSize: '11px', background: colors.warningLight, color: colors.warning }}
    >
      <Lock size={10} strokeWidth={2} />
      Contains PHI
    </span>
  )
}
