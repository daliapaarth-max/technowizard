import { ChevronDown, Plus, Check, X } from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import PreviewPanel from '../../components/PreviewPanel'
import { buildAIAgentNav } from './aiAgentNav'
import { colors, font } from '../../tokens'

function AddContentCard({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="flex flex-col items-center justify-center gap-2 rounded-xl p-4 transition-colors"
      style={{ border: `1px solid ${colors.border}`, background: colors.cardBg, minHeight: '90px', width: '100%' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.cardBg }}
    >
      <div style={{ color: colors.textMuted }}>{icon}</div>
      <span style={{ fontSize: '11px', color: colors.textSecondary, textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
    </button>
  )
}

function StateIcon({ state }: { state: true | false | null }) {
  if (state === null) return <span style={{ color: colors.borderStrong }}>—</span>
  if (state === true) return <Check size={13} strokeWidth={2} style={{ color: colors.success }} />
  return <X size={13} strokeWidth={2} style={{ color: colors.borderStrong }} />
}

export default function AIAgentTrainContent({ navigate }: { navigate: (s: string) => void }) {
  const nav = buildAIAgentNav('aiagent/train/content', navigate)

  return (
    <AppShell
      activeSection="ai-agent"
      sectionTitle="Wiz AI Agent"
      navGroups={nav}
      rightPanel={<PreviewPanel />}
      navigate={navigate}
      sectionNavTitleSlot={
        <button className="flex items-center justify-between w-full px-2 py-1 rounded-md" style={{ fontSize: font.sm, color: colors.textSecondary }}>
          Medvana <ChevronDown size={12} strokeWidth={1.75} />
        </button>
      }
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-7 pt-5 pb-4 flex-shrink-0">
          <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary }}>Content</h1>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
            Learn <ChevronDown size={12} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-6">
          {/* Search + filters */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 rounded-md px-3 py-2" style={{ border: `1px solid ${colors.borderStrong}`, background: colors.cardBg, fontSize: font.sm, color: colors.textMuted }}>
              Search...
            </div>
            <button className="flex items-center gap-1 rounded-md px-3 py-2" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
              Audience <ChevronDown size={12} strokeWidth={1.75} />
            </button>
            <button className="flex items-center gap-1 rounded-md px-3 py-2" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
              <Plus size={13} strokeWidth={2} /> Filters
            </button>
          </div>

          {/* Add content */}
          <div className="mb-5">
            <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary, marginBottom: '12px' }}>Add content</p>
            <div className="grid grid-cols-6 gap-3">
              {[
                { label: 'Patient-visible article', icon: '📄' },
                { label: 'Internal article', icon: '🔒' },
                { label: 'Snippet', icon: '⚡' },
                { label: 'Website sync', icon: '🌐' },
                { label: 'See all', icon: '☰' },
                { label: 'Recommendations', icon: '✨' },
              ].map(({ label, icon }) => (
                <AddContentCard key={label} label={label} icon={<span style={{ fontSize: '20px' }}>{icon}</span>} />
              ))}
            </div>
          </div>

          {/* Content sources table */}
          <div>
            <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary, marginBottom: '12px' }}>Content sources</p>
            <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.border}`, background: colors.cardBg }}>
              {/* Header */}
              <div className="flex items-center px-4 py-2.5" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <div className="flex-1">
                  <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Title</span>
                </div>
                {['Status', 'AI Agent', 'Copilot', 'Help Center'].map(col => (
                  <div key={col} style={{ width: col === 'Status' ? '120px' : '80px' }}>
                    <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</span>
                  </div>
                ))}
              </div>

              {/* Row: Articles */}
              <div className="flex items-center px-4 py-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <div className="flex-1">
                  <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Articles</p>
                  <p style={{ fontSize: '11px', color: colors.textMuted }}>Snippets, public, internal, docs</p>
                </div>
                <div style={{ width: '120px' }}>
                  <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.successLight, color: colors.success }}>● 4 Live</span>
                </div>
                {[3, 2, 1].map((n, i) => (
                  <div key={i} style={{ width: '80px' }}>
                    <span style={{ fontSize: font.sm, color: colors.success, fontWeight: font.medium }}>{n}</span>
                  </div>
                ))}
              </div>

              {/* Row: Website */}
              <div className="flex items-center px-4 py-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
                <div className="flex-1">
                  <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Medvana Website</p>
                  <p style={{ fontSize: '11px', color: colors.textMuted }}>Public pages</p>
                </div>
                <div style={{ width: '120px' }}>
                  <span style={{ fontSize: font.sm, color: colors.textMuted }}>Not set up</span>
                </div>
                {([null, null, null] as const).map((s, i) => (
                  <div key={i} className="flex items-center justify-center" style={{ width: '80px' }}>
                    <StateIcon state={s} />
                  </div>
                ))}
              </div>

              {/* Row: Insurance Claims Guide (PHI, restricted) */}
              <div
                className="flex items-center px-4 py-3"
                style={{ borderLeft: `3px solid ${colors.warning}` }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Insurance Claims Guide</p>
                    <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>Contains PHI</span>
                  </div>
                  <p style={{ fontSize: '11px', color: colors.textMuted }}>Internal only</p>
                </div>
                <div style={{ width: '120px' }}>
                  <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.dangerLight, color: colors.danger }}>Restricted</span>
                </div>
                {([false, false, false] as const).map((s, i) => (
                  <div key={i} className="flex items-center justify-center" style={{ width: '80px' }}>
                    <StateIcon state={s} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
