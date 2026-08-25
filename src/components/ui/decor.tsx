/** Small, self-contained decorative glyphs used as floating boundary-
 *  breaking accents throughout the hub and case studies (coins, music
 *  notes, a swallow, a chest, a vinyl disc). Real rendered 3D assets
 *  (supplied by the project owner), not hand-drawn stand-ins — width is
 *  driven by `size`, height follows the asset's own natural aspect ratio. */
import type { CSSProperties } from 'react'
import { asset } from '../../lib/asset'

interface DecorProps {
  size?: number
  className?: string
  style?: CSSProperties
  /** Accepted for call-site compatibility with the old hand-drawn SVGs
   *  (which were recolorable per-theme) — the real rendered assets have a
   *  single fixed finish, so this is intentionally unused now. */
  color?: string
}

export function GoldCoin({ size = 34, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/coin-2.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}

export function MusicNote({ size = 26, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/music-1.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}

export function HeartIcon({ size = 20, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/coin-1.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}

/** No real project asset was supplied for a plain rose — kept as the
 *  original hand-shaded SVG. Currently unused. */
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

export function TreasureChest({ size = 56, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/box.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}

export function VinylRecord({ size = 64, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/disk.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}

export function GoldSwallow({ size = 44, className = '', style }: DecorProps) {
  return <img src={asset('/assets/amy/bird.png')} alt="" className={className} style={{ width: size, height: 'auto', ...style }} />
}
