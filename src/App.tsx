import { Github, Sparkles } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import type { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[#050505] text-gray-200 font-sans selection:bg-white/15 selection:text-white">
      <div className="site-backdrop pointer-events-none absolute inset-0 overflow-hidden">
        <div className="site-grid absolute inset-0 opacity-[0.18]" />
        <div className="site-vignette absolute inset-0" />
        <div className="site-orb site-orb-a" />
        <div className="site-orb site-orb-b" />
        <div className="site-orb site-orb-c" />
      </div>

      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="glass-pill group flex h-12 items-center gap-3 rounded-full border border-white/10 bg-black/45 px-2 pr-5 shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white/[0.06]"
            aria-label="ConsoleFlow home"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10">
              <img
                src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/app/src/main/res/drawable/ic_splashscreen.png"
                alt="ConsoleFlow Logo"
                className="h-full w-full scale-[1.6] object-contain"
              />
            </span>
            <img
              src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/banner.svg"
              alt="ConsoleFlow"
              className="h-4 w-auto object-contain opacity-95 transition-opacity group-hover:opacity-100 sm:h-5"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <span className="glass-pill inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/35 px-4 text-xs text-gray-300 backdrop-blur-xl">
              <Sparkles className="h-4 w-4 text-cyan-300" />
              Android · WebView · Eruda
            </span>

            <a
              href="https://github.com/SANDRO00O/ConsoleFlow-mobile"
              target="_blank"
              rel="noreferrer"
              className="glass-pill inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-5 text-sm font-medium text-gray-200 backdrop-blur-xl transition-colors hover:bg-white/10"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>

          <a
            href="https://github.com/SANDRO00O/ConsoleFlow-mobile"
            target="_blank"
            rel="noreferrer"
            className="glass-pill inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-black/45 px-4 text-sm font-medium text-gray-200 backdrop-blur-xl transition-colors hover:bg-white/10 md:hidden"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </nav>

      <main className="relative z-10 pt-24">{children}</main>

      <footer className="relative z-10 mt-16 border-t border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <img
                src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/banner.svg"
                alt="ConsoleFlow Banner"
                className="h-7 w-auto object-contain opacity-90"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <p className="max-w-xl text-sm leading-6 text-gray-500">
                ConsoleFlow is a lightweight Android browser built for developers who want to inspect pages, run scripts, and keep the debugging loop inside the phone.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <span>© {new Date().getFullYear()} ConsoleFlow. MIT License.</span>
              <span className="hidden text-white/20 md:inline">|</span>
              <Link to="/faq" className="transition-colors hover:text-white">
                FAQ
              </Link>
              <Link to="/privacy" className="transition-colors hover:text-white">
                Privacy Policy
              </Link>
              <span className="hidden text-white/20 md:inline">|</span>
              <span>
                Built by{' '}
                <a
                  href="https://karrarnazim.space"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                >
                  Karrar Nazim
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
