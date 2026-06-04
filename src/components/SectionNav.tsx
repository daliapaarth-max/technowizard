import { type ReactNode, type ComponentType } from 'react'
import { ChevronRight } from 'lucide-react'
import { colors, font } from '../tokens'
import type { NavGroup, NavItem } from '../layouts/AppShell'

interface SectionNavProps {
  title: string
  navGroups: NavGroup[]
  footer?: ReactNode
}

function NavItemRow({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const TrailingIcon = item.trailingIcon as ComponentType<{ size?: number; strokeWidth?: number; color?: string }> | undefined
  const indentPx = depth * 12

  return (
    <>
      <button
        onClick={item.onClick}
        className="flex items-center w-full rounded-md text-left transition-colors gap-1.5"
        style={{
          paddingLeft: `${8 + indentPx}px`,
          paddingRight: '8px',
          paddingTop: '5px',
          paddingBottom: '5px',
          fontSize: font.sm,
          fontWeight: item.active ? font.medium : font.regular,
          color: item.active ? colors.navText : colors.navTextMuted,
          background: item.active ? colors.navActiveBg : 'transparent',
        }}
        onMouseEnter={e => {
          if (!item.active) {
            (e.currentTarget as HTMLButtonElement).style.background = colors.navHoverBg
            ;(e.currentTarget as HTMLButtonElement).style.color = colors.navText
          }
        }}
        onMouseLeave={e => {
          if (!item.active) {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = colors.navTextMuted
          }
        }}
      >
        <span className="flex-1 truncate">{item.label}</span>
        {item.expandable && (
          <ChevronRight
            size={12}
            strokeWidth={1.75}
            color={colors.navTextMuted}
            style={{
              flexShrink: 0,
              transform: item.expanded ? 'rotate(90deg)' : 'none',
              transition: 'transform 0.15s',
            }}
          />
        )}
        {TrailingIcon && (
          <TrailingIcon size={12} strokeWidth={1.75} color={colors.navTextMuted} />
        )}
      </button>

      {item.expanded && item.children?.map((child, i) => (
        <NavItemRow key={i} item={child} depth={depth + 1} />
      ))}
    </>
  )
}

export default function SectionNav({ title, navGroups, footer }: SectionNavProps) {
  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: colors.sectionNavBg }}
    >
      {/* Section title */}
      <div className="px-4 pt-4 pb-3">
        <p
          className="font-medium"
          style={{ fontSize: font.md, color: colors.navText }}
        >
          {title}
        </p>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-2 pb-3">
        {navGroups.map((group, gi) => (
          <div key={gi} className="mb-3">
            {group.heading && (
              <p
                className="px-2 mb-1 uppercase tracking-wider"
                style={{
                  fontSize: '10px',
                  fontWeight: font.medium,
                  color: colors.navTextMuted,
                  letterSpacing: '0.06em',
                }}
              >
                {group.heading}
              </p>
            )}
            {group.items.map((item, ii) => (
              <NavItemRow key={ii} item={item} />
            ))}
          </div>
        ))}
      </div>

      {/* Optional footer */}
      {footer && (
        <div className="px-2 pb-3 pt-3" style={{ borderTop: `1px solid ${colors.navHoverBg}` }}>
          {footer}
        </div>
      )}
    </div>
  )
}
