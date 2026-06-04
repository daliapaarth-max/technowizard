import { useState } from 'react'
import {
  FileText, MessageSquare, Globe, MoreHorizontal,
  ChevronDown, ChevronUp, Plus, ExternalLink, Info,
  FolderOpen, Pencil, ArrowUpRight, BookOpen,
} from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import type { NavGroup } from '../../layouts/AppShell'
import { colors, font } from '../../tokens'

// ─── Shared primitives ─────────────────────────────────────────────────────────

function GhostBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-md transition-colors flex-none"
      style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg, padding: '4px 10px', whiteSpace: 'nowrap' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.sidebarHover }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.cardBg }}
    >
      {children}
    </button>
  )
}

function PrimaryBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      className="flex items-center gap-1.5 rounded-md text-white transition-colors"
      style={{ fontSize: font.sm, fontWeight: font.medium, background: colors.accent, padding: '5px 12px' }}
      onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.accentHover }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = colors.accent }}
    >
      {children}
    </button>
  )
}

function GroupIcon({ type }: { type: 'file' | 'message' | 'globe' | 'folder' | 'pencil' | 'more' }) {
  const s = { width: '36px', height: '36px', borderRadius: '50%', background: colors.textPrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }
  const icons: Record<string, React.ReactNode> = {
    file: <FileText size={16} strokeWidth={1.75} color="#fff" />,
    message: <MessageSquare size={16} strokeWidth={1.75} color="#fff" />,
    globe: <Globe size={16} strokeWidth={1.75} color="#fff" />,
    folder: <FolderOpen size={16} strokeWidth={1.75} color="#fff" />,
    pencil: <Pencil size={16} strokeWidth={1.75} color="#fff" />,
    more: <MoreHorizontal size={16} strokeWidth={1.75} color="#fff" />,
  }
  return <div style={s}>{icons[type]}</div>
}

function SourceRow({ name, status, action, phi }: { name: string; status: string; action: string; phi?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-5"
      style={{ height: '48px', borderTop: `1px solid ${colors.border}` }}
    >
      <FileText size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
      <span className="flex-1 truncate" style={{ fontSize: font.sm, color: colors.textPrimary }}>{name}</span>
      <div className="flex items-center gap-2 flex-none">
        {phi && (
          <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>
            Contains PHI
          </span>
        )}
        {status === 'active-count' ? (
          <span className="flex items-center gap-1.5" style={{ fontSize: font.sm, color: colors.success }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: colors.success, display: 'inline-block' }} />
          </span>
        ) : status.startsWith('●') ? (
          <span className="flex items-center gap-1.5" style={{ fontSize: font.sm, color: colors.success }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: colors.success, display: 'inline-block' }} />
            {status.slice(1).trim()}
          </span>
        ) : status === 'not-enough' ? (
          <span className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.textMuted }}>
            <Info size={13} strokeWidth={1.75} style={{ color: colors.textMuted }} />
            Not enough conversations
          </span>
        ) : (
          <span style={{ fontSize: font.sm, color: colors.textMuted }}>{status}</span>
        )}
      </div>
      <GhostBtn>{action}</GhostBtn>
    </div>
  )
}

function GroupCard({ icon, label, description, rows }: {
  icon: 'file' | 'message' | 'globe' | 'folder' | 'pencil' | 'more'
  label: string
  description: string
  rows: Array<{ name: string; status: string; action: string; phi?: boolean }>
}) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
      <div className="flex items-center gap-3 px-5 py-4">
        <GroupIcon type={icon} />
        <div>
          <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>{label}</p>
          <p style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: '2px' }}>{description}</p>
        </div>
      </div>
      {rows.map((r, i) => <SourceRow key={i} {...r} />)}
    </div>
  )
}

function InfoBanner({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <div
      className="flex items-start gap-2 rounded-xl px-4 py-3"
      style={{
        background: accent ? colors.accentTint : colors.warningWash,
        border: `1px solid ${accent ? colors.accentLight : colors.warningLight}`,
        fontSize: font.sm, color: colors.textSecondary,
      }}
    >
      <Info size={14} strokeWidth={1.75} style={{ color: accent ? colors.accent : colors.warning, flexShrink: 0, marginTop: '1px' }} />
      <span>{children}</span>
    </div>
  )
}

// ─── Tab content ────────────────────────────────────────────────────────────────

function AllSourcesTab() {
  return (
    <div className="space-y-4">
      <GroupCard icon="file" label="Patient-visible articles" description="Wiz AI answers patient questions directly from these articles." rows={[
        { name: 'Medvana Help Center', status: '● 4 articles', action: 'Add article' },
        { name: 'Medvana Website', status: 'Not set up', action: 'Sync' },
      ]} />
      <GroupCard icon="file" label="Internal articles" description="Give Wiz AI internal knowledge only available to your team. Never shown to patients." rows={[
        { name: 'Medvana Workspace', status: '● 2 articles', action: 'Add article' },
        { name: 'Refund Policy SOP', status: 'Not set up', action: 'Sync or Import' },
        { name: 'Appointment SOPs', status: 'Not set up', action: 'Sync or Import' },
        { name: 'Insurance Claims Guide', status: 'Not set up', action: 'Sync or Import', phi: true },
      ]} />
      <GroupCard icon="message" label="Conversations" description="Let Wiz AI learn from your team's resolved conversations over the past 4 months." rows={[
        { name: 'Medvana Workspace', status: 'not-enough', action: 'Manage' },
        { name: 'Archived Cases', status: 'Import takes 24–48 hours', action: 'Import' },
      ]} />
    </div>
  )
}

function AIAgentTab() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div
        className="rounded-xl overflow-hidden relative"
        style={{ background: 'linear-gradient(135deg, #e8f4e8 0%, #d4e8d4 50%, #c8d8c0 100%)', minHeight: '200px' }}
      >
        <div className="absolute inset-0 flex items-center px-8">
          <div style={{ maxWidth: '400px' }}>
            <div className="flex items-center gap-2 mb-3">
              <h2 style={{ fontSize: font.h2, fontWeight: font.medium, color: colors.textPrimary }}>Wiz AI Agent</h2>
              <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>Not live</span>
            </div>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: '1.6', marginBottom: '16px' }}>
              Wiz AI Agent uses your knowledge to resolve patient queries automatically — handling billing, scheduling, and insurance questions without routing to your team.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.accent, fontWeight: font.medium }}>
                <ArrowUpRight size={13} /> Set up now
              </button>
              <button style={{ fontSize: font.sm, color: colors.textSecondary }}>□ Learn more</button>
            </div>
          </div>
        </div>
      </div>

      <GroupCard icon="file" label="Patient-visible articles" description="Let Wiz AI Agent answer patient questions from your Help Center content." rows={[
        { name: 'Medvana Help Center', status: 'No patient-visible articles for Wiz AI Agent', action: 'Add article' },
        { name: 'Medvana Website', status: 'Not set up', action: 'Sync' },
      ]} />
      <GroupCard icon="globe" label="Websites" description="Let Wiz AI Agent use content from any public Medvana web page." rows={[]} />
      <GroupCard icon="more" label="More content sources" description="Give Wiz AI Agent sources that aren't visible to your patients." rows={[
        { name: 'Snippets', status: 'No snippets for Wiz AI Agent', action: 'Add snippet' },
        { name: 'Documents', status: 'No documents for Wiz AI Agent', action: 'Upload document' },
      ]} />
    </div>
  )
}

function CopilotTab() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, padding: '24px' }}>
        <div className="flex items-start justify-between gap-6">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2 mb-2">
              <h2 style={{ fontSize: font.h2, fontWeight: font.medium, color: colors.textPrimary }}>Wiz AI Copilot</h2>
              <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.successLight, color: colors.success }}>Live</span>
            </div>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: '1.6', marginBottom: '16px' }}>
              Copilot gives each support agent an AI assistant that instantly finds answers and drafts replies — citing the exact policy source.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.accent, fontWeight: font.medium }}><ArrowUpRight size={13} /> Go to Inbox</button>
              <button style={{ fontSize: font.sm, color: colors.textSecondary }}>▷ Watch guide</button>
              <button style={{ fontSize: font.sm, color: colors.textSecondary }}>□ Learn more</button>
            </div>
          </div>
          {/* Mini chat preview */}
          <div className="rounded-xl overflow-hidden flex-none" style={{ width: '200px', background: colors.accent }}>
            <div className="px-3 py-2" style={{ background: colors.accentHover }}>
              <span style={{ fontSize: '11px', fontWeight: font.medium, color: '#fff' }}>Ask Copilot</span>
            </div>
            <div className="p-3 space-y-2">
              <div className="rounded-lg px-2 py-1.5" style={{ background: 'rgba(255,255,255,0.15)', fontSize: '10px', color: '#fff' }}>
                What do I do when a patient has an insurance dispute?
              </div>
              <div className="rounded-lg px-2 py-1.5" style={{ background: colors.cardBg, fontSize: '10px', color: colors.textPrimary }}>
                <div style={{ fontWeight: font.medium, marginBottom: '2px' }}>Resolving insurance disputes</div>
                <div style={{ color: colors.textMuted }}>Internal SOP · Priya · 2d ago</div>
                <div style={{ color: colors.textSecondary, marginTop: '4px' }}>To process an insurance dispute, follow these steps: 1. Verify the patient's claim number...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <InfoBanner accent>
        Copilot is live and helping your team. Agents can ask Copilot anything from the inbox using{' '}
        <strong>Ask Copilot</strong>.
      </InfoBanner>

      <GroupCard icon="folder" label="Macros" description="Copilot will recommend response macros available to your teammates." rows={[
        { name: 'Medvana Workspace', status: '● 4 macros for Copilot', action: 'Manage' },
      ]} />
      <GroupCard icon="file" label="Internal articles" description="Give Copilot internal knowledge only available to your team." rows={[
        { name: 'Medvana Workspace', status: '● 1 article for Copilot', action: 'Add article' },
        { name: 'Refund Policy SOP', status: 'Not set up', action: 'Sync or Import' },
        { name: 'Appointment SOPs', status: 'Not set up', action: 'Sync or Import' },
      ]} />
    </div>
  )
}

function HelpCenterTab() {
  return (
    <div className="space-y-4">
      {/* Hero */}
      <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
        <div className="flex gap-6 p-6">
          <div style={{ flex: 1 }}>
            <div className="flex items-center gap-2 mb-2">
              <h2 style={{ fontSize: font.h2, fontWeight: font.medium, color: colors.textPrimary }}>Medvana Help Center</h2>
              <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>Not live</span>
            </div>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, lineHeight: '1.6', marginBottom: '16px' }}>
              Help Center lets you publish articles and organise them into collections so patients can find answers to common questions directly on your website or app.
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.accent, fontWeight: font.medium }}><ArrowUpRight size={13} /> Set up now</button>
              <button style={{ fontSize: font.sm, color: colors.textSecondary }}>□ Learn more</button>
            </div>
          </div>
          {/* Preview */}
          <div className="rounded-xl overflow-hidden flex-none" style={{ width: '260px', background: '#f0f4f8', padding: '12px' }}>
            <div className="rounded-lg px-3 py-2 mb-2 text-center" style={{ background: colors.accent }}>
              <p style={{ fontSize: '11px', fontWeight: font.medium, color: '#fff' }}>Hello, how can we help?</p>
              <div className="rounded-md mt-1 px-2 py-1" style={{ background: 'rgba(255,255,255,0.2)', fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>
                Search for answers...
              </div>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {['Getting Started', 'Billing & Insurance', 'Appointments', 'Privacy & Security', 'Account Settings', 'Patient Support'].map(cat => (
                <div key={cat} className="rounded-lg p-1.5 text-center" style={{ background: '#fff', fontSize: '9px', color: colors.textSecondary }}>
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <GroupCard icon="file" label="Patient-visible articles" description="Share public articles in the Medvana Help Center where patients can self-serve." rows={[
        { name: 'Medvana Help Center', status: 'No published articles', action: 'Add article' },
        { name: 'Medvana Website', status: 'Not set up', action: 'Sync or Import' },
      ]} />

      <InfoBanner>
        <strong>Pro tip:</strong> For best results, publish at least one article in{' '}
        <strong>Billing &amp; Insurance</strong> before going live. Patients ask about insurance claims in 73% of first contacts.
      </InfoBanner>

      {/* Collections */}
      <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
        <div className="flex items-center gap-3 px-5 py-4">
          <GroupIcon type="folder" />
          <div>
            <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>Collections</p>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: '2px' }}>Organise your articles into collections patients can browse.</p>
          </div>
        </div>
        {[
          { name: 'Getting Started', count: '0 articles', phi: false },
          { name: 'Billing & Insurance', count: '0 articles', phi: true },
          { name: 'Appointments & Scheduling', count: '0 articles', phi: false },
        ].map((col, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-5"
            style={{ height: '48px', borderTop: `1px solid ${colors.border}`, borderLeft: col.phi ? `3px solid ${colors.warning}` : '3px solid transparent' }}
          >
            <FolderOpen size={13} strokeWidth={1.75} style={{ color: colors.textMuted, flexShrink: 0 }} />
            <span className="flex-1" style={{ fontSize: font.sm, color: colors.textPrimary }}>{col.name}</span>
            {col.phi && (
              <span className="rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: colors.warningLight, color: colors.warning }}>Contains PHI</span>
            )}
            <span style={{ fontSize: font.sm, color: colors.textMuted }}>{col.count}</span>
            <GhostBtn>View</GhostBtn>
          </div>
        ))}
        <div className="flex justify-center py-3" style={{ borderTop: `1px solid ${colors.border}` }}>
          <button className="flex items-center gap-1" style={{ fontSize: font.sm, color: colors.textMuted }}>
            <Plus size={13} strokeWidth={2} /> Add collection
          </button>
        </div>
      </div>

      {/* Customise appearance */}
      <div className="rounded-xl overflow-hidden" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
        <div className="flex items-center gap-3 px-5 py-4">
          <GroupIcon type="pencil" />
          <div>
            <p style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>Customise appearance</p>
            <p style={{ fontSize: font.sm, color: colors.textSecondary, marginTop: '2px' }}>Match the Help Center to Medvana's brand.</p>
          </div>
        </div>
        {[
          { label: 'Brand name', value: 'Medvana', dot: undefined },
          { label: 'Accent color', value: '#C96442', dot: colors.accent },
          { label: 'Default language', value: 'English (US)', dot: undefined },
        ].map((row, i) => (
          <div
            key={i}
            className="flex items-center justify-between px-5"
            style={{ height: '44px', borderTop: `1px solid ${colors.border}` }}
          >
            <span style={{ fontSize: font.sm, color: colors.textSecondary }}>{row.label}</span>
            <div className="flex items-center gap-2">
              {row.dot && <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: row.dot, display: 'inline-block' }} />}
              <span style={{ fontSize: font.sm, color: colors.textPrimary }}>{row.value}</span>
              <button style={{ fontSize: font.sm, color: colors.accent, fontWeight: font.medium }}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── GetSetUp widget ───────────────────────────────────────────────────────────

function GetSetUpWidget() {
  const [collapsed, setCollapsed] = useState(false)
  if (collapsed) {
    return (
      <button
        className="flex items-center justify-between w-full rounded-lg px-3 py-2"
        style={{ background: colors.activeNavBg, fontSize: font.sm, color: colors.textSecondary }}
        onClick={() => setCollapsed(false)}
      >
        <span style={{ fontWeight: font.medium, color: colors.textPrimary }}>Get set up</span>
        <ChevronUp size={13} strokeWidth={1.75} style={{ transform: 'rotate(180deg)', color: colors.textMuted }} />
      </button>
    )
  }
  return (
    <div className="rounded-lg p-3 space-y-1.5" style={{ background: colors.activeNavBg }}>
      <div className="flex items-start justify-between gap-2">
        <span style={{ fontSize: font.sm, fontWeight: font.medium, color: colors.textPrimary }}>Get set up</span>
        <button onClick={() => setCollapsed(true)}>
          <ChevronUp size={13} strokeWidth={1.75} style={{ color: colors.textMuted }} />
        </button>
      </div>
      <p style={{ fontSize: '11px', color: colors.textSecondary, lineHeight: '1.5' }}>
        Connect your channels to start receiving patient messages.
      </p>
    </div>
  )
}

// ─── Screen ────────────────────────────────────────────────────────────────────

const TABS = ['All sources', 'AI Agent', 'Copilot', 'Help Center']

export default function KnowledgeSources({ navigate }: { navigate: (screen: string) => void }) {
  const [activeTab, setActiveTab] = useState('All sources')

  const nav: NavGroup[] = [{
    items: [
      { label: 'Sources', active: true, onClick: () => navigate('knowledge/sources') },
      {
        label: 'Content', expandable: true, expanded: true,
        children: [
          { label: 'Articles', onClick: () => navigate('knowledge/articles') },
          { label: 'Your first folder' },
        ],
      },
      { label: 'Help Center', trailingIcon: ExternalLink },
    ],
  }]

  const tabContent: Record<string, React.ReactNode> = {
    'All sources': <AllSourcesTab />,
    'AI Agent': <AIAgentTab />,
    'Copilot': <CopilotTab />,
    'Help Center': <HelpCenterTab />,
  }

  return (
    <AppShell
      activeSection="knowledge"
      sectionTitle="Knowledge"
      navGroups={nav}
      sectionNavFooter={<GetSetUpWidget />}
      navigate={navigate}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-7 pt-5 pb-0 flex-shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={16} strokeWidth={1.75} style={{ color: colors.textMuted }} />
            <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary, margin: 0 }}>Sources</h1>
          </div>
          <div className="flex items-center gap-2">
            <GhostBtn>Learn <ChevronDown size={12} strokeWidth={1.75} /></GhostBtn>
            <PrimaryBtn><Plus size={14} strokeWidth={2} /> New content</PrimaryBtn>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-7 mt-3 flex-shrink-0" style={{ borderBottom: `1px solid ${colors.border}` }}>
          {TABS.map(tab => {
            const isActive = tab === activeTab
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="px-3 py-2 transition-colors"
                style={{
                  fontSize: font.sm,
                  fontWeight: isActive ? font.medium : font.regular,
                  color: isActive ? colors.accent : colors.textMuted,
                  borderBottom: isActive ? `2px solid ${colors.accent}` : '2px solid transparent',
                  marginBottom: '-1px',
                }}
              >
                {tab}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-7 py-5">
          {tabContent[activeTab]}
        </div>
      </div>
    </AppShell>
  )
}
