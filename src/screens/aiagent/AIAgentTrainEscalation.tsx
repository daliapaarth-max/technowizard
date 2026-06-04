import { ChevronDown, ChevronRight, Plus } from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import PreviewPanel from '../../components/PreviewPanel'
import { buildAIAgentNav } from './aiAgentNav'
import { colors, font } from '../../tokens'

function EscalationRule({
  title,
  status,
  audience,
  used,
  resolved,
  escalated,
  warning,
  highlight,
}: {
  title: string
  status: 'Active' | 'Not enabled'
  audience: string
  used?: number
  resolved?: number
  escalated?: number
  warning?: string
  highlight?: boolean
}) {
  return (
    <div
      className="rounded-xl mb-3 overflow-hidden cursor-pointer"
      style={{
        border: `1px solid ${highlight ? colors.warning : colors.border}`,
        background: highlight ? colors.warningWash : colors.cardBg,
      }}
    >
      <div className="flex items-center justify-between px-5 py-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>{title}</span>
            <span
              className="rounded-pill px-2 py-0.5"
              style={{
                fontSize: '11px', fontWeight: font.medium,
                background: status === 'Active' ? colors.successLight : colors.activeNavBg,
                color: status === 'Active' ? colors.success : colors.textMuted,
              }}
            >
              {status === 'Active' && '● '}{status}
            </span>
            {status === 'Active' && (
              <span style={{ fontSize: '11px', color: colors.textMuted }}>{audience}</span>
            )}
          </div>
          {(used !== undefined) && (
            <p style={{ fontSize: '11px', color: colors.textMuted }}>
              Used: {used} · Resolved: {resolved} · Escalated: {escalated}
            </p>
          )}
          {status === 'Not enabled' && (
            <p style={{ fontSize: '11px', color: colors.textMuted }}>{audience}</p>
          )}
          {warning && (
            <div className="flex items-center gap-1 mt-1.5 rounded-md px-2 py-1" style={{ background: colors.warningLight, display: 'inline-flex' }}>
              <span style={{ color: colors.warning }}>⚠</span>
              <span style={{ fontSize: '11px', color: colors.warning }}>{warning}</span>
            </div>
          )}
        </div>
        <ChevronRight size={14} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
      </div>
    </div>
  )
}

export default function AIAgentTrainEscalation({ navigate }: { navigate: (s: string) => void }) {
  const nav = buildAIAgentNav('aiagent/train/escalation', navigate)

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
          <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary }}>Escalation</h1>
          <button className="flex items-center gap-1 rounded-md px-3 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
            Learn <ChevronDown size={12} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-6">
          {/* Search */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex-1 rounded-md px-3 py-2" style={{ border: `1px solid ${colors.borderStrong}`, background: colors.cardBg, fontSize: font.sm, color: colors.textMuted }}>
              Search escalation by title or content...
            </div>
            <button className="rounded-md px-3 py-2" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
              + Filters
            </button>
          </div>

          {/* Escalation Rules section */}
          <div className="mb-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>Escalation Rules</p>
                <p style={{ fontSize: font.sm, color: colors.textSecondary }}>Use patient attributes and conversation data to set deterministic escalation conditions.</p>
              </div>
            </div>

            <EscalationRule
              title="Default escalation rule"
              status="Not enabled"
              audience="Everyone on All channels"
            />
            <EscalationRule
              title="Clinical query — always escalate"
              status="Active"
              audience="All patients · All channels"
              used={34}
              resolved={0}
              escalated={34}
              highlight
              warning="This rule is locked. Clinical escalations cannot be automated per your compliance settings."
            />
            <EscalationRule
              title="High-value billing disputes"
              status="Active"
              audience="Billing team · Web & Email"
              used={18}
              resolved={3}
              escalated={15}
            />

            <button className="flex items-center gap-1 mt-2" style={{ fontSize: font.sm, color: colors.textMuted }}>
              <Plus size={13} strokeWidth={2} /> New
            </button>
          </div>

          {/* Escalation Guidance */}
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.border}`, background: colors.cardBg }}>
            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: `1px solid ${colors.border}` }}>
              <div
                className="flex items-center justify-center rounded-full flex-none"
                style={{ width: '28px', height: '28px', background: colors.textPrimary }}
              >
                <span style={{ fontSize: '12px', color: '#fff', fontWeight: font.medium }}>E</span>
              </div>
              <div>
                <p style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Escalation Guidance</p>
                <p style={{ fontSize: '11px', color: colors.textMuted }}>Fine-tune Wiz AI's escalation behaviour in specific scenarios not captured by Escalation Rules.</p>
              </div>
            </div>
            <div className="px-5 py-4">
              <div className="flex flex-wrap gap-2">
                {['Escalate insurance disputes', 'Escalate refund requests above $200', 'Escalate medication queries', 'Escalate c...'].map(tag => (
                  <span
                    key={tag}
                    className="rounded-pill px-3 py-1"
                    style={{ fontSize: '11px', background: colors.activeNavBg, color: colors.textSecondary }}
                  >
                    {tag}
                  </span>
                ))}
                <button className="flex items-center gap-1 rounded-pill px-3 py-1" style={{ fontSize: '11px', color: colors.textMuted, border: `1px dashed ${colors.borderStrong}` }}>
                  <Plus size={11} strokeWidth={2} /> New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}
