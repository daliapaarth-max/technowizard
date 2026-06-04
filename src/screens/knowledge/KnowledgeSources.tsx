import { useState } from 'react'
import {
  FileText,
  MessageSquare,
  ChevronDown,
  Plus,
  Info,
  ExternalLink,
  ChevronUp,
} from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import type { NavGroup } from '../../layouts/AppShell'
import { colors, font } from '../../tokens'

// ─── Types ────────────────────────────────────────────────────────────────────

type RowAction = 'Add article' | 'Sync' | 'Sync or Import' | 'Manage' | 'Import' | 'Add snippet' | 'Upload document'

interface SourceRow {
  name: string
  articleCount?: number        // green dot + "N articles"
  macroCount?: number          // "N macros"
  status?: 'not_set_up' | 'not_enough' | 'import_pending' | 'no_collection' | 'active'
  statusText?: string          // override status label
  containsPHI?: boolean
  action: RowAction
}

interface SourceGroup {
  id: string
  label: string
  description: string
  icon: 'file' | 'message' | 'globe'
  rows: SourceRow[]
}

// ─── Data per tab ─────────────────────────────────────────────────────────────

const ALL_SOURCES_GROUPS: SourceGroup[] = [
  {
    id: 'patient-visible',
    label: 'Patient-visible articles',
    description: 'Wiz AI answers patient questions directly from these articles.',
    icon: 'file',
    rows: [
      { name: 'Medvana Help Center', articleCount: 4, status: 'active', action: 'Add article' },
      { name: 'Medvana Website', status: 'not_set_up', action: 'Sync' },
    ],
  },
  {
    id: 'internal',
    label: 'Internal articles',
    description: 'Give Wiz AI internal knowledge only available to your team. Never shown to patients.',
    icon: 'file',
    rows: [
      { name: 'Medvana Workspace', articleCount: 2, status: 'active', action: 'Add article' },
      { name: 'Refund Policy SOP', status: 'not_set_up', action: 'Sync or Import' },
      { name: 'Appointment SOPs', status: 'not_set_up', action: 'Sync or Import' },
      { name: 'Insurance Claims Guide', containsPHI: true, status: 'not_set_up', action: 'Sync or Import' },
    ],
  },
  {
    id: 'conversations',
    label: 'Conversations',
    description: 'Let Wiz AI learn from your team\'s resolved conversations over the past 4 months.',
    icon: 'message',
    rows: [
      { name: 'Medvana Workspace', status: 'not_enough', statusText: 'Not enough conversations', action: 'Manage' },
      { name: 'Archived Cases', statusText: 'Import takes 24–48 hours', action: 'Import' },
    ],
  },
]

const TABS = ['All sources', 'AI Agent', 'Copilot', 'Help Center']

// ─── Small icon component ──────────────────────────────────────────────────────

function GroupIcon({ type }: { type: SourceGroup['icon'] }) {
  const style = {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: colors.textPrimary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }
  if (type === 'message') {
    return (
      <div style={style}>
        <MessageSquare size={18} strokeWidth={1.75} color="#fff" />
      </div>
    )
  }
  return (
    <div style={style}>
      <FileText size={18} strokeWidth={1.75} color="#fff" />
    </div>
  )
}

// ─── Action button ─────────────────────────────────────────────────────────────

function ActionButton({ label }: { label: RowAction }) {
  return (
    <button
      className="flex-none rounded-md transition-colors"
      style={{
        fontSize: font.sm,
        fontWeight: font.medium,
        color: colors.textSecondary,
        border: `1px solid ${colors.borderStrong}`,
        background: colors.cardBg,
        padding: '4px 10px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.background = colors.cardBg
      }}
    >
      {label}
    </button>
  )
}

// ─── Row status ────────────────────────────────────────────────────────────────

function RowStatus({ row }: { row: SourceRow }) {
  if (row.articleCount != null) {
    return (
      <span className="flex items-center gap-1.5" style={{ fontSize: font.sm, color: colors.success }}>
        <span
          style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: colors.success, display: 'inline-block', flexShrink: 0,
          }}
        />
        {row.articleCount} article{row.articleCount !== 1 ? 's' : ''}
      </span>
    )
  }
  if (row.macroCount != null) {
    return (
      <span className="flex items-center gap-1.5" style={{ fontSize: font.sm, color: colors.success }}>
        <span
          style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: colors.success, display: 'inline-block', flexShrink: 0,
          }}
        />
        {row.macroCount} macro{row.macroCount !== 1 ? 's' : ''}
      </span>
    )
  }
  if (row.status === 'not_enough' || row.statusText) {
    return (
      <span className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.textMuted }}>
        {row.status === 'not_enough' && (
          <Info size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
        )}
        {row.statusText ?? 'Not set up'}
      </span>
    )
  }
  // default: not set up
  return (
    <span style={{ fontSize: font.sm, color: colors.textMuted }}>Not set up</span>
  )
}

// ─── Source row ────────────────────────────────────────────────────────────────

function SourceRowItem({ row }: { row: SourceRow }) {
  return (
    <div
      className="flex items-center gap-3 px-5"
      style={{
        height: '50px',
        borderTop: `1px solid ${colors.border}`,
      }}
    >
      {/* Doc icon + name */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <FileText size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
        <span
          className="truncate"
          style={{ fontSize: font.sm, color: colors.textPrimary }}
        >
          {row.name}
        </span>
      </div>

      {/* Status + PHI badge */}
      <div className="flex items-center gap-2 flex-none">
        {row.containsPHI && (
          <span
            className="rounded-pill px-2 py-0.5"
            style={{
              fontSize: '11px',
              fontWeight: font.medium,
              background: colors.warningLight,
              color: colors.warning,
              whiteSpace: 'nowrap',
            }}
          >
            Contains PHI
          </span>
        )}
        <RowStatus row={row} />
      </div>

      {/* Action button */}
      <ActionButton label={row.action} />
    </div>
  )
}

// ─── Source group card ─────────────────────────────────────────────────────────

function SourceGroupCard({ group }: { group: SourceGroup }) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 px-5 py-4">
        <GroupIcon type={group.icon} />
        <div>
          <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>
            {group.label}
          </p>
          <p style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: '2px' }}>
            {group.description}
          </p>
        </div>
      </div>

      {/* Rows */}
      {group.rows.map((row, i) => (
        <SourceRowItem key={i} row={row} />
      ))}
    </div>
  )
}

// ─── Get set up widget ─────────────────────────────────────────────────────────

function GetSetUpWidget() {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <button
        className="flex items-center justify-between w-full rounded-lg px-3 py-2"
        style={{
          background: 'rgba(255,255,255,0.06)',
          fontSize: font.sm,
          color: colors.navTextMuted,
        }}
        onClick={() => setCollapsed(false)}
      >
        <span style={{ fontWeight: font.medium, color: colors.navText }}>Get set up</span>
        <ChevronUp size={13} strokeWidth={1.75} style={{ color: colors.navTextMuted, transform: 'rotate(180deg)' }} />
      </button>
    )
  }

  return (
    <div
      className="rounded-lg p-3 space-y-1.5"
      style={{ background: 'rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-start justify-between gap-2">
        <span style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.navText }}>
          Get set up
        </span>
        <button onClick={() => setCollapsed(true)} title="Collapse">
          <ChevronUp size={13} strokeWidth={1.75} style={{ color: colors.navTextMuted }} />
        </button>
      </div>
      <p style={{ fontSize: '11px', color: colors.navTextMuted, lineHeight: '1.5' }}>
        Connect your channels to start receiving patient messages.
      </p>
    </div>
  )
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export default function KnowledgeSources({ navigate }: { navigate: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState('All sources')

  const nav: NavGroup[] = [
    {
      items: [
        { label: 'Sources', active: true, onClick: () => navigate('knowledge/sources') },
        {
          label: 'Content',
          expandable: true,
          expanded: true,
          children: [
            { label: 'Articles', onClick: () => navigate('knowledge/articles') },
            { label: 'Your first folder' },
          ],
        },
        { label: 'Help Center', trailingIcon: ExternalLink },
      ],
    },
  ]

  return (
    <AppShell
      activeSection="knowledge"
      sectionTitle="Knowledge"
      navGroups={nav}
      sectionNavFooter={<GetSetUpWidget />}
    >
      <div className="flex flex-col h-full">

        {/* Page header */}
        <div
          className="flex items-center justify-between px-8 pt-6 pb-0"
          style={{ flexShrink: 0 }}
        >
          <h1
            style={{
              fontSize: font.h1,
              fontWeight: font.medium,
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            Sources
          </h1>
          <div className="flex items-center gap-2">
            {/* Learn button */}
            <button
              className="flex items-center gap-1 rounded-md transition-colors"
              style={{
                fontSize: font.sm,
                fontWeight: font.medium,
                color: colors.textSecondary,
                border: `1px solid ${colors.borderStrong}`,
                background: colors.cardBg,
                padding: '6px 12px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = colors.cardBg
              }}
            >
              Learn
              <ChevronDown size={13} strokeWidth={1.75} />
            </button>

            {/* New content button */}
            <button
              className="flex items-center gap-1.5 rounded-md text-white transition-colors"
              style={{
                fontSize: font.sm,
                fontWeight: font.medium,
                background: colors.accent,
                padding: '6px 12px',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = colors.accentHover
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = colors.accent
              }}
            >
              <Plus size={14} strokeWidth={2} />
              New content
            </button>
          </div>
        </div>

        {/* Tab bar */}
        <div
          className="flex px-8 mt-4"
          style={{ borderBottom: `1px solid ${colors.border}`, flexShrink: 0 }}
        >
          {TABS.map(tab => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-4 py-2.5 transition-colors"
                style={{
                  fontSize: font.sm,
                  fontWeight: isActive ? font.medium : font.regular,
                  color: isActive ? colors.textPrimary : colors.textMuted,
                  borderBottom: isActive ? `2px solid ${colors.textPrimary}` : '2px solid transparent',
                  marginBottom: '-1px',
                  background: 'transparent',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Source groups */}
        <div className="flex-1 overflow-y-auto px-8 py-5 space-y-4">
          {ALL_SOURCES_GROUPS.map(group => (
            <SourceGroupCard key={group.id} group={group} />
          ))}
        </div>

      </div>
    </AppShell>
  )
}
