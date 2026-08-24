import { useState, type ReactNode } from 'react'
import { Move } from 'lucide-react'

interface CompareSliderProps {
  before: ReactNode
  after: ReactNode
  beforeLabel?: string
  afterLabel?: string
  className?: string
  /** Controlled position 0-100. Omit to let the slider manage its own state. */
  value?: number
  onChange?: (value: number) => void
  accentClass?: string
}

/** A draggable before/after comparison reveal — accessible via a native range input. */
export default function CompareSlider({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className = '',
  value,
  onChange,
  accentClass = 'bg-white',
}: CompareSliderProps) {
  const [internal, setInternal] = useState(50)
  const pos = value ?? internal

  const handleChange = (n: number) => {
    if (onChange) onChange(n)
    else setInternal(n)
  }

  return (
    <div className={`group relative select-none overflow-hidden rounded-2xl ${className}`}>
      {/* After layer — full, sits underneath */}
      <div className="absolute inset-0">{after}</div>

      {/* Before layer — clipped to the handle position */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {before}
      </div>

      {/* Divider + handle */}
      <div className="absolute top-0 bottom-0 pointer-events-none" style={{ left: `${pos}%` }}>
        <div className={`absolute top-0 bottom-0 w-[2px] -translate-x-1/2 ${accentClass} shadow-[0_0_12px_rgba(255,255,255,0.5)]`} />
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full ${accentClass} text-black flex items-center justify-center shadow-lg`}>
          <Move size={14} />
        </div>
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 text-[10px] font-mono px-2 py-1 rounded-full bg-black/55 text-white/85 backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 text-[10px] font-mono px-2 py-1 rounded-full bg-black/55 text-white/85 backdrop-blur-sm">
        {afterLabel}
      </span>

      {/* Accessible control — invisible full-bleed range input drives the reveal */}
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => handleChange(Number(e.target.value))}
        aria-label={`Comparison slider between ${beforeLabel} and ${afterLabel}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  )
}
