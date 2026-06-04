import { ChevronRight, ChevronDown } from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import PreviewPanel from '../../components/PreviewPanel'
import { buildAIAgentNav } from './aiAgentNav'
import { colors, font } from '../../tokens'

function FlowGroup({ icon, label, children }: { icon: string; label: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <div className="flex items-center gap-3 py-3 px-4">
        <div
          className="flex items-center justify-center rounded-full flex-none text-white text-sm font-medium"
          style={{ width: '28px', height: '28px', background: colors.textPrimary, fontSize: '13px' }}
        >
          {icon}
        </div>
        <span style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>{label}</span>
      </div>
      <div className="pl-4">{children}</div>
    </div>
  )
}

function FlowRow({ label, value, warning }: { label: string; value?: string; warning?: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-4 py-3 mb-1.5 cursor-pointer transition-colors"
      style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}
      onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = colors.sidebarHover }}
      onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = colors.cardBg }}
    >
      <div className="flex-1">
        <p style={{ fontSize: font.sm, color: colors.textPrimary }}>{label}</p>
        {warning && (
          <p className="flex items-center gap-1 mt-0.5" style={{ fontSize: '11px', color: colors.warning }}>
            ⚠ {warning}
          </p>
        )}
        {value && !warning && (
          <p style={{ fontSize: '11px', color: colors.textMuted, marginTop: '2px' }}>{value}</p>
        )}
      </div>
      <ChevronRight size={14} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
    </div>
  )
}

export default function AIAgentDeploy({ navigate }: { navigate: (s: string) => void }) {
  const nav = buildAIAgentNav('aiagent/deploy', navigate)

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
          <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary }}>Chat</h1>
          <button
            className="flex items-center gap-1 rounded-md px-3 py-1.5"
            style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}
          >
            Learn <ChevronDown size={12} strokeWidth={1.75} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-6">
          {/* Simple deploy card */}
          <div className="rounded-xl p-5 mb-4" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
            <div className="flex items-center gap-3 mb-1">
              <span style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>Simple deploy</span>
              <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>Not live</span>
            </div>
            <p style={{ fontSize: font.sm, color: colors.textSecondary }}>Choose how Wiz AI behaves in web chat, SMS and WhatsApp.</p>
          </div>

          {/* OPERATOR */}
          <div className="mb-1" style={{ borderBottom: `1px solid ${colors.border}` }}>
            <p className="px-1 pb-2 uppercase tracking-wider" style={{ fontSize: '10px', fontWeight: font.medium, color: colors.textMuted, letterSpacing: '0.06em' }}>OPERATOR</p>
          </div>

          <FlowGroup icon="W" label="When a patient starts a conversation">
            <FlowRow label="Patients see Wiz AI" value="All patients · Leads · Visitors" />
            <FlowRow label="In selected channels" value="Web chat · SMS" />
            <FlowRow label="Wiz AI introduces itself" value="Enabled — Hi, I'm Wiz, Medvana's support AI..." />
          </FlowGroup>

          <div className="my-3" style={{ borderBottom: `1px solid ${colors.border}` }} />

          <FlowGroup icon="W" label="Wiz AI answers the patient">
            <FlowRow label="Using support content" warning="More content required" />
            <FlowRow label="Following guidance" value="3 rules" />
          </FlowGroup>

          <div className="my-3" style={{ borderBottom: `1px solid ${colors.border}` }} />

          <FlowGroup icon="✕" label="If Wiz AI can't resolve the conversation">
            <FlowRow label="Hands over or escalates" value="Assign to: Billing team or Patient Support" />
            <FlowRow label="Asks for a conversation rating (CSAT)" value="Disabled" />
          </FlowGroup>

          <div className="my-3" style={{ borderBottom: `1px solid ${colors.border}` }} />

          <FlowGroup icon="C" label="If patient becomes inactive">
            <FlowRow label="Follows up" value="Wiz AI will confirm whether the patient still needs assistance" />
          </FlowGroup>
        </div>
      </div>
    </AppShell>
  )
}
