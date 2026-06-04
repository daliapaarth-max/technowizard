import { useState } from 'react'
import {
  FileText,
  Check,
  X,
  Minus,
  ChevronDown,
  Plus,
  ExternalLink,
  Search,
  FolderOpen,
} from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import type { NavGroup } from '../../layouts/AppShell'
import { colors, font } from '../../tokens'

// ─── Types ─────────────────────────────────────────────────────────────────────

type ChannelState = true | false | null  // true=enabled, false=disabled, null=dash

interface Article {
  id: number
  title: string
  aiAgent: ChannelState
  copilot: ChannelState
  helpCenter: ChannelState
  collection: string | null
  status: 'published' | 'draft' | null
  audience: string
  phi?: boolean
}

// ─── Data ──────────────────────────────────────────────────────────────────────

const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Clinical Queries — Do Not Automate',
    aiAgent: null, copilot: null, helpCenter: null,
    collection: null, status: null, audience: 'Everyone',
  },
  {
    id: 2,
    title: 'Refund Policy SOP',
    aiAgent: false, copilot: false, helpCenter: false,
    collection: 'No collection', status: 'draft', audience: 'Everyone',
  },
  {
    id: 3,
    title: 'Appointment Rescheduling Rules',
    aiAgent: true, copilot: true, helpCenter: true,
    collection: 'Getting Started', status: 'published', audience: 'Everyone',
  },
  {
    id: 4,
    title: 'Insurance Claims Guide',
    aiAgent: false, copilot: false, helpCenter: false,
    collection: 'FAQs', status: 'published', audience: 'Everyone',
    phi: true,
  },
  {
    id: 5,
    title: 'Untitled internal article',
    aiAgent: false, copilot: false, helpCenter: false,
    collection: null, status: null, audience: 'Everyone',
  },
]

// Nav is built dynamically inside the component so onClick can capture navigate

// ─── Subcomponents ─────────────────────────────────────────────────────────────

function Checkbox({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={e => { e.stopPropagation(); onChange() }}
      className="flex items-center justify-center rounded flex-none transition-colors"
      style={{
        width: '16px', height: '16px',
        background: checked ? colors.accent : 'transparent',
        border: checked ? 'none' : `1.5px solid ${colors.borderStrong}`,
        flexShrink: 0,
      }}
    >
      {checked && <Check size={10} strokeWidth={2.5} color="#fff" />}
    </button>
  )
}

function ChannelIcon({ state }: { state: ChannelState }) {
  if (state === null) {
    return <Minus size={14} strokeWidth={1.75} style={{ color: colors.borderStrong }} />
  }
  if (state === true) {
    return <Check size={14} strokeWidth={2} style={{ color: colors.success }} />
  }
  return <X size={14} strokeWidth={2} style={{ color: colors.borderStrong }} />
}

function StatusPill({ status }: { status: 'published' | 'draft' | null }) {
  if (!status) return null
  const isPublished = status === 'published'
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-pill"
      style={{
        fontSize: '11px',
        fontWeight: font.medium,
        padding: '2px 8px',
        background: isPublished ? colors.successLight : colors.activeNavBg,
        color: isPublished ? colors.success : colors.textMuted,
      }}
    >
      <span
        style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: isPublished ? colors.success : colors.textMuted,
          flexShrink: 0,
        }}
      />
      {isPublished ? 'Published' : 'Draft'}
    </span>
  )
}

function GhostBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="flex items-center gap-1 rounded-md transition-colors"
      style={{
        fontSize: font.sm,
        color: colors.textSecondary,
        border: `1px solid ${colors.borderStrong}`,
        background: colors.cardBg,
        padding: '4px 10px',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.cardBg }}
    >
      {children}
    </button>
  )
}

// ─── Bulk action bar ───────────────────────────────────────────────────────────

function BulkActionBar({ count, onClear }: { count: number; onClear: () => void }) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2"
      style={{
        borderBottom: `1px solid ${colors.border}`,
        background: colors.cardBg,
      }}
    >
      {/* Select-all checkbox (indeterminate style) */}
      <button
        onClick={onClear}
        className="flex items-center justify-center rounded flex-none"
        style={{
          width: '16px', height: '16px',
          background: colors.accent,
          flexShrink: 0,
        }}
      >
        <Minus size={10} strokeWidth={2.5} color="#fff" />
      </button>

      <span style={{ fontSize: font.sm, color: colors.textSecondary, whiteSpace: 'nowrap' }}>
        <span style={{ fontWeight: font.medium, color: colors.textPrimary }}>{count} items</span> selected
      </span>

      <div className="flex items-center gap-2 flex-1">
        {['Change AI Agent state', 'Change Copilot state', 'Change Help Center state', 'More actions'].map(label => (
          <GhostBtn key={label}>
            {label} <ChevronDown size={12} strokeWidth={1.75} />
          </GhostBtn>
        ))}
      </div>
    </div>
  )
}

// ─── Article row ───────────────────────────────────────────────────────────────

function ArticleRow({
  article,
  selected,
  onToggle,
}: {
  article: Article
  selected: boolean
  onToggle: () => void
}) {
  const [hovered, setHovered] = useState(false)

  const rowBg = selected
    ? colors.accentTint
    : hovered
    ? colors.sidebarHover
    : 'transparent'

  return (
    <div
      className="flex items-center gap-0 cursor-pointer"
      style={{
        borderTop: `1px solid ${colors.border}`,
        borderLeft: article.phi ? `3px solid ${colors.warning}` : '3px solid transparent',
        background: rowBg,
        minHeight: '44px',
        transition: 'background 0.1s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
    >
      {/* Checkbox */}
      <div className="flex items-center justify-center px-4" style={{ width: '52px' }}>
        <Checkbox checked={selected} onChange={onToggle} />
      </div>

      {/* Title */}
      <div className="flex items-center gap-2 flex-1 min-w-0 pr-3">
        <FileText size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
        <span
          className="truncate"
          style={{ fontSize: font.sm, color: colors.textPrimary }}
        >
          {article.title}
        </span>
        {article.phi && (
          <span
            className="inline-flex items-center rounded-pill flex-none"
            style={{
              fontSize: '11px',
              fontWeight: font.medium,
              padding: '1px 7px',
              background: colors.warningLight,
              color: colors.warning,
              marginLeft: '4px',
            }}
          >
            Contains PHI
          </span>
        )}
      </div>

      {/* AI Agent */}
      <div className="flex items-center justify-center" style={{ width: '80px' }}>
        <ChannelIcon state={article.aiAgent} />
      </div>

      {/* Copilot */}
      <div className="flex items-center justify-center" style={{ width: '80px' }}>
        <ChannelIcon state={article.copilot} />
      </div>

      {/* Help Center */}
      <div className="flex items-center justify-center" style={{ width: '80px' }}>
        <ChannelIcon state={article.helpCenter} />
      </div>

      {/* Collection */}
      <div className="flex items-center" style={{ width: '160px', paddingRight: '12px' }}>
        {article.collection && (
          <span className="flex items-center gap-1.5 truncate" style={{ fontSize: font.sm, color: colors.textSecondary }}>
            {article.collection === 'No collection' ? (
              <span style={{ color: colors.textMuted }}>{article.collection}</span>
            ) : (
              <>
                <FolderOpen size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
                {article.collection}
              </>
            )}
          </span>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center" style={{ width: '110px', paddingRight: '12px' }}>
        <StatusPill status={article.status} />
      </div>

      {/* Audience */}
      <div className="flex items-center pr-5" style={{ width: '100px' }}>
        <span style={{ fontSize: font.sm, color: colors.textSecondary }}>{article.audience}</span>
      </div>
    </div>
  )
}

// ─── Column headers ────────────────────────────────────────────────────────────

function TableHeaders() {
  return (
    <div
      className="flex items-center"
      style={{
        borderBottom: `1px solid ${colors.border}`,
        background: colors.cardBg,
        minHeight: '36px',
      }}
    >
      <div style={{ width: '52px' }} />
      <div className="flex-1 pr-3">
        <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Title
        </span>
      </div>
      {['AI Agent', 'Copilot', 'Help Center'].map(col => (
        <div key={col} className="flex items-center justify-center" style={{ width: '80px' }}>
          <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {col}
          </span>
        </div>
      ))}
      <div style={{ width: '160px', paddingRight: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Collection
        </span>
      </div>
      <div style={{ width: '110px', paddingRight: '12px' }}>
        <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Status
        </span>
      </div>
      <div style={{ width: '100px', paddingRight: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Audience
        </span>
      </div>
    </div>
  )
}

// ─── Screen ────────────────────────────────────────────────────────────────────

export default function KnowledgeArticles({ navigate }: { navigate: (screen: string) => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 3]))

  const nav: NavGroup[] = [
    {
      items: [
        { label: 'Sources', onClick: () => navigate('knowledge/sources') },
        {
          label: 'Content',
          active: true,
          expandable: true,
          expanded: true,
          children: [
            { label: 'Articles', active: true, onClick: () => navigate('knowledge/articles') },
            { label: 'Your first folder' },
          ],
        },
        { label: 'Help Center', trailingIcon: ExternalLink },
      ],
    },
  ]

  const toggleRow = (id: number) => {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const clearSelection = () => setSelected(new Set())

  const selectedCount = selected.size

  return (
    <AppShell
      activeSection="knowledge"
      sectionTitle="Knowledge"
      navGroups={nav}
      sectionNavFooter={
        <div
          className="rounded-lg p-3 space-y-1.5"
          style={{ background: 'rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center justify-between">
            <span style={{ fontSize: font.sm, fontWeight: font.medium, color: 'rgba(240,239,232,0.9)' }}>
              Get set up
            </span>
          </div>
          <p style={{ fontSize: '11px', color: 'rgba(240,239,232,0.4)', lineHeight: '1.5' }}>
            Connect your channels to start receiving patient messages.
          </p>
        </div>
      }
    >
      <div className="flex flex-col h-full">

        {/* Breadcrumb + actions */}
        <div className="flex items-center justify-between px-8 pt-5 pb-4" style={{ flexShrink: 0 }}>
          <div className="flex items-center gap-1.5">
            <span style={{ fontSize: font.md, color: colors.textMuted, fontWeight: font.regular }}>
              Content
            </span>
            <span style={{ fontSize: font.md, color: colors.textMuted }}>/</span>
            <span style={{ fontSize: font.md, color: colors.textPrimary, fontWeight: font.medium }}>
              Articles
            </span>
          </div>

          <div className="flex items-center gap-2">
            <GhostBtn>Preview</GhostBtn>
            <GhostBtn>
              <FolderOpen size={13} strokeWidth={1.75} />
              New folder
            </GhostBtn>
            <button
              className="flex items-center gap-1.5 rounded-md text-white transition-colors"
              style={{
                fontSize: font.sm,
                fontWeight: font.medium,
                background: colors.accent,
                padding: '5px 12px',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.accentHover }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.accent }}
            >
              <Plus size={14} strokeWidth={2} />
              New content
            </button>
          </div>
        </div>

        {/* Search + filters */}
        <div
          className="flex items-center gap-2 px-8 pb-4"
          style={{ flexShrink: 0 }}
        >
          <div
            className="flex items-center gap-2 rounded-md flex-1"
            style={{
              border: `1px solid ${colors.borderStrong}`,
              background: colors.cardBg,
              padding: '6px 10px',
            }}
          >
            <Search size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
            <span style={{ fontSize: font.sm, color: colors.textMuted }}>Search articles...</span>
          </div>

          <GhostBtn>
            Audience <ChevronDown size={12} strokeWidth={1.75} />
          </GhostBtn>

          <GhostBtn>
            <Plus size={13} strokeWidth={2} />
            Filters
          </GhostBtn>
        </div>

        {/* Table */}
        <div
          className="flex-1 overflow-y-auto mx-8 rounded-xl overflow-hidden"
          style={{
            border: `1px solid ${colors.border}`,
            background: colors.cardBg,
            marginBottom: '24px',
          }}
        >
          {/* Bulk action bar OR column headers */}
          {selectedCount > 0
            ? <BulkActionBar count={selectedCount} onClear={clearSelection} />
            : <TableHeaders />
          }

          {/* Rows */}
          {ARTICLES.map(article => (
            <ArticleRow
              key={article.id}
              article={article}
              selected={selected.has(article.id)}
              onToggle={() => toggleRow(article.id)}
            />
          ))}
        </div>

      </div>
    </AppShell>
  )
}
