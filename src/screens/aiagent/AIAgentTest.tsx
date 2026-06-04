import { useState } from 'react'
import { Check, ChevronDown, Plus } from 'lucide-react'
import AppShell from '../../layouts/AppShell'
import PreviewPanel from '../../components/PreviewPanel'
import { buildAIAgentNav } from './aiAgentNav'
import { colors, font } from '../../tokens'

interface TestQuestion {
  id: number
  question: string
  answerStatus: 'Good' | 'Acceptable' | 'Poor'
  answerRating: 'Good' | 'Acceptable' | 'Poor'
}

const QUESTIONS: TestQuestion[] = [
  { id: 1, question: 'What is my insurance claim status?', answerStatus: 'Acceptable', answerRating: 'Acceptable' },
  { id: 2, question: 'How do I cancel my appointment?', answerStatus: 'Good', answerRating: 'Good' },
  { id: 3, question: 'Can I get a refund for a cancelled visit?', answerStatus: 'Good', answerRating: 'Good' },
]

function StatusPill({ value }: { value: 'Good' | 'Acceptable' | 'Poor' }) {
  const styles = {
    Good: { bg: colors.successLight, color: colors.success },
    Acceptable: { bg: colors.warningLight, color: colors.warning },
    Poor: { bg: colors.dangerLight, color: colors.danger },
  }
  const s = styles[value]
  return (
    <span className="inline-flex items-center gap-1 rounded-pill px-2 py-0.5" style={{ fontSize: '11px', fontWeight: font.medium, background: s.bg, color: s.color }}>
      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.color, display: 'inline-block' }} />
      {value}
    </span>
  )
}

function CheckMark({ checked }: { checked: boolean }) {
  return (
    <span
      className="flex items-center justify-center rounded"
      style={{ width: '16px', height: '16px', background: checked ? colors.accent : 'transparent', border: checked ? 'none' : `1.5px solid ${colors.borderStrong}`, flexShrink: 0 }}
    >
      {checked && <Check size={10} strokeWidth={2.5} color="#fff" />}
    </span>
  )
}

export default function AIAgentTest({ navigate }: { navigate: (s: string) => void }) {
  const [selected, setSelected] = useState<Set<number>>(new Set([1, 2, 3]))
  const nav = buildAIAgentNav('aiagent/test', navigate)

  const toggle = (id: number) => setSelected(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

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
        {/* Header */}
        <div className="px-7 pt-5 pb-4 flex-shrink-0">
          <div className="flex items-start justify-between gap-4">
            <h1 style={{ fontSize: font.h1, fontWeight: font.medium, color: colors.textPrimary, maxWidth: '480px', lineHeight: '1.3' }}>
              Test and improve Wiz AI's answers before going live
            </h1>
            <div className="flex items-center gap-2 flex-none">
              <button className="flex items-center gap-1 rounded-md px-3 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
                Created via manual entry <ChevronDown size={12} strokeWidth={1.75} />
              </button>
              <button className="flex items-center gap-1 rounded-md px-3 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
                Manage <ChevronDown size={12} strokeWidth={1.75} />
              </button>
              <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 text-white" style={{ fontSize: font.sm, fontWeight: font.medium, background: colors.accent }}>
                <Plus size={13} strokeWidth={2} /> Add questions <ChevronDown size={12} strokeWidth={1.75} />
              </button>
            </div>
          </div>
        </div>

        {/* Filters + bulk bar */}
        <div className="px-7 pb-4 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            {['Preview patient', 'Answer status: Any', 'Answer rating: Any'].map((f, i) => (
              <button key={f} className="flex items-center gap-1 rounded-md px-2.5 py-1.5" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.cardBg }}>
                {i === 0 && <span className="rounded-full inline-block mr-0.5" style={{ width: '12px', height: '12px', background: colors.textMuted }} />}
                {f} <ChevronDown size={11} strokeWidth={1.75} />
              </button>
            ))}
          </div>

          {selected.size > 0 && (
            <div className="flex items-center gap-3 rounded-xl px-4 py-2.5" style={{ background: colors.cardBg, border: `1px solid ${colors.border}` }}>
              <CheckMark checked />
              <span style={{ fontSize: font.sm, color: colors.textSecondary }}>
                <strong style={{ color: colors.textPrimary }}>{selected.size} questions</strong> selected
              </span>
              {['Update answers', 'Delete questions', 'Create test group'].map(a => (
                <button key={a} className="flex items-center gap-1 rounded-md px-2.5 py-1" style={{ fontSize: font.sm, color: colors.textSecondary, border: `1px solid ${colors.borderStrong}`, background: colors.sidebarHover }}>
                  {a}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto px-7 pb-6">
          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${colors.border}`, background: colors.cardBg }}>
            {/* Header row */}
            <div className="flex items-center px-4 py-2.5" style={{ borderBottom: `1px solid ${colors.border}`, background: colors.cardBg }}>
              <div style={{ width: '36px' }} />
              <div className="flex-1">
                <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Question</span>
              </div>
              {['Answer status', 'Answer rating'].map(col => (
                <div key={col} style={{ width: '130px' }}>
                  <span style={{ fontSize: '11px', fontWeight: font.medium, color: colors.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col}</span>
                </div>
              ))}
            </div>

            {QUESTIONS.map(q => (
              <div
                key={q.id}
                className="flex items-center px-4 py-3 cursor-pointer transition-colors"
                style={{
                  borderTop: `1px solid ${colors.border}`,
                  background: selected.has(q.id) ? colors.accentTint : 'transparent',
                }}
                onClick={() => toggle(q.id)}
                onMouseEnter={e => { if (!selected.has(q.id)) (e.currentTarget as HTMLDivElement).style.background = colors.sidebarHover }}
                onMouseLeave={e => { if (!selected.has(q.id)) (e.currentTarget as HTMLDivElement).style.background = 'transparent' }}
              >
                <div style={{ width: '36px' }}>
                  <CheckMark checked={selected.has(q.id)} />
                </div>
                <div className="flex-1">
                  <span style={{ fontSize: font.sm, color: colors.textPrimary }}>{q.question}</span>
                </div>
                <div style={{ width: '130px' }}>
                  <StatusPill value={q.answerStatus} />
                </div>
                <div style={{ width: '130px' }}>
                  <StatusPill value={q.answerRating} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  )
}
