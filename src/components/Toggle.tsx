import { colors } from '../tokens'

interface ToggleProps {
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export default function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className="relative inline-flex flex-none items-center rounded-pill transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:opacity-40 disabled:cursor-not-allowed"
      style={{
        width: '36px',
        height: '20px',
        background: checked ? colors.accent : '#D1D5DB',
        padding: '2px',
      }}
    >
      <span
        className="block rounded-full bg-white shadow-sm transition-transform"
        style={{
          width: '16px',
          height: '16px',
          transform: checked ? 'translateX(16px)' : 'translateX(0)',
        }}
      />
    </button>
  )
}
