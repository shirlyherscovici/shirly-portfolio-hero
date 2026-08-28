import { motion } from 'framer-motion'
import { Download, Mail, PenTool, Film, Sparkles, Code2, Moon, Sun, Gamepad2, ArrowRight } from 'lucide-react'
import { AmyModule, GalgalatzModule, AiModule, MotionModule } from './ProjectModules'
import HeroDiorama from './HeroDiorama'
import { useDarkMode } from '../../lib/darkMode'
import type { ProjectId } from '../../types'
import { asset } from '../../lib/asset'

const NAV_ITEMS = [
  { label: 'Design Strategy', icon: PenTool, glow: 'rgba(201,161,90,0.6)' },
  { label: 'Motion Development', icon: Film, glow: 'rgba(255,95,160,0.6)' },
  { label: 'Front End Development', icon: Code2, glow: 'rgba(79,216,255,0.6)' },
  { label: 'AI Creation', icon: Sparkles, glow: 'rgba(185,140,255,0.6)' },
]

// Top-nav links — anchor to real sections that already exist on the page
// rather than inventing new ones. "About" jumps back to the hero's own
// intro copy (the closest thing this single-page portfolio has to an About
// blurb); "Contact" jumps to the footer's real mailto CTA; "Resume"
// downloads the real resume file directly instead of scrolling.
const HEADER_LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#top' },
  { label: 'Contact', href: '#contact' },
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
      {/* Immersive dark environment behind the hero + top of the grid — the
          supplied hero-background artwork (a real image, not a CSS
          gradient recreation), full-bleed and cover-fit, with a bottom
          fade so it blends into the page's own dark background rather than
          ending on a hard edge. Dark mode only: the image is a night/cosmic
          scene that would fight the pearl-light palette, so light mode
          keeps its existing plain background untouched. */}
      {dark && (
        <div className="absolute inset-x-0 top-0 h-[820px] sm:h-[900px] lg:h-[980px] z-0 pointer-events-none overflow-hidden" aria-hidden>
          <img src={asset('/assets/hub/hero-background.png')} alt="" className="absolute inset-0 w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0e0f18]" />
        </div>
      )}

      {/* Header — transparent/integrated with the hero (no heavy solid
          separating bar): backdrop-blur for legibility over the background
          art, but no opaque fill of its own in dark mode. */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-500 ${
          dark ? 'bg-[#0e0f18]/25 border-white/10' : 'bg-[#fdfaf7]/85 border-pearl-ink/5'
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 py-3.5 sm:py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-full bg-white/80 border border-white shadow-pearl-sm flex items-center justify-center font-display font-black text-[11px] text-pearl-red shrink-0">
              SH
            </span>
            <span className="leading-tight">
              <span className={`block text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${dark ? 'text-white group-hover:text-white' : 'text-pearl-ink'}`}>
                Shirly Herscovici
              </span>
              <span className={`block text-[9px] font-semibold uppercase tracking-[0.14em] transition-colors ${dark ? 'text-white/50' : 'text-pearl-sub'}`}>
                Game UI / Motion Designer
              </span>
            </span>
          </a>
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-5 lg:gap-6">
              {HEADER_LINKS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    dark ? 'text-white/65 hover:text-white' : 'text-pearl-sub hover:text-pearl-ink'
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
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
        </div>
      </header>

      <section id="top" className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-10 pt-8 sm:pt-10 lg:pt-12 pb-8 sm:pb-10 scroll-mt-20">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-6">
          {/* Left — copy, ~45% width on desktop. Left-aligned, compact,
              premium; no project art duplicated here (that used to live in
              the old centered hero) — the diorama on the right carries the
              "this is a game-world designer" signal instead. */}
          <div className="lg:w-[45%] min-w-0 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`flex items-center justify-center lg:justify-start gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.22em] transition-colors duration-500 ${dark ? 'text-white/60' : 'text-pearl-sub'}`}
            >
              <Gamepad2 size={13} className={dark ? 'text-cine-magenta' : 'text-pearl-red'} />
              Shirly Herscovici · Game UI / Motion Designer
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className={`mt-4 font-display font-black text-[2.4rem] sm:text-5xl lg:text-[3.4rem] xl:text-[3.75rem] leading-[1.03] tracking-tight transition-colors duration-500 ${dark ? 'text-white' : 'text-pearl-ink'}`}
            >
              Playable Interfaces.
              <br />
              Motion Systems.
              <br />
              <span className={dark ? 'text-gradient-cine' : 'text-pearl-red'}>Cinematic Experiences.</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`mt-4 text-sm sm:text-base font-medium max-w-md mx-auto lg:mx-0 transition-colors duration-500 ${dark ? 'text-white/60' : 'text-pearl-sub'}`}
            >
              Game UI/UX · Motion Design · Interactive Prototyping · Creative AI
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-7 flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              <motion.a
                href="#work"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#6d28d9] text-white text-xs font-display font-bold uppercase tracking-wide shadow-[0_0_24px_rgba(139,92,246,0.5),0_0_50px_rgba(139,92,246,0.22)]"
              >
                View Featured Work <ArrowRight size={14} />
              </motion.a>
              <motion.a
                href={asset('/resume.pdf')}
                download
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-full border text-xs font-display font-bold uppercase tracking-wide transition-colors ${
                  dark ? 'border-white/25 text-white hover:bg-white/10' : 'border-pearl-ink/20 text-pearl-ink hover:bg-pearl-ink/5'
                }`}
              >
                <Download size={13} /> Resume
              </motion.a>
            </motion.div>
          </div>

          {/* Right — the real supplied diorama artwork, floating free (no
              card/container), ~52% of this row's width so it lands in the
              ~38–46% of total page width the brief calls for. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[52%] flex justify-center lg:justify-end"
          >
            <HeroDiorama />
          </motion.div>
        </div>
      </section>

      <main id="work" className="relative z-10 mx-auto max-w-[1400px] w-full px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8 flex-1 scroll-mt-20">
        {/* Asymmetric bento — matches the approved mockup: Galgalatz (the
            strongest, most game-native project) is the big featured card
            spanning the full left column; Motion is a wide banner top-
            right; AI and Amy are the two smaller cards bottom-right. Real
            projects, real assets, real click-through — only the grid
            proportions and card copy changed, not the underlying
            case studies. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-[auto_auto] gap-3 sm:gap-4"
        >
          <div className="lg:row-span-2">
            <GalgalatzModule onClick={() => onOpen('galgalatz')} hidden={openId === 'galgalatz'} featured />
          </div>
          <MotionModule onClick={() => onOpen('people-motion')} hidden={openId === 'people-motion'} dark={dark} wide />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <AiModule onClick={() => onOpen('ai-rescue')} hidden={openId === 'ai-rescue'} compact />
            <AmyModule onClick={() => onOpen('amy')} hidden={openId === 'amy'} dark={dark} compact />
          </div>
        </motion.div>
      </main>

      {/* Footer — a slim, flush strip directly under the grid rather than a
          heavy standalone black slab: a plain top border instead of a hard
          color break, so it reads as the tail end of the same dark
          interface rather than a separate section cutting the composition. */}
      <footer id="contact" className="relative z-30 bg-[#0B0C10] border-t border-white/[0.06] scroll-mt-20">
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
