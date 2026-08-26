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
        {/* Front — restored / redesigned artwork. No name label — the
            card grid reads cleaner as a pure gallery of faces, per
            explicit request. */}
        <div className="absolute inset-0 rounded-xl overflow-hidden border-2 border-white/10 shadow-md" style={{ backfaceVisibility: 'hidden' }}>
          <img src={member.front} alt={member.name} className="w-full h-full object-cover" />
        </div>

        {/* Back — original archive photo (or a vintage-toned pass when no
            source photo of this specific member exists in the project files) */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden border-2 border-pearl-gold/40 shadow-md bg-black"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {/* object-top (not the default center crop) — several archive
              photos are full torso/waist-up shots, and a center crop was
              cutting off the face and showing chest/shoulders instead. */}
          <img
            src={member.back ?? member.front}
            alt=""
            aria-hidden
            className={`w-full h-full object-cover object-top ${hasArchive ? '' : 'grayscale sepia contrast-125 brightness-90'}`}
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
    // No background fill anymore — the photographed phone screen behind
    // this grid already supplies one; painting a second, different-toned
    // background on top of it just looked like a mismatched patch.
    <div className="h-full min-h-full flex flex-col p-2.5">
      <p className="text-center font-display font-extrabold text-[11px] text-white tracking-tight" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
        THE 27 CLUB
      </p>
      {/* Reverted to 3 columns (was briefly 2) after checking the actual
          approved mockup file: it shows a tight 3-column, 4-row grid
          (3+3+3+2 for 11 members), not 2. Two columns was a good-faith
          guess made before the real mockup file was available — the file
          wins. Header/footer captions trimmed to single lines (was a
          2-line header + footer hint) to free up more height for the
          cards themselves — bigger faces, less chrome around them. */}
      <div className="flex-1 flex items-center">
        <div className="grid grid-cols-3 gap-2.5 w-full">
          {ROSTER.map((m) => (
            <FlipCard key={m.name} member={m} />
          ))}
        </div>
      </div>
    </div>
  )
}
