import { motion } from 'framer-motion'
import { Download, Mail, PenTool, Film, Sparkles, Code2 } from 'lucide-react'
import { AmyModule, GalgalatzModule, AiModule, MotionModule } from './ProjectModules'
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
  return (
    <div className="relative min-h-screen bg-hub overflow-x-clip">
      {/* Sticky wordmark header — pinned above everything (z-50) so no card
          art (e.g. Amy's figure breaking her card's top edge) can ever
          obscure it, regardless of how far a breakout element reaches. */}
      <header className="sticky top-0 z-50 bg-[#fdfaf7]/85 backdrop-blur-xl border-b border-pearl-ink/5">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-white/80 border border-white shadow-pearl-sm flex items-center justify-center font-display font-black text-[11px] text-pearl-red">
              SH
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-pearl-sub group-hover:text-pearl-ink transition-colors">
              Shirly Herscovici&apos;s Portfolio
            </span>
          </a>
          <a
            href={asset('/resume.pdf')}
            download
            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-pearl-sub hover:text-pearl-ink transition-colors px-3 py-1.5 rounded-full border border-transparent hover:border-pearl-sub/20"
          >
            <Download size={12} /> <span className="hidden sm:inline">Resume</span>
          </a>
        </div>
      </header>

      {/* Hero — restrained eyebrow, the modules carry the visual weight.
          Generous top clearance (pt-20/24) so foreground card art that
          breaks its own card's top edge (Amy's figure, etc.) has room to
          breathe before it ever nears this text. */}
      <section id="top" className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-6">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-pearl-sub"
        >
          Portfolio / Works
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-2 font-display font-extrabold text-2xl sm:text-3xl lg:text-[2rem] text-pearl-ink tracking-tight"
        >
          Visual, Motion, Game UI &amp; Creative AI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-1.5 text-[13px] sm:text-sm font-medium text-pearl-sub max-w-lg"
        >
          Senior creative designer turning visual direction, motion and generative AI into interactive game-world experiences.
        </motion.p>
      </section>

      {/* Four project modules — asymmetric collage, faithful to the reference */}
      <main className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 pb-32 sm:pb-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_0.95fr_0.95fr] lg:grid-rows-2 gap-4 sm:gap-5 mt-4 sm:mt-6"
        >
          <AmyModule onClick={() => onOpen('amy')} hidden={openId === 'amy'} />
          <AiModule onClick={() => onOpen('ai-rescue')} hidden={openId === 'ai-rescue'} />
          <MotionModule onClick={() => onOpen('people-motion')} hidden={openId === 'people-motion'} />
          <GalgalatzModule onClick={() => onOpen('galgalatz')} hidden={openId === 'galgalatz'} />
        </motion.div>
      </main>

      {/* Footer — a floating pitch-black HUD bar, inset from the page edges */}
      {/* Persistent floating bottom bar — fixed (not just sticky-at-the-end),
          so it's visible the entire time someone browses the homepage, not
          only once they scroll all the way down. `<main>` below carries
          matching bottom padding so this bar never covers the last row of
          cards. */}
      <footer className="fixed inset-x-0 bottom-0 z-30 px-4 sm:px-6 lg:px-10 pb-3 sm:pb-4">
        <div className="mx-auto max-w-[1400px] rounded-[28px] bg-[#0B0C10]/95 backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
          <div className="px-5 sm:px-8 py-4 sm:py-5 flex flex-col lg:flex-row items-center lg:items-center justify-between gap-4">
            <div className="text-center lg:text-left">
              <p className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight">SHIRLY HERSCOVICI</p>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-white/60 mt-0.5">Visual, Motion &amp; AI Art Director</p>
            </div>

            <nav className="hidden xl:flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {NAV_ITEMS.map(({ label, icon: Icon, glow }) => (
                <span
                  key={label}
                  style={{ ['--glow' as string]: glow }}
                  className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors px-2.5 py-1.5 rounded-full hover:bg-white/10 cursor-default group/nav"
                >
                  <Icon size={12} className="transition-[filter] duration-300 [filter:drop-shadow(0_0_0_transparent)] group-hover/nav:[filter:drop-shadow(0_0_6px_var(--glow))]" />
                  <span className="hidden md:inline">{label}</span>
                </span>
              ))}
            </nav>

            {/* Glowing purple pill, per spec */}
            <motion.a
              href="mailto:shirly3212@gmail.com"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-display font-bold uppercase tracking-wide shadow-[0_0_24px_rgba(139,92,246,0.55),0_0_50px_rgba(139,92,246,0.25)]"
            >
              <Mail size={13} /> Let&apos;s Create Magic <span aria-hidden>→</span>
            </motion.a>
          </div>
        </div>
      </footer>
    </div>
  )
}
