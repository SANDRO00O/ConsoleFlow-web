import { Download, Github, Terminal, LayoutTemplate, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

interface ReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface Release {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
}

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function App() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loadingReleases, setLoadingReleases] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/repos/SANDRO00O/ConsoleFlow-mobile/releases')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setReleases(data);
        }
        setLoadingReleases(false);
      })
      .catch(err => {
        console.error("Failed to fetch releases:", err);
        setLoadingReleases(false);
      });
  }, []);

  const latestStableIndex = releases.findIndex(r => !r.prerelease);

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 font-sans selection:bg-white/20 selection:text-white overflow-x-hidden relative">
      
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
          {/* Logo Pill */}
          <div className="flex items-center h-12 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full pl-2 pr-5 shadow-lg shadow-black/20">
            <div className="w-9 h-9 flex items-center justify-center">
              <img 
                src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/app/src/main/res/drawable/ic_splashscreen.png" 
                alt="ConsoleFlow Logo" 
                className="w-full h-full object-contain scale-[1.6]"
              />
            </div>
            <span className="text-white font-semibold tracking-tight text-base z-10 ml-1">ConsoleFlow</span>
          </div>
          
          {/* GitHub Pill */}
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

      <main className="pt-32 pb-20 px-6">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              {releases.length > 0 
                ? `${releases[latestStableIndex]?.tag_name || releases[0]?.tag_name} Release` 
                : 'Loading...'}
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
              Desktop debugging.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
                On your mobile.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              A lightweight, developer-focused Android web browser that automatically injects the Eruda console into every page.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href={releases.length > 0 
                  ? (releases[latestStableIndex]?.assets?.find(a => a.name.endsWith('.apk'))?.browser_download_url || releases[latestStableIndex]?.html_url || releases[0]?.html_url) 
                  : 'https://github.com/SANDRO00O/ConsoleFlow-mobile/releases/latest'}
                className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors active:bg-gray-300 w-full sm:w-auto justify-center"
              >
                <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                Download APK
              </a>
              <a 
                href="https://github.com/SANDRO00O/ConsoleFlow-mobile"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-colors active:bg-white/20 w-full sm:w-auto justify-center"
              >
                <Github className="w-5 h-5" />
                Source Code
              </a>
            </div>
          </FadeIn>
        </div>



        {/* Screenshots */}
        <div className="max-w-5xl mx-auto mt-32">
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 text-center">Interface</h2>
          </FadeIn>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-3 snap-x snap-mandatory custom-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
            {[1, 2, 3].map((num, i) => (
              <FadeIn key={num} delay={0.2 + (i * 0.1)} className="flex-none w-[75%] sm:w-auto snap-center">
                <div className="relative mx-auto border-4 border-white/10 rounded-2xl overflow-hidden bg-[#050505] aspect-[9/19.5] shadow-2xl shadow-black/50 group">
                  {/* Wireframe Top Notch/Speaker */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full z-20"></div>
                  {/* Wireframe Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/10 rounded-full z-20"></div>
                  
                  <img 
                    src={`https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/${num}.jpg`} 
                    alt={`App Interface ${num}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.currentTarget.parentElement!.style.display = 'none';
                    }}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* Features Bento Grid */}
        <div className="max-w-5xl mx-auto mt-32">
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 text-center">Core Features</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FadeIn delay={0.2} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors md:col-span-2">
              <Terminal className="w-6 h-6 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">Auto-Injected Console</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Eruda is automatically injected into every webpage. Inspect DOM elements, view console logs, check network requests, and execute JavaScript directly from your phone.
              </p>
            </FadeIn>
            
            <FadeIn delay={0.3} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <LayoutTemplate className="w-6 h-6 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">Desktop Mode</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                One-tap switch to a real desktop user agent and viewport for accurate testing.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
              <Shield className="w-6 h-6 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">Smart Interception</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Bypasses interception for major search engines to prevent annoying CAPTCHAs.
              </p>
            </FadeIn>

            <FadeIn delay={0.5} className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors md:col-span-2">
              <Zap className="w-6 h-6 text-gray-300 mb-6" />
              <h3 className="text-xl font-semibold text-white mb-3">Custom JS Injection</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                Add your own custom JavaScript to be executed automatically on every page load. Tailor your debugging environment to your exact needs.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Update Log */}
        <div className="max-w-4xl mx-auto mt-32">
          <FadeIn delay={0.1}>
            <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 text-center">Update Log</h2>
          </FadeIn>
          
          <div className="space-y-6">
            {loadingReleases ? (
              <div className="text-center text-gray-500 font-mono text-sm animate-pulse">Loading releases...</div>
            ) : releases.length > 0 ? (
              releases.map((release, i) => (
                <FadeIn key={release.id} delay={0.2 + (i * 0.1)}>
                  <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-xl font-semibold text-white flex flex-wrap items-center gap-3">
                        {release.name || release.tag_name}
                        {release.prerelease ? (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-yellow-500/40 text-yellow-500 bg-yellow-500/10">
                            Pre-release
                          </span>
                        ) : i === latestStableIndex ? (
                          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-green-500/40 text-green-500 bg-green-500/10">
                            Latest
                          </span>
                        ) : null}
                        <span className="text-xs font-mono px-2.5 py-1 rounded-md bg-white/10 text-gray-300">
                          {new Date(release.published_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </h3>
                      <a 
                        href={release.html_url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5"
                      >
                        <Github className="w-4 h-4" /> View Release
                      </a>
                    </div>
                    <div className="markdown-body text-gray-400 text-sm leading-relaxed break-words overflow-hidden">
                      <Markdown>{release.body}</Markdown>
                    </div>
                  </div>
                </FadeIn>
              ))
            ) : (
              <div className="text-center text-gray-500 font-mono text-sm">No releases found.</div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-8">
          <img 
            src="https://raw.githubusercontent.com/SANDRO00O/ConsoleFlow-mobile/master/screenshots/banner.png" 
            alt="ConsoleFlow Banner" 
            className="w-56 sm:w-64 object-contain drop-shadow-2xl opacity-90 hover:opacity-100 transition-opacity"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <p className="text-gray-500 text-sm font-mono">
              © {new Date().getFullYear()} ConsoleFlow. MIT License.
            </p>
            <div className="text-gray-500 text-sm font-mono">
              Built by <a href="https://karrarnazim.space" target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-white/60">Karrar Nazim</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
