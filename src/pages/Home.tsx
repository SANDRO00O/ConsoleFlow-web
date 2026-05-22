import { Download, Github, Terminal, LayoutTemplate, Zap, Shield, Sparkles, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import type { ComponentType, ReactNode } from 'react';
import Markdown from 'react-markdown';

const GITHUB_REPO = 'SANDRO00O/ConsoleFlow-mobile';
const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;
const API_RELEASES = '/api/releases';

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  prerelease: boolean;
  assets: ReleaseAsset[];
};

type ReleasesResponse = {
  repo: string;
  generatedAt: string;
  latestStable: Release | null;
  releases: Release[];
};

const FadeIn = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function getApkAsset(release: Release | null) {
  return release?.assets?.find((asset) => asset.name.toLowerCase().endsWith('.apk')) ?? null;
}

function ScreenshotCard({
  title,
  subtitle,
  icon: Icon,
  accent,
}: {
  title: string;
  subtitle: string;
  icon: ComponentType<{ className?: string }>;
  accent: string;
}) {
  return (
    <div className="flex-none w-[75%] sm:w-auto snap-center">
      <div className="relative mx-auto border-4 border-white/10 rounded-2xl overflow-hidden bg-[#050505] aspect-[9/19.5] shadow-2xl shadow-black/50 group p-4">
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full z-20"></div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-white/10 rounded-full z-20"></div>
        <div className={`absolute inset-0 opacity-40 blur-3xl ${accent}`}></div>
        <div className="relative z-10 flex h-full flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center justify-between">
            <div className="rounded-xl border border-white/10 bg-black/30 p-3">
              <Icon className="h-6 w-6 text-white" />
            </div>
            <span className="text-[11px] font-mono text-gray-400">Preview</span>
          </div>
          <div className="space-y-3">
            <div className="h-3 w-3/4 rounded-full bg-white/15"></div>
            <div className="h-3 w-5/6 rounded-full bg-white/10"></div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div className="h-16 rounded-xl border border-white/10 bg-black/30"></div>
              <div className="h-16 rounded-xl border border-white/10 bg-black/30"></div>
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/70"></span>
              <span className="text-sm font-semibold text-white">{title}</span>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-gray-400">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReleaseBadge({ label }: { label: string }) {
  return (
    <span className="text-[11px] font-medium px-2 py-0.5 rounded-full border border-white/10 text-gray-300 bg-white/5">
      {label}
    </span>
  );
}

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [latestStable, setLatestStable] = useState<Release | null>(null);
  const [loadingReleases, setLoadingReleases] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [generatedAt, setGeneratedAt] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_RELEASES, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Release API error: ${res.status}`);
        return res.json() as Promise<ReleasesResponse>;
      })
      .then((data) => {
        if (Array.isArray(data.releases)) {
          setReleases(data.releases);
        }
        setLatestStable(data.latestStable ?? null);
        setGeneratedAt(data.generatedAt ?? null);
        setLoadingReleases(false);
      })
      .catch((err) => {
        if ((err as Error).name === 'AbortError') return;
        console.error('Failed to fetch releases:', err);
        setFetchError(true);
        setLoadingReleases(false);
      });

    return () => controller.abort();
  }, []);

  const latestStableIndex = useMemo(() => releases.findIndex((release) => !release.prerelease), [releases]);
  const latestRelease = latestStable ?? (latestStableIndex >= 0 ? releases[latestStableIndex] : releases[0]) ?? null;
  const latestApk = getApkAsset(latestRelease);

  const downloadUrl = '/api/download';

  const latestLabel = latestRelease?.prerelease ? 'Pre-release' : 'Stable';
  const updateCount = releases.length;

  return (
    <main className="pt-32 pb-20 px-6 min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn delay={0.1}>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-mono text-gray-400 mb-6">
            <Sparkles className="h-4 w-4 text-white/70" />
            Cached through Cloudflare Pages
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-[1.1]">
            Desktop debugging.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-gray-600">
              On your mobile.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            A lightweight, developer-focused Android web browser that automatically injects the Eruda console into every page.
          </p>
          <p className="text-xs font-mono text-gray-500">
            Release metadata is fetched from GitHub, while the download endpoint automatically serves the latest stable APK through Cloudflare.
          </p>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
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

        <FadeIn delay={0.4}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-gray-500">
            <ReleaseBadge label={latestLabel} />
            <ReleaseBadge label={`${updateCount} releases tracked`} />
            {latestRelease?.tag_name ? <ReleaseBadge label={`Version ${latestRelease.tag_name}`} /> : null}
          </div>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto mt-32">
        <FadeIn delay={0.1}>
          <h2 className="text-sm font-mono text-gray-500 uppercase tracking-widest mb-8 text-center">Interface</h2>
        </FadeIn>
        <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory custom-scrollbar gap-6 pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
          <ScreenshotCard
            title="Console overlay"
            subtitle="Inspect logs and execute JavaScript with a mobile-friendly panel."
            icon={Terminal}
            accent="bg-blue-500/30"
          />
          <ScreenshotCard
            title="Desktop mode"
            subtitle="Switch user-agent and viewport for cleaner testing."
            icon={LayoutTemplate}
            accent="bg-purple-500/30"
          />
          <ScreenshotCard
            title="Search-safe routing"
            subtitle="Major search engines are handled carefully to reduce friction."
            icon={Shield}
            accent="bg-cyan-500/30"
          />
          <ScreenshotCard
            title="Custom scripts"
            subtitle="Load your own JavaScript for repeatable debugging flows."
            icon={Code2}
            accent="bg-emerald-500/30"
          />
        </div>
      </div>

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
              Bypasses interception for major search engines to reduce annoying CAPTCHA loops.
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
            <>
              {generatedAt ? (
                <div className="text-center text-gray-600 font-mono text-[11px]">Manifest updated {new Date(generatedAt).toLocaleString()}</div>
              ) : null}
              {releases.map((release, i) => (
                <FadeIn key={release.id} delay={0.2 + i * 0.1}>
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
              ))}
            </>
          ) : (
            <div className="text-center text-gray-500 font-mono text-sm">No releases found.</div>
          )}
        </div>
      </div>
    </main>
  );
}
