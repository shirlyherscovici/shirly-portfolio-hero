/** Prefixes a root-relative /public path with Vite's configured `base`
 *  (set to '/shirly-portfolio/' in vite.config.ts for the GitHub
 *  Pages project-site deploy at
 *  https://shirlyherscovici.github.io/shirly-portfolio/).
 *
 *  Vite's `base` only rewrites bundler-processed imports and the
 *  `%BASE_URL%` placeholder in index.html — a plain string literal like
 *  `src="/assets/foo.png"` pointing into /public is NOT touched, so every
 *  such reference in this project is wrapped in this helper instead. */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}
