import { type ReactNode, type ComponentType } from 'react'
import { ChevronRight } from 'lucide-react'
import { colors, font } from '../tokens'
import type { NavGroup, NavItem } from '../layouts/AppShell'

interface SectionNavProps {
  title: string
  navGroups: NavGroup[]
  footer?: ReactNode
  titleSlot?: ReactNode
}

function NavItemRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const TrailingIcon = item.trailingIcon as ComponentType<{ size?: number; strokeWidth?: number; color?: string }> | undefined

  return (
    <>
      <button
        onClick={item.onClick}
        className="flex items-center w-full rounded-md text-left transition-colors gap-1"
        style={{
          paddingLeft: `${6 + depth * 10}px`,
          paddingRight: '6px',
          paddingTop: '4px',
          paddingBottom: '4px',
          fontSize: font.sm,
          fontWeight: item.active ? font.medium : font.regular,
          color: item.active ? colors.textPrimary : colors.textSecondary,
          background: item.active ? colors.activeNavBg : 'transparent',
        }}
        onMouseEnter={e => { if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
        onMouseLeave={e => { if (!item.active) (e.currentTarget as HTMLButtonElement).style.background = 'transparent' }}
      >
        <span className="flex-1 truncate">{item.label}</span>
        {item.dot && (
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
        )}
        {item.expandable && (
          <ChevronRight
            size={11} strokeWidth={1.75} color={colors.textMuted}
            style={{ flexShrink: 0, transform: item.expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}
          />
        )}
        {TrailingIcon && <TrailingIcon size={11} strokeWidth={1.75} color={colors.textMuted} />}
      </button>
      {item.expanded && item.children?.map((child, i) => (
        <NavItemRow key={i} item={child} depth={depth + 1} />
      ))}
    </>
  )
}

export default function SectionNav({ title, navGroups, footer, titleSlot }: SectionNavProps) {
  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: colors.pageBg, borderRight: `1px solid ${colors.border}` }}
    >
      <div className="px-3 pt-3 pb-1">
        <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>{title}</p>
      </div>
      {titleSlot && <div className="px-2 pb-2">{titleSlot}</div>}
      <div className="flex-1 overflow-y-auto px-2 py-1">
        {navGroups.map((group, gi) => (
          <div key={gi} className={gi > 0 ? 'mt-3' : ''}>
            {group.heading && (
              <p
                className="px-1.5 mb-0.5 uppercase tracking-wider"
                style={{ fontSize: '10px', fontWeight: font.medium, color: colors.textMuted, letterSpacing: '0.06em' }}
              >
                {group.heading}
              </p>
            )}
            {group.items.map((item, ii) => <NavItemRow key={ii} item={item} />)}
          </div>
        ))}
      </div>
      {footer && (
        <div className="px-2 pb-3 pt-2" style={{ borderTop: `1px solid ${colors.border}` }}>
          {footer}
        </div>
      )}
    </div>
  )
}
