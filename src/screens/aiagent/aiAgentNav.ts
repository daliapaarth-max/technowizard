import { ExternalLink } from 'lucide-react'
import type { NavGroup } from '../../layouts/AppShell'

export function buildAIAgentNav(activeItem: string, navigate: (s: string) => void): NavGroup[] {
  const item = (label: string, screen: string, dot?: string) => ({
    label,
    active: activeItem === screen,
    onClick: () => navigate(screen),
    dot,
  })

  return [
    {
      heading: 'OPERATOR',
      items: [item('Operator', 'aiagent/operator')],
    },
    {
      heading: 'TRAIN',
      items: [
        item('Content', 'aiagent/train/content'),
        item('Guidance', 'aiagent/train/guidance'),
        { label: 'Attributes', onClick: () => {} },
        item('Escalation', 'aiagent/train/escalation'),
        { label: 'Procedures', onClick: () => {} },
      ],
    },
    {
      heading: 'TEST',
      items: [item('Test', 'aiagent/test')],
    },
    {
      heading: 'DEPLOY',
      items: [
        item('Chat', 'aiagent/deploy', undefined),
        { label: 'Email', dot: '#E5382A', onClick: () => {} },
        { label: 'Phone', dot: '#E5382A', onClick: () => {} },
      ],
    },
    {
      heading: 'ANALYZE',
      items: [
        { label: 'Settings', trailingIcon: ExternalLink, onClick: () => {} },
        { label: 'Changelog', onClick: () => {} },
      ],
    },
  ]
}
