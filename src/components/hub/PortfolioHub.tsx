import { motion } from 'framer-motion'
import { Download, Mail, PenTool, Film, Sparkles, Code2, Moon, Sun } from 'lucide-react'
import { AmyModule, GalgalatzModule, AiModule, MotionModule } from './ProjectModules'
import { useDarkMode } from '../../lib/darkMode'
import type { ProjectId } from '../../types'
import { asset } from '../../lib/asset'

const NAV_ITEMS = [
  { label: 'Design Strategy', icon: PenTool, glow: 'rgba(201,161,90,0.6)' },
  { label: 'Motion Development', icon: Film, glow: 'rgba(255,95,160,0.6)' },
  { label: 'Front End Development', icon: Code2, glow: 'rgba(79,216,255,0.6)' },
  { label: 'AI Creation', icon: Sparkles, glow: 'rgba(185,140,255,0.6)' },
]

interface PortfolioHubProps {
  onOpen: (id: ProjectId) => void
  /** The project whose modal is currently open, if any — its own card is
   *  hidden (not unmounted) while open, so Framer Motion's shared
   *  `layoutId` can animate the card smoothly morphing into the modal
   *  panel instead of a generic dialog popping up disconnected from it. */
  openId: ProjectId | null
}

export default function PortfolioHub({ onOpen, openId }: PortfolioHubProps) {
  // Whole-site dark mode — shared with the case study modals via context
  // (App.tsx renders them as PortfolioHub's siblings, not children, so
  // this can't live as local state here anymore now that Amy and After
  // Effects also follow it).
  const { dark, toggle: setDark } = useDarkMode()

  return (
    <div className={`relative min-h-screen overflow-x-clip flex flex-col transition-colors duration-500 ${dark ? 'bg-cine' : 'bg-hub'}`}>
      {/* Sticky wordmark header — brought back at the user's explicit
          request after the mockup-fidelity pass removed it (the mockup's
          own homepage shot has none, but she confirmed she wants it kept
          regardless — it stays pinned above everything, z-50, so no card
          art can ever obscure it). */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          dark ? 'bg-[#0e0f18]/85 border-white/10' : 'bg-[#fdfaf7]/85 border-pearl-ink/5'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-white/80 border border-white shadow-pearl-sm flex items-center justify-center font-display font-black text-[11px] text-pearl-red">
              SH
            </span>
            <span className={`text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${dark ? 'text-white/70 group-hover:text-white' : 'text-pearl-sub group-hover:text-pearl-ink'}`}>
              Shirly Herscovici&apos;s Portfolio
            </span>
          </a>
          <div className="flex items-center gap-1.5">
            {/* Dark-mode toggle — a game-menu-style dark background with
                real depth (soft glows, not a flat color swap), per
                explicit request. */}
            <button
              type="button"
              onClick={setDark}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={dark}
              className={`flex items-center justify-center w-8 h-8 rounded-full border transition-colors ${
                dark ? 'border-white/15 text-white/80 hover:bg-white/10' : 'border-transparent text-pearl-sub hover:border-pearl-sub/20 hover:text-pearl-ink'
              }`}
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <a
              href={asset('/resume.pdf')}
              download
              className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide transition-colors px-3 py-1.5 rounded-full border border-transparent ${
                dark ? 'text-white/70 hover:text-white hover:border-white/15' : 'text-pearl-sub hover:text-pearl-ink hover:border-pearl-sub/20'
              }`}
            >
              <Download size={12} /> <span className="hidden sm:inline">Resume</span>
            </a>
          </div>
        </div>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-4">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${dark ? 'text-white/60' : 'text-pearl-sub'}`}
        >
          Portfolio / Works
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className={`mt-2 font-display font-extrabold text-2xl sm:text-3xl lg:text-[2rem] tracking-tight transition-colors duration-500 ${dark ? 'text-white' : 'text-pearl-ink'}`}
        >
          Visual, Motion, Game UI &amp; Creative AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`mt-1.5 text-[13px] sm:text-sm font-medium max-w-lg transition-colors duration-500 ${dark ? 'text-white/60' : 'text-pearl-sub'}`}
        >
          Senior creative designer turning visual direction, motion and generative AI into interactive game-world experiences.
        </motion.p>
      </section>

      <main className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          // Rows are auto-height now (was lg:grid-rows-2, which forced
          // Amy/Galgalatz into two exactly-equal halves of the column) —
          // combined with the two cards' own different min-heights below,
          // this reads as an intentional staggered/masonry grid instead
          // of a rigid aligned one, per explicit request.
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_0.95fr_0.95fr] lg:auto-rows-auto gap-3 sm:gap-4"
        >
          <AmyModule onClick={() => onOpen('amy')} hidden={openId === 'amy'} />
          <AiModule onClick={() => onOpen('ai-rescue')} hidden={openId === 'ai-rescue'} />
          <MotionModule onClick={() => onOpen('people-motion')} hidden={openId === 'people-motion'} />
          <GalgalatzModule onClick={() => onOpen('galgalatz')} hidden={openId === 'galgalatz'} />
        </motion.div>
      </main>

      {/* Footer — a flush, full-width dark bar directly under the grid (not
          a floating inset/rounded HUD panel) — matches the mockup exactly:
          sharp corners, no side margins, sits in normal document flow
          rather than fixed-over-content. */}
      <footer className="relative z-30 bg-[#0B0C10]">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-8 py-4 sm:py-5 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4">
          <div className="text-center lg:text-left">
            <p className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight">SHIRLY HERSCOVICI</p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60 mt-0.5">Visual, Motion &amp; Front-End Designer</p>
          </div>

          <nav className="flex items-center gap-1.5 sm:gap-2.5 flex-wrap justify-center">
            {NAV_ITEMS.map(({ label, icon: Icon, glow }) => (
              <span
                key={label}
                style={{ ['--glow' as string]: glow }}
                className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors px-2 py-1.5 rounded-full hover:bg-white/10 cursor-default group/nav"
              >
                <Icon size={12} className="shrink-0 transition-[filter] duration-300 [filter:drop-shadow(0_0_0_transparent)] group-hover/nav:[filter:drop-shadow(0_0_6px_var(--glow))]" />
                <span className="hidden md:inline leading-tight">{label}</span>
              </span>
            ))}
          </nav>

          {/* Glowing purple pill, per spec */}
          <motion.a
            href="mailto:shirly3212@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-display font-bold uppercase tracking-wide shadow-[0_0_24px_rgba(139,92,246,0.55),0_0_50px_rgba(139,92,246,0.25)] shrink-0"
          >
            <Mail size={13} /> Let&apos;s Create Magic <span aria-hidden>→</span>
          </motion.a>
        </div>
      </footer>
    </div>
  )
}
