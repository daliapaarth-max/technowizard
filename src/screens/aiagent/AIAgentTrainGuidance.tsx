import { ChevronDown, Plus, ChevronUp } from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import PreviewPanel from '../../components/PreviewPanel'
import { buildAIAgentNav } from './aiAgentNav'
import { colors, font } from '../../tokens'

interface GuidanceRule {
  name: string
  description: string
  status: 'Live' | 'Draft'
  used: number | string
  resolved: number | string
  routed: number | string
}

function GuidanceSection({ title, description, rules }: {
  title: string
  description: string
  rules: GuidanceRule[]
}) {
  return (
    <div className="rounded-xl overflow-hidden mb-4" style={{ border: `1px solid ${colors.border}`, background: colors.cardBg }}>
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full flex-none"
            style={{ width: '28px', height: '28px', background: colors.textPrimary }}
          >
            <span style={{ fontSize: '12px', color: '#fff', fontWeight: font.medium }}>G</span>
          </div>
          <div>
            <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>{title}</p>
            <p style={{ fontSize: '11px', color: colors.textMuted }}>{description}</p>
          </div>
        </div>
        <ChevronUp size={14} strokeWidth={1.75} style={{ color: colors.textMuted }} />
      </div>

      {/* Column headers */}
      <div className="flex items-center px-5 py-2" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <div className="flex-1">
          <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Name</span>
        </div>
        {['Status', 'Used', 'Resolved', 'Routed out'].map(col => (
          <div key={col} style={{ width: '80px' }}>
            <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</span>
          </div>
        ))}
      </div>

      {/* Rules */}
      {rules.map((rule, i) => (
        <div key={i} className="flex items-center px-5 py-3 cursor-pointer transition-colors" style={{ borderBottom: `1px solid ${colors.border}` }}
          onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = colors.sidebarHover }}
          onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
        >
          <div className="flex-1">
            <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>{rule.name}</p>
            <p style={{ fontSize: '11px', color: colors.textMuted }}>{rule.description}</p>
          </div>
          <div style={{ width: '80px' }}>
            <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.successLight, color: colors.success }}>
              ● {rule.status}
            </span>
          </div>
          {[rule.used, rule.resolved, rule.routed].map((val, vi) => (
            <div key={vi} style={{ width: '80px' }}>
              <span style={{ fontSize: font.sm, color: typeof val === 'number' ? colors.textPrimary : colors.textMuted }}>{val}</span>
            </div>
          ))}
        </div>
      ))}

      {/* Add new */}
      <div className="px-5 py-2.5">
        <button className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.textMuted }}>
          <Plus size={13} strokeWidth={2} /> New
        </button>
      </div>
    </div>
  )
}

export default function AIAgentTrainGuidance({ navigate }: { navigate: (s: string) => void }) {
  const nav = buildAIAgentNav('aiagent/train/guidance', navigate)

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
          <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary }}>Guidance</h1>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
            Learn <ChevronDown size={12} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-6">
          {/* Filter bar */}
          <div className="flex items-center gap-2 mb-5">
            <button
              className="flex items-center gap-1 rounded-md px-3 py-2"
              style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}
            >
              Basics — Calm and clear tone · Standard length <ChevronDown size={12} strokeWidth={1.75} />
            </button>
            <div className="flex-1 rounded-md px-3 py-2" style={{ border: `1px solid ${colors.borderStrong}`, background: colors.cardBg, fontSize: font.sm, color: colors.textMuted }}>
              Search guidance by title or content...
            </div>
            <button className="rounded-md px-3 py-2" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
              Filter
            </button>
          </div>

          <GuidanceSection
            title="Communication style"
            description="Customise the vocabulary and tone Wiz AI uses with patients."
            rules={[
              { name: 'Use calm, reassuring language', description: 'When discussing billing disputes or insurance claims, act...', status: 'Live', used: 12, resolved: 8, routed: 2 },
              { name: 'Never use medical jargon', description: 'Avoid clinical terminology in all patient-facing responses.', status: 'Live', used: 5, resolved: '—', routed: '—' },
            ]}
          />

          <GuidanceSection
            title="Context and clarification"
            description="Set follow-up questions Wiz AI asks before attempting a resolution."
            rules={[
              { name: 'Clarify insurance vs billing', description: 'If a patient message mentions both insurance and a char...', status: 'Live', used: 7, resolved: 4, routed: 3 },
            ]}
          />

          <GuidanceSection
            title="Content and sources"
            description="Tell Wiz AI when and how to use specific articles or sources in responses."
            rules={[
              { name: 'Refund policy citation rule', description: 'When a patient asks about refunds, always cite Article 4', status: 'Live', used: 14, resolved: 11, routed: 1 },
            ]}
          />
        </div>
      </div>
    </AppShell>
  )
}
