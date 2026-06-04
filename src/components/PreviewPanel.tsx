import { ThumbsUp, ThumbsDown, Minus } from 'lucide-react'
import { colors, font } from '../tokens'

export default function PreviewPanel() {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        <span style={{ fontSize: font.md, fontWeight: font.medium, color: colors.textPrimary }}>Preview</span>
      </div>

      {/* Tabs */}
      <div
        className="flex px-4"
        style={{ borderBottom: `1px solid ${colors.border}` }}
      >
        {['Chat', 'Email'].map((tab, i) => (
          <button
            key={tab}
            className="py-2 mr-4"
            style={{
              fontSize: font.sm,
              color: i === 0 ? colors.textPrimary : colors.textMuted,
              fontWeight: i === 0 ? font.medium : font.regular,
              borderBottom: i === 0 ? `2px solid ${colors.textPrimary}` : '2px solid transparent',
              marginBottom: '-1px',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Testing as */}
      <div className="px-3 py-2" style={{ borderBottom: `1px solid ${colors.border}` }}>
        <button
          className="flex items-center gap-1.5 rounded-md px-2 py-1"
          style={{ fontSize: '11px', color: colors.textSecondary, background: colors.activeNavBg }}
        >
          <span
            className="rounded-full"
            style={{ width: '14px', height: '14px', background: colors.textMuted, display: 'inline-block' }}
          />
          Preview patient ▾
        </button>
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {/* Patient message */}
        <div className="flex justify-end">
          <div
            className="rounded-xl px-3 py-2"
            style={{ background: colors.accent, color: '#fff', fontSize: font.sm, maxWidth: '80%' }}
          >
            can i get a refund?
          </div>
        </div>

        {/* AI response */}
        <div className="flex gap-2">
          <div
            className="flex items-center justify-center rounded-lg flex-none"
            style={{ width: '22px', height: '22px', background: colors.accent, flexShrink: 0, marginTop: '2px' }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L4.5 7h2.5L5.5 12.5l5-6H8L9.5 1.5H7z" fill="white" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '4px' }}>Wiz AI · AI Agent</div>
            <div
              className="rounded-xl px-3 py-2"
              style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, fontSize: font.sm, color: colors.textPrimary, lineHeight: '1.5' }}
            >
              Yes — you can request a refund as long as your visit was within the last 90 days and the charge is $200 or less.
              <br /><br />
              If your charge is above $200, I'll need to connect you with a member of our Billing team for manual review.
              <br /><br />
              Can you share your patient ID or the date of the visit?
            </div>
          </div>
        </div>

        {/* Patient follow-up */}
        <div className="flex justify-end">
          <div
            className="rounded-xl px-3 py-2"
            style={{ background: colors.accent, color: '#fff', fontSize: font.sm, maxWidth: '80%' }}
          >
            yes it is — visit on March 12
          </div>
        </div>

        {/* AI follow-up */}
        <div className="flex gap-2">
          <div
            className="flex items-center justify-center rounded-lg flex-none"
            style={{ width: '22px', height: '22px', background: colors.accent, flexShrink: 0, marginTop: '2px' }}
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 1.5L4.5 7h2.5L5.5 12.5l5-6H8L9.5 1.5H7z" fill="white" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: colors.textMuted, marginBottom: '4px' }}>Wiz AI · AI Agent</div>
            <div
              className="rounded-xl px-3 py-2"
              style={{ background: colors.cardBg, border: `1px solid ${colors.border}`, fontSize: font.sm, color: colors.textPrimary }}
            >
              Perfect. Let me check the billing record for March 12...
            </div>
          </div>
        </div>
      </div>

      {/* Answer uses */}
      <div className="px-3 py-2" style={{ borderTop: `1px solid ${colors.border}` }}>
        <p style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '6px' }}>This answer uses:</p>
        {['Content (1)', 'Guidance (2)'].map(item => (
          <div
            key={item}
            className="flex items-center justify-between rounded-md px-2 py-1.5 mb-1"
            style={{ background: colors.activeNavBg, fontSize: '11px', color: colors.textSecondary }}
          >
            {item}
            <span style={{ color: colors.textMuted }}>›</span>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="px-3 py-2" style={{ borderTop: `1px solid ${colors.border}` }}>
        <p style={{ fontSize: '11px', color: colors.textMuted, marginBottom: '6px' }}>Rate Wiz AI's response</p>
        <div className="flex gap-2">
          {[
            { label: 'Good', icon: ThumbsUp, active: true },
            { label: 'Acceptable', icon: Minus, active: false },
            { label: 'Poor', icon: ThumbsDown, active: false },
          ].map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className="flex items-center gap-1 rounded-md px-2 py-1"
              style={{
                fontSize: '11px',
                color: active ? colors.success : colors.textMuted,
                background: active ? colors.successLight : colors.activeNavBg,
                border: active ? `1px solid ${colors.success}` : `1px solid ${colors.border}`,
              }}
            >
              <Icon size={10} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Ask input */}
      <div className="px-3 pb-3 pt-2">
        <div
          className="rounded-lg px-3 py-2"
          style={{ border: `1px solid ${colors.border}`, background: colors.cardBg, fontSize: font.sm, color: colors.textMuted }}
        >
          Ask a question...
        </div>
      </div>
    </div>
  )
}
