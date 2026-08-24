/** Tiny Web-Audio sound-effect synth.
 *
 *  There are no bundled audio files in this project (no `/assets/*.mp3`), so
 *  rather than wiring up `new Audio('/assets/amy-sound.mp3')` against a file
 *  that 404s and silently never plays, these effects are synthesized on the
 *  fly with oscillators — a real, always-available sound with zero asset
 *  weight. Swap in real recordings later by pointing these at `new Audio(...)`
 *  instead, the call sites (`playGuitarPluck()` / `playArcadeBlip()`) won't
 *  need to change.
 */

let ctx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!ctx) ctx = new Ctor()
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function tone(c: AudioContext, dest: AudioNode, freq: number, offset: number, duration: number, type: OscillatorType, peak: number) {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, c.currentTime + offset)
  gain.gain.setValueAtTime(0, c.currentTime + offset)
  gain.gain.linearRampToValueAtTime(peak, c.currentTime + offset + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + offset + duration)
  osc.connect(gain).connect(dest)
  osc.start(c.currentTime + offset)
  osc.stop(c.currentTime + offset + duration + 0.03)
}

/** A short, warm plucked-chord riff — Amy card's hover/click accent. */
export function playGuitarPluck() {
  const c = getCtx()
  if (!c) return
  const master = c.createGain()
  master.gain.value = 0.16
  master.connect(c.destination)
  ;[392.0, 493.88, 587.33, 783.99].forEach((freq, i) => tone(c, master, freq, i * 0.035, 0.55, 'sawtooth', 1))
}

/** A rising 8-bit arpeggio — the arcade card's hover accent. */
export function playArcadeBlip() {
  const c = getCtx()
  if (!c) return
  const master = c.createGain()
  master.gain.value = 0.14
  master.connect(c.destination)
  ;[523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => tone(c, master, freq, i * 0.055, 0.1, 'square', 1))
}
