import { Github } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import type { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[#050505] text-gray-200 font-sans selection:bg-white/15 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#050505]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link
            to="/"
            className="group flex h-12 items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-2 pr-5 transition-colors hover:bg-white/[0.06]"
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

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/SANDRO00O/ConsoleFlow-mobile"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.1]"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
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
                ConsoleFlow is a lightweight Android browser for pages that need inspection, console output, and small testing workflows.
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
