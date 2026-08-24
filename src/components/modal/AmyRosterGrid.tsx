import { useState } from 'react'
import { motion } from 'framer-motion'
import { useParticleBurst } from '../ui/ParticleBurst'
import { playGuitarPluck } from '../../lib/sfx'
import { asset } from '../../lib/asset'

interface RosterMember {
  name: string
  front: string
  /** Real archive photograph, where one exists in the source material. */
  back?: string
}

/** Sourced from the real /public/AMY/AMY/Before&After archive — front shows
 *  the restored, game-ready artwork; back reveals the raw archive photo it
 *  was built from. */
const ROSTER: RosterMember[] = [
  { name: 'Robert Johnson', front: '/assets/amy/before-after/001-after.jpg', back: '/assets/amy/before-after/001-before.jpg' },
  { name: 'Mia Zapata', front: '/assets/amy/before-after/002-after.jpg', back: '/assets/amy/before-after/002-before.jpg' },
  { name: 'Jean-Michel Basquiat', front: '/assets/amy/before-after/003-after.jpg', back: '/assets/amy/before-after/003-before.jpg' },
  { name: 'Anton Yelchin', front: '/assets/amy/before-after/004-after.jpg', back: '/assets/amy/before-after/004-before.jpg' },
  { name: 'Jimi Hendrix', front: '/assets/amy/before-after/005-after.jpg', back: '/assets/amy/before-after/005-before.jpg' },
  { name: 'Jim Morrison', front: '/assets/amy/before-after/006-after.jpg', back: '/assets/amy/before-after/006-before.jpg' },
  { name: 'Janis Joplin', front: '/assets/amy/before-after/007-after.jpg', back: '/assets/amy/before-after/007-before.jpg' },
  { name: 'Brian Jones', front: '/assets/amy/before-after/008-after.jpg', back: '/assets/amy/before-after/008-before.jpg' },
  { name: 'Cecilia', front: '/assets/amy/before-after/009-after.jpg', back: '/assets/amy/before-after/009-before.jpg' },
  { name: 'Alan Wilson', front: '/assets/amy/before-after/010-after.jpg', back: '/assets/amy/before-after/010-before.jpg' },
  { name: 'Kurt Cobain', front: '/assets/amy/before-after/011-after.jpg', back: '/assets/amy/before-after/011-before.jpg' },
].map((m) => ({ ...m, front: asset(m.front), back: m.back ? asset(m.back) : undefined }))

function FlipCard({ member }: { member: RosterMember }) {
  const [pinned, setPinned] = useState(false)
  const [hovered, setHovered] = useState(false)
  const showBack = pinned || hovered
  const hasArchive = !!member.back
  const { spawn, field } = useParticleBurst(3)

  const triggerFx = () => {
    spawn()
    playGuitarPluck()
  }

  return (
    <button
      type="button"
      onClick={() => {
        setPinned((p) => !p)
        triggerFx()
      }}
      onMouseEnter={() => {
        setHovered(true)
        triggerFx()
      }}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      aria-pressed={pinned}
      aria-label={`${member.name} — ${showBack ? 'showing archive side, activate to flip back' : 'showing restored artwork, activate to reveal archive photo'}`}
      className="group relative aspect-square rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-pearl-gold"
      style={{ perspective: 700 }}
    >
      {field}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: showBack ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        {/* Front — restored / redesigned artwork */}
        <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/10 shadow-md" style={{ backfaceVisibility: 'hidden' }}>
          <img src={member.front} alt="" aria-hidden className="w-full h-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm py-1">
            <p className="text-[7.5px] sm:text-[8px] font-bold uppercase tracking-wide text-white text-center leading-tight px-0.5">{member.name}</p>
          </div>
        </div>

        {/* Back — original archive photo (or a vintage-toned pass when no
            source photo of this specific member exists in the project files) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border-2 border-pearl-gold/40 shadow-md bg-black"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <img
            src={member.back ?? member.front}
            alt=""
            aria-hidden
            className={`w-full h-full object-cover ${hasArchive ? '' : 'grayscale sepia contrast-125 brightness-90'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <span className="absolute top-1 left-1 text-[6px] font-bold uppercase tracking-widest text-pearl-gold bg-black/50 px-1 py-0.5 rounded">
            {hasArchive ? 'Archive' : 'Vintage'}
          </span>
        </div>
      </motion.div>
    </button>
  )
}

/** The interactive "27 Club" roster — hover or click any member to flip the
 *  card and reveal the archive-photo (or vintage-toned) reverse side. */
export default function AmyRosterGrid() {
  return (
    <div className="h-full min-h-full flex flex-col bg-gradient-to-b from-[#241b3d] to-[#140f28] p-3.5 sm:p-4">
      <p className="text-center font-display font-extrabold text-sm text-white tracking-tight">THE 27 CLUB</p>
      <p className="text-center text-[9px] font-semibold uppercase tracking-widest text-pearl-gold/80 mb-3">11 ICONS. ONE LEGACY.</p>
      {/* flex-1 + centered content — the grid fills whatever height the
          phone screen actually renders at instead of leaving the phone's
          own white background exposed below a short, top-anchored block. */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          {ROSTER.map((m) => (
            <FlipCard key={m.name} member={m} />
          ))}
        </div>
      </div>
      <p className="text-center text-[8px] text-white/40 pt-2">Hover or tap a card to flip</p>
    </div>
  )
}
