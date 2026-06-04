import { useState } from 'react'
import KnowledgeSources from './screens/knowledge/KnowledgeSources'
import KnowledgeArticles from './screens/knowledge/KnowledgeArticles'

type Screen = 'knowledge/sources' | 'knowledge/articles'

export default function App() {
  const [screen, setScreen] = useState<Screen>('knowledge/sources')
  const navigate = (s: string) => setScreen(s as Screen)

  switch (screen) {
    case 'knowledge/sources':
      return <KnowledgeSources navigate={navigate} />
    case 'knowledge/articles':
      return <KnowledgeArticles navigate={navigate} />
  }
}
