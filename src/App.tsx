import { Github } from 'lucide-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative flex flex-col">
      {/* Dreamy Blurry Gradient Background */}
      <div 
        className="absolute top-0 left-0 w-full h-[800px] overflow-hidden pointer-events-none select-none z-0"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)', 
          WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' 
        }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-blue-500/30 blur-[100px] animate-blob"></div>
        <div className="absolute top-[10%] right-[-5%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-purple-500/30 blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute top-[20%] left-[15%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] rounded-full bg-cyan-500/20 blur-[100px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-4 w-full z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-5 shadow-lg shadow-black/20 hover:bg-white/5 transition-colors">
            <div className="w-9 h-9 flex items-center justify-center">
              <img 
                src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/app/src/main/res/drawable/ic_splashscreen.png" 
                alt="ConsoleFlow Logo" 
                className="w-full h-full object-contain scale-[1.6]"
              />
            </div>
            <img 
              src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/banner.svg" 
              alt="ConsoleFlow" 
              className="h-4 sm:h-5 w-auto object-contain z-10 ml-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
          
          <a 
            href="https://github.com/SANDRO00O/ConsoleFlow-mobile" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center h-12 gap-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-5 text-gray-400 hover:text-white transition-colors hover:bg-white/10 active:bg-white/20 shadow-lg shadow-black/20 text-sm font-medium"
          >
            <Github className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </nav>

      <div className="flex-grow z-10">
        {children}
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-10 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <img 
            src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/banner.svg" 
            alt="ConsoleFlow Banner" 
            className="w-56 sm:w-64 object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="text-gray-500 text-sm font-mono flex items-center gap-4 flex-wrap justify-center md:justify-start">
              <span>© {new Date().getFullYear()} ConsoleFlow. MIT License.</span>
              <span className="hidden md:inline text-white/20">|</span>
              <Link to="/faq" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">FAQ</Link>
              <Link to="/privacy" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">Privacy Policy</Link>
            </div>
            <div className="text-gray-500 text-sm font-mono text-center md:text-right">
              Built by <a href="https://karrarnazim.space" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">Karrar Nazim</a>
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
