import { Download, Github, Terminal, LayoutTemplate, Zap, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

const GITHUB_REPO = 'SANDRO00O/ConsoleFlow-mobile';
const GITHUB_API = `https://api.github.com/repos/${GITHUB_REPO}/releases`;
const GITHUB_RAW = `https://raw.githubusercontent.com/${GITHUB_REPO}/master`;
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

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

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loadingReleases, setLoadingReleases] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(GITHUB_API)
      .then(res => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setReleases(data);
        }
        setLoadingReleases(false);
      })
      .catch(err => {
        console.error("Failed to fetch releases:", err);
        setFetchError(true);
        setLoadingReleases(false);
      });
  }, []);

  const latestStableIndex = releases.findIndex(r => !r.prerelease);
  const latestRelease = latestStableIndex >= 0 ? releases[latestStableIndex] : releases[0];

  const downloadUrl = latestRelease?.assets?.find(a => a.name.endsWith('.apk'))?.browser_download_url
    ?? latestRelease?.html_url
    ?? `${GITHUB_URL}/releases/latest`;

  const badgeLabel = releases.length > 0
    ? `${latestRelease?.tag_name ?? ''} Release`
    : loadingReleases ? 'Loading...' : 'No releases';

  return (
    <main className="pt-32 pb-20 px-6 min-h-screen">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            {badgeLabel}
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
              href={downloadUrl}
              className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-200 transition-colors active:bg-gray-300 w-full sm:w-auto justify-center"
            >
              <Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              Download APK
            </a>
            <a 
              href={GITHUB_URL}
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
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory custom-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
          {[1, 2, 3, 4].map((num, i) => (
            <FadeIn key={num} delay={0.2 + (i * 0.1)} className="flex-none w-[75%] sm:w-auto snap-center">
              <div className="relative mx-auto border-4 border-white/10 rounded-2xl overflow-hidden bg-[#050505] aspect-[9/19.5] shadow-2xl shadow-black/50 group">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full z-20"></div>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/10 rounded-full z-20"></div>
                <img 
                  src={`${GITHUB_RAW}/screenshots/${num}.jpg`}
                  alt={`App Interface ${num}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const parent = e.currentTarget.parentElement;
                    if (parent) parent.style.display = 'none';
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
          ) : fetchError ? (
            <div className="text-center text-gray-500 font-mono text-sm">
              Could not load releases.{' '}
              <a href={`${GITHUB_URL}/releases`} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-white underline">
                View on GitHub
              </a>
            </div>
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
  );
}
