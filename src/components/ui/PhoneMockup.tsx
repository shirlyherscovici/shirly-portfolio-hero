import type { ReactNode } from 'react'

interface PhoneMockupProps {
  children: ReactNode
  className?: string
  frameClassName?: string
  label?: string
  /** Widen the frame slightly for content that needs more breathing room
   *  (e.g. a 3-column card grid) than a stock 9:19 app screenshot. */
  wide?: boolean
  /** Let the screen content scroll instead of clipping — for interactive
   *  panels (like a flip-card grid) whose height may exceed the frame. */
  scroll?: boolean
}

/** A realistic iPhone-style device frame used to present real project UI —
 *  the Galgalatz "Production Voting" screen and Amy's "27 Club" roster. */
export default function PhoneMockup({ children, className = '', frameClassName = '', label, wide = false, scroll = false }: PhoneMockupProps) {
  return (
    <div className={`mx-auto w-full ${wide ? 'max-w-[270px]' : 'max-w-[230px]'} ${className}`}>
      <div className={`relative rounded-[2.4rem] border-[8px] bg-black shadow-2xl ${frameClassName || 'border-[#1a1a1a]'}`}>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 rounded-b-xl bg-black z-20" />
        <div className={`relative rounded-[1.9rem] bg-white aspect-[9/19] ${scroll ? 'overflow-y-auto no-scrollbar' : 'overflow-hidden'}`}>{children}</div>
      </div>
      {label && <p className="text-center mt-2.5 text-[10px] font-semibold uppercase tracking-wide opacity-60">{label}</p>}
    </div>
  )
}
