import { type ReactNode, type ComponentType } from 'react'
import GlobalNav from '../components/GlobalNav'
import SectionNav from '../components/SectionNav'
import { layout } from '../tokens'

export interface NavItem {
  label: string
  onClick?: () => void
  active?: boolean
  trailingIcon?: ComponentType<{ size?: number; strokeWidth?: number }>
  expandable?: boolean
  expanded?: boolean
  children?: NavItem[]
  dot?: string
}

export interface NavGroup {
  heading?: string
  items: NavItem[]
}

interface AppShellProps {
  activeSection: string
  navGroups: NavGroup[]
  sectionTitle: string
  sectionNavFooter?: ReactNode
  sectionNavTitleSlot?: ReactNode
  rightPanel?: ReactNode
  navigate?: (screen: string) => void
  children: ReactNode
}

export default function AppShell({
  activeSection, navGroups, sectionTitle,
  sectionNavFooter, sectionNavTitleSlot, rightPanel, navigate, children,
}: AppShellProps) {
  return (
    <div className="flex h-full w-full overflow-hidden">
      <div className="flex-none" style={{ width: layout.globalNavWidth }}>
        <GlobalNav activeSection={activeSection} onNavigate={navigate} />
      </div>
      <div className="flex-none" style={{ width: layout.sectionNavWidth }}>
        <SectionNav
          title={sectionTitle}
          navGroups={navGroups}
          footer={sectionNavFooter}
          titleSlot={sectionNavTitleSlot}
        />
      </div>
      <div className="flex-1 overflow-auto" style={{ background: '#FAFAF7' }}>
        {children}
      </div>
      {rightPanel && (
        <div
          className="flex-none"
          style={{ width: layout.previewPanelWidth, borderLeft: '1px solid #E8E6DF', background: '#FAFAF7' }}
        >
          {rightPanel}
        </div>
      )}
    </div>
  )
}
