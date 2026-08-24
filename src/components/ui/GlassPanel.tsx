import type { ReactNode, CSSProperties } from 'react'

interface GlassPanelProps {
  children: ReactNode
  theme?: 'light' | 'dark'
  soft?: boolean
  className?: string
  style?: CSSProperties
  as?: 'div' | 'section'
}

/** The shared translucent-glass surface used across the hub and every case
 *  study — light "pearl" glass or dark "cinematic" glass, with a shared
 *  glossy top-highlight sheen. */
export default function GlassPanel({ children, theme = 'light', soft = false, className = '', style, as = 'div' }: GlassPanelProps) {
  const base = theme === 'light' ? (soft ? 'glass-pearl-soft' : 'glass-pearl glass-sheen') : soft ? 'glass-cine-soft' : 'glass-cine glass-sheen'
  const Tag = as
  return (
    <Tag className={`relative rounded-[28px] ${base} ${className}`} style={style}>
      {children}
    </Tag>
  )
}
