import { useState } from 'react'
import KnowledgeSources from './screens/knowledge/KnowledgeSources'
import KnowledgeArticles from './screens/knowledge/KnowledgeArticles'
import AIAgentDeploy from './screens/aiagent/AIAgentDeploy'
import AIAgentTest from './screens/aiagent/AIAgentTest'
import AIAgentTrainContent from './screens/aiagent/AIAgentTrainContent'
import AIAgentTrainGuidance from './screens/aiagent/AIAgentTrainGuidance'
import AIAgentTrainEscalation from './screens/aiagent/AIAgentTrainEscalation'

type Screen =
  | 'knowledge/sources'
  | 'knowledge/articles'
  | 'aiagent/deploy'
  | 'aiagent/test'
  | 'aiagent/train/content'
  | 'aiagent/train/guidance'
  | 'aiagent/train/escalation'

// Map global nav section clicks → default screen for that section
const SECTION_DEFAULTS: Record<string, Screen> = {
  knowledge: 'knowledge/sources',
  'ai-agent': 'aiagent/deploy',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('knowledge/sources')

  const navigate = (s: string) => {
    const dest = SECTION_DEFAULTS[s] ?? s
    setScreen(dest as Screen)
  }

  const props = { navigate }

  switch (screen) {
    case 'knowledge/sources':       return <KnowledgeSources {...props} />
    case 'knowledge/articles':      return <KnowledgeArticles {...props} />
    case 'aiagent/deploy':          return <AIAgentDeploy {...props} />
    case 'aiagent/test':            return <AIAgentTest {...props} />
    case 'aiagent/train/content':   return <AIAgentTrainContent {...props} />
    case 'aiagent/train/guidance':  return <AIAgentTrainGuidance {...props} />
    case 'aiagent/train/escalation':return <AIAgentTrainEscalation {...props} />
  }
}
