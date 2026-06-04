import { Inbox, Bot, BookOpen, BarChart2, Send, Users, Search, Settings } from 'lucide-react'
import { colors, font } from '../tokens'

const TOP_ITEMS = [
  { id: 'inbox',     icon: Inbox,     label: 'Inbox',    badge: 3 },
  { id: 'ai-agent',  icon: Bot,       label: 'AI agent' },
  { id: 'knowledge', icon: BookOpen,  label: 'Knowledge' },
  { id: 'reports',   icon: BarChart2, label: 'Reports' },
  { id: 'outbound',  icon: Send,      label: 'Outbound' },
  { id: 'contacts',  icon: Users,     label: 'Contacts' },
]

const BOTTOM_ITEMS = [
  { id: 'search',   icon: Search,   label: 'Search' },
  { id: 'settings', icon: Settings, label: 'Settings' },
]

interface GlobalNavProps {
  activeSection: string
}

export default function GlobalNav({ activeSection }: GlobalNavProps) {
  return (
    <nav
      className="flex flex-col items-center h-full py-3 gap-1"
      style={{ background: colors.navBg }}
    >
      {/* Logo */}
      <div className="mb-3 flex items-center justify-center w-10 h-10">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <rect width="22" height="22" rx="6" fill={colors.accent} />
          <path d="M11 4L7 11h3.5L9 18l6-8h-3.5L14 4h-3z" fill="white" strokeWidth="0" />
        </svg>
      </div>

      {/* Top nav icons */}
      <div className="flex flex-col items-center gap-0.5 flex-1 w-full px-2">
        {TOP_ITEMS.map(({ id, icon: Icon, label, badge }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              title={label}
              className="relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
              style={{
                background: isActive ? colors.navActiveBg : 'transparent',
                color: isActive ? colors.navText : colors.navTextMuted,
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = colors.navHoverBg
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              }}
            >
              <Icon size={18} strokeWidth={1.75} />
              {badge != null && (
                <span
                  className="absolute top-1 right-1 flex items-center justify-center rounded-full text-white"
                  style={{
                    width: '15px', height: '15px',
                    fontSize: '9px', fontWeight: font.medium,
                    background: '#E5382A', lineHeight: 1,
                  }}
                >
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom icons + avatar */}
      <div className="flex flex-col items-center gap-0.5 w-full px-2">
        {BOTTOM_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            title={label}
            className="flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
            style={{ color: colors.navTextMuted }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = colors.navHoverBg
              ;(e.currentTarget as HTMLButtonElement).style.color = colors.navText
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLButtonElement).style.color = colors.navTextMuted
            }}
          >
            <Icon size={18} strokeWidth={1.75} />
          </button>
        ))}

        {/* Avatar */}
        <button
          title="Priya Sharma"
          className="flex items-center justify-center w-8 h-8 rounded-full mt-1 font-medium text-white select-none"
          style={{ background: colors.accent, fontSize: '11px', fontWeight: 500 }}
        >
          P
        </button>
      </div>
    </nav>
  )
}
