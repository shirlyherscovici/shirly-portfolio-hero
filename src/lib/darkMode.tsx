import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const DARK_MODE_KEY = 'portfolio-dark-mode'

interface DarkModeState {
  dark: boolean
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeState>({ dark: false, toggle: () => {} })

/** Site-wide dark mode — a single source of truth shared by the homepage
 *  shell (PortfolioHub) and every case study modal (they're siblings in
 *  App.tsx's tree, not parent/child, so this has to live above both
 *  rather than as PortfolioHub's own local state). Persisted so a
 *  visitor's choice survives a reload. */
export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem(DARK_MODE_KEY) === '1'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(DARK_MODE_KEY, dark ? '1' : '0')
    } catch {
      /* private-browsing / storage disabled — dark mode just won't persist */
    }
  }, [dark])

  return <DarkModeContext.Provider value={{ dark, toggle: () => setDark((d) => !d) }}>{children}</DarkModeContext.Provider>
}

export function useDarkMode() {
  return useContext(DarkModeContext)
}
