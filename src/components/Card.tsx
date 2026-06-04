import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  padding?: string
  className?: string
}

export default function Card({ children, padding = 'p-5', className = '' }: CardProps) {
  return (
    <div className={`bg-cardBg border border-border rounded-xl ${padding} ${className}`}>
      {children}
    </div>
  )
}
