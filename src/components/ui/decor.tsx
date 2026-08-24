/** Small, self-contained decorative SVG glyphs used as floating boundary-
 *  breaking accents throughout the hub and case studies (coins, music notes,
 *  a rose, a swallow). These are generic UI ornaments, not stand-ins for any
 *  real project deliverable. */

export function GoldCoin({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className}>
      <defs>
        <radialGradient id="coinGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fff3d0" />
          <stop offset="45%" stopColor="#e2c07f" />
          <stop offset="100%" stopColor="#a3762f" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="url(#coinGrad)" stroke="#8a641f" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="#8a641f" strokeWidth="1" opacity="0.5" />
      <text x="20" y="26" textAnchor="middle" fontSize="16" fontWeight="800" fill="#6b4a17" fontFamily="Sora, sans-serif">
        $
      </text>
    </svg>
  )
}

export function MusicNote({ size = 26, className = '', color = '#ffffff' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 18V5.5L20 3v12.5M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeartIcon({ size = 20, className = '', color = '#c23b3b' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} className={className}>
      <path d="M12 21s-7.2-4.6-9.9-9.1C.4 8.6 1.6 5 5 3.9c2-.7 4 .1 5 1.9 1-1.8 3-2.6 5-1.9 3.4 1.1 4.6 4.7 2.9 8-2.7 4.5-9.9 9.1-9.9 9.1Z" />
    </svg>
  )
}

export function GoldRose({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path d="M24 6c6 2 9 7 8 12-1 4-5 6-9 5" stroke="#8f1f2d" strokeWidth="1.4" fill="#c23b3b" />
      <circle cx="24" cy="16" r="9" fill="#b02a3a" />
      <circle cx="24" cy="16" r="5.5" fill="#c94a58" />
      <circle cx="24" cy="16" r="2.4" fill="#e07785" />
      <path d="M23 24c-2 6-1 13 2 18" stroke="#3a6b3f" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 30c-3 1-6 0-7-3" stroke="#3a6b3f" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M25 34c3 1 6-1 6-4" stroke="#3a6b3f" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

/** A hand-built 3D-shaded treasure chest — no real project asset fits a
 *  "bonus reward" motif, so this is a synthetic pop-art ornament matching
 *  the gold/red palette (open lid, spilling coins), not a stand-in for any
 *  real deliverable. */
export function TreasureChest({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.82} viewBox="0 0 56 46" className={className}>
      <defs>
        <linearGradient id="chestWood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9576b" />
          <stop offset="100%" stopColor="#8f1f2d" />
        </linearGradient>
        <linearGradient id="chestLid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e2554f" />
          <stop offset="100%" stopColor="#b02a3a" />
        </linearGradient>
        <linearGradient id="chestGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3d0" />
          <stop offset="50%" stopColor="#e2c07f" />
          <stop offset="100%" stopColor="#a3762f" />
        </linearGradient>
      </defs>
      {/* Spilling coins behind the lid */}
      <circle cx="14" cy="12" r="4.2" fill="url(#chestGold)" stroke="#8a641f" strokeWidth="0.8" />
      <circle cx="24" cy="7" r="4.6" fill="url(#chestGold)" stroke="#8a641f" strokeWidth="0.8" />
      <circle cx="34" cy="10" r="4" fill="url(#chestGold)" stroke="#8a641f" strokeWidth="0.8" />
      <circle cx="43" cy="14" r="3.6" fill="url(#chestGold)" stroke="#8a641f" strokeWidth="0.8" />
      {/* Chest body */}
      <rect x="6" y="22" width="44" height="20" rx="3" fill="url(#chestWood)" stroke="#5a1520" strokeWidth="1.2" />
      <rect x="6" y="29" width="44" height="3" fill="#5a1520" opacity="0.5" />
      {/* Open lid, angled back */}
      <path d="M6 22 C6 12 12 6 28 6 C44 6 50 12 50 22 Z" fill="url(#chestLid)" stroke="#7a1a15" strokeWidth="1.2" />
      <path d="M10 21 C10 13.5 15 9.5 28 9.5 C41 9.5 46 13.5 46 21" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.4" />
      {/* Lock plate */}
      <rect x="24" y="20" width="8" height="9" rx="1.5" fill="url(#chestGold)" stroke="#8a641f" strokeWidth="0.8" />
      <circle cx="28" cy="24" r="1.4" fill="#5a3a12" />
    </svg>
  )
}

/** A vinyl record — grooved black disc + red "AMY" label. The hero
 *  composition already has a record baked into its single flattened
 *  artwork (no independently-layered source exists), so this is a
 *  synthetic companion accent nestled beside it, not a re-animation of the
 *  real one — genuinely interactive (hover-spin + pointer parallax) rather
 *  than pretending to move baked-in pixels. */
export function VinylRecord({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className}>
      <defs>
        <radialGradient id="vinylSheen" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#4a4a4a" />
          <stop offset="55%" stopColor="#161616" />
          <stop offset="100%" stopColor="#050505" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="31" fill="url(#vinylSheen)" stroke="#000" strokeWidth="0.5" />
      {[26, 21, 16, 11].map((r) => (
        <circle key={r} cx="32" cy="32" r={r} fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="0.6" />
      ))}
      <circle cx="32" cy="32" r="9" fill="#b02a3a" stroke="#7a1a26" strokeWidth="0.8" />
      <text x="32" y="34.5" textAnchor="middle" fontSize="5" fontWeight="800" fill="#fdf3e8" fontFamily="Sora, sans-serif" letterSpacing="0.5">
        AMY
      </text>
      <circle cx="32" cy="32" r="1.6" fill="#1a1a1a" />
    </svg>
  )
}

export function GoldSwallow({ size = 44, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={className}>
      <path
        d="M24 20c-4-7-12-10-20-8 5 2 8 5 9 9-5 0-9 3-11 7 5-1 9 0 12 3-3 3-4 7-3 11 3-3 6-4 9-3-1 5 1 9 5 11-1-4 0-8 3-11 3 3 7 4 11 3-4-2-6-5-6-9 4 1 8 0 11-3-4-1-8-4-9-8 4-1 7-4 9-8-6 1-11 5-13 10-2-3-4-6-7-4Z"
        fill="#c9a15a"
      />
    </svg>
  )
}
