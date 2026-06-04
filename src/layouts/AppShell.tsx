import { type ReactNode, type ComponentType } from 'react'
import GlobalNav from '../components/GlobalNav'
import SectionNav from '../components/SectionNav'
import { layout } from '../tokens'

export interface NavItem {
  label: string
  onClick?: () => void
  active?: boolean
  /** Lucide icon component rendered after the label */
  trailingIcon?: ComponentType<{ size?: number; strokeWidth?: number }>
  /** Shows a ChevronRight and optional child items */
  expandable?: boolean
  expanded?: boolean
  children?: NavItem[]
  /** Indent level for child items (px) */
  indent?: number
}

export interface NavGroup {
  heading?: string
  items: NavItem[]
}

interface AppShellProps {
  activeSection: string
  navGroups: NavGroup[]
  sectionTitle: string
  /** Optional node pinned to the bottom of the section nav */
  sectionNavFooter?: ReactNode
  children: ReactNode
}

export default function AppShell({
  activeSection,
  navGroups,
  sectionTitle,
  sectionNavFooter,
  children,
}: AppShellProps) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* 64px global nav rail */}
      <div
        className="flex-none"
        style={{ width: layout.globalNavWidth }}
      >
        <GlobalNav activeSection={activeSection} />
      </div>

      {/* 220px section nav */}
      <div
        className="flex-none flex flex-col"
        style={{ width: layout.sectionNavWidth }}
      >
        <SectionNav title={sectionTitle} navGroups={navGroups} footer={sectionNavFooter} />
      </div>

      {/* Content area */}
      <div className="flex-1 bg-pageBg overflow-auto">
        {children}
      </div>
    </div>
  )
}
