import { Inbox, Bot, BookOpen, BarChart2, Send, Users, Search, Settings } from 'lucide-react'
import { colors, font } from '../tokens'

const TOP_ITEMS = [
  { id: 'inbox',     icon: Inbox,     label: 'Inbox',    badge: 3 },
  { id: 'ai-agent',  icon: Bot,       label: 'AI Agent' },
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
  onNavigate?: (section: string) => void
}

export default function GlobalNav({ activeSection, onNavigate }: GlobalNavProps) {
  return (
    <nav
      className="flex flex-col h-full py-2"
      style={{ background: colors.sidebarBg, borderRight: `1px solid ${colors.border}` }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-3 py-2 mb-1">
        <div
          className="flex items-center justify-center rounded-lg flex-none"
          style={{ width: '22px', height: '22px', background: colors.accent }}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5L4.5 7h2.5L5.5 12.5l5-6H8L9.5 1.5H7z" fill="white" />
          </svg>
        </div>
        <span style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Wiz AI</span>
      </div>

      {/* Top nav */}
      <div className="flex flex-col flex-1 px-2 gap-0.5">
        {TOP_ITEMS.map(({ id, icon: Icon, label, badge }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => onNavigate?.(id)}
              className="relative flex items-center gap-2 w-full rounded-md text-left transition-colors"
              style={{
                padding: '5px 8px',
                background: isActive ? colors.activeNavBg : 'transparent',
                color: isActive ? colors.textPrimary : colors.textSecondary,
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
            >
              <Icon size={14} strokeWidth={isActive ? 2 : 1.75} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: font.sm, fontWeight: isActive ? font.medium : font.regular }}>{label}</span>
              {badge != null && (
                <span
                  className="flex items-center justify-center rounded-full text-white ml-auto flex-none"
                  style={{ width: '15px', height: '15px', fontSize: '9px', fontWeight: font.medium, background: '#E5382A' }}
                >
                  {badge}
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* Bottom */}
      <div className="flex flex-col px-2 gap-0.5">
        {BOTTOM_ITEMS.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            className="flex items-center gap-2 w-full rounded-md text-left transition-colors"
            style={{ padding: '5px 8px', color: colors.textSecondary }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
          >
            <Icon size={14} strokeWidth={1.75} style={{ flexShrink: 0 }} />
            <span style={{ fontSize: font.sm }}>{label}</span>
          </button>
        ))}
        <div className="flex items-center gap-2 px-2 py-1 mt-1">
          <div
            className="flex items-center justify-center rounded-full flex-none text-white"
            style={{ width: '20px', height: '20px', background: colors.accent, fontSize: '10px', fontWeight: font.medium }}
          >
            P
          </div>
          <span style={{ fontSize: font.sm, color: colors.textSecondary }}>Priya</span>
        </div>
      </div>
    </nav>
  )
}
