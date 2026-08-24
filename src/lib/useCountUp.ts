import { useEffect, useState } from 'react'

/** Animates a numeric value from 0 up to the number embedded in `value`
 *  (e.g. "+74%" → counts 0→74, "+2.3M" → counts 0.0→2.3) on mount, keeping
 *  every non-numeric character (sign, decimal point, suffix) exactly where
 *  it was in the source string. Triggered by `active` flipping true (so
 *  callers can gate it on the modal actually being open/mounted).
 *
 *  Deliberately has NO "already started" ref guard: under React 18
 *  StrictMode's dev-only double-invoke (mount → cleanup → mount), a ref set
 *  during the first invocation survives into the second, so a guard like
 *  that makes the second (real) mount silently skip scheduling its frame —
 *  the animation would fire once, get cancelled by the first cleanup, and
 *  then never run again, freezing on 0. The effect's own cleanup already
 *  cancels any in-flight rAF loop, which is all that's needed to make the
 *  double-invoke harmless. */
export function useCountUp(value: string, active = true, duration = 1400) {
  const [display, setDisplay] = useState(() => zeroed(value))

  useEffect(() => {
    if (!active) return

    const match = value.match(/-?\d+(\.\d+)?/)
    if (!match) {
      setDisplay(value)
      return
    }
    const target = parseFloat(match[0])
    const decimals = match[1] ? match[1].length - 1 : 0
    const prefix = value.slice(0, match.index)
    const suffix = value.slice((match.index ?? 0) + match[0].length)

    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const current = target * eased
      setDisplay(`${prefix}${current.toFixed(decimals)}${suffix}`)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, active, duration])

  return display
}

function zeroed(value: string): string {
  const match = value.match(/-?\d+(\.\d+)?/)
  if (!match) return value
  const decimals = match[1] ? match[1].length - 1 : 0
  const prefix = value.slice(0, match.index)
  const suffix = value.slice((match.index ?? 0) + match[0].length)
  return `${prefix}${(0).toFixed(decimals)}${suffix}`
}
