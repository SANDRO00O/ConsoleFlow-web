import { Download, Github, LayoutTemplate, Shield, Terminal, Zap, ArrowRight, MonitorSmartphone, Code2, Layers3, CircleDot } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
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

const sectionFade = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const FadeIn = ({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) => (
  <motion.div
    variants={sectionFade}
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

function formatDate(value: string) {
  return new Date(value).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function FeatureCard({
  icon,
  title,
  text,
  className = '',
}: {
  icon: ReactNode;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <div className={`rounded-[28px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/[0.05] ${className}`}>
      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-200">
        {icon}
      </div>
      <h3 className="text-xl font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 max-w-prose text-sm leading-6 text-gray-400">{text}</p>
    </div>
  );
}

function ScreenshotFrame({
  src,
  alt,
  className = '',
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className={`relative overflow-hidden rounded-[34px] border border-white/10 bg-[#0a0a0a] shadow-[0_30px_90px_rgba(0,0,0,0.45)] ${className}`}>
      <div className="absolute left-1/2 top-2 z-20 h-1 w-16 -translate-x-1/2 rounded-full bg-white/10" />
      <div className="absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-white/[0.08] to-transparent" />
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setHidden(true)}
      />
    </div>
  );
}

export default function Home() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [loadingReleases, setLoadingReleases] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    fetch(GITHUB_API)
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) setReleases(data);
        setLoadingReleases(false);
      })
      .catch((err) => {
        console.error('Failed to fetch releases:', err);
        setFetchError(true);
        setLoadingReleases(false);
      });
  }, []);

  const latestStableIndex = useMemo(() => releases.findIndex((r) => !r.prerelease), [releases]);
  const latestRelease = latestStableIndex >= 0 ? releases[latestStableIndex] : releases[0];

  const downloadUrl =
    latestRelease?.assets?.find((a) => a.name.endsWith('.apk'))?.browser_download_url ??
    latestRelease?.html_url ??
    `${GITHUB_URL}/releases/latest`;

  const releaseLabel = releases.length > 0 ? `${latestRelease?.tag_name ?? ''} release` : loadingReleases ? 'Loading releases…' : 'No release data';

  const stats = [
    { label: 'Console injected automatically', value: 'Eruda' },
    { label: 'Desktop mode for testing', value: 'UA switch' },
    { label: 'Custom JavaScript support', value: 'Per page' },
  ];

  return (
    <main className="px-4 pb-20 sm:px-6">
      <section className="mx-auto grid max-w-6xl items-center gap-12 py-10 md:grid-cols-[1.05fr_0.95fr] md:py-16">
        <div className="max-w-2xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.24em] text-gray-300">
              <CircleDot className="h-3.5 w-3.5 text-cyan-300" />
              Android browser for debugging
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 text-5xl font-semibold tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Desktop debugging.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-cyan-200">
                On your mobile.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400 sm:text-xl">
              A lightweight Android web browser made for inspection, console work, and quick script testing — with Eruda injected into every page and a dark visual system that stays out of the way.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={downloadUrl}
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5 hover:bg-gray-200"
              >
                <Download className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
                Download APK
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/[0.08]"
              >
                <Github className="h-5 w-5" />
                Source Code
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={0.32}>
            <div className="mt-8 flex flex-wrap gap-3 text-sm text-gray-400">
              {stats.map((item) => (
                <div key={item.label} className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2">
                  <span className="text-gray-200">{item.value}</span>
                  <span className="mx-2 text-white/20">·</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.14}>
          <div className="relative">
            <div className="absolute -left-4 top-14 hidden h-24 w-24 rounded-full bg-cyan-500/15 blur-2xl md:block" />
            <div className="absolute -right-6 bottom-8 hidden h-28 w-28 rounded-full bg-violet-500/15 blur-2xl md:block" />

            <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.42)] backdrop-blur-sm">
              <div className="flex items-center justify-between rounded-[24px] border border-white/10 bg-black/40 px-4 py-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">Latest build</p>
                  <p className="mt-1 text-sm font-medium text-gray-200">{releaseLabel}</p>
                </div>
                <div className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[11px] font-medium text-green-400">
                  Ready to install
                </div>
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.12fr_0.88fr]">
                <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0a0a]">
                  <ScreenshotFrame
                    src={`${GITHUB_RAW}/screenshots/1.jpg`}
                    alt="ConsoleFlow screenshot 1"
                    className="aspect-[9/18]"
                  />
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-white/8 bg-white/[0.04] p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                        <MonitorSmartphone className="h-5 w-5 text-cyan-300" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Mobile-first shell</p>
                        <p className="text-xs text-gray-500">Built for touch and quick context switching</p>
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-gray-400">
                      The UI keeps the browser content readable, while the overlay console stays available without turning the page into a dashboard.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-3">
                        <Code2 className="h-5 w-5 text-gray-300" />
                        <p className="text-sm font-medium text-gray-200">Script injection</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        Run your own JavaScript alongside Eruda on every page load.
                      </p>
                    </div>
                    <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
                      <div className="flex items-center gap-3">
                        <Layers3 className="h-5 w-5 text-gray-300" />
                        <p className="text-sm font-medium text-gray-200">Desktop mode</p>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-400">
                        Switch the browsing context when you need a more realistic page rendering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <FadeIn>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-400">Interface notes</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <ScreenshotFrame
                  src={`${GITHUB_RAW}/screenshots/2.jpg`}
                  alt="ConsoleFlow screenshot 2"
                  className="aspect-[9/15] sm:aspect-[9/17]"
                />
                <div className="grid gap-4">
                  <ScreenshotFrame
                    src={`${GITHUB_RAW}/screenshots/3.jpg`}
                    alt="ConsoleFlow screenshot 3"
                    className="aspect-[9/10]"
                  />
                  <ScreenshotFrame
                    src={`${GITHUB_RAW}/screenshots/4.jpg`}
                    alt="ConsoleFlow screenshot 4"
                    className="aspect-[9/10]"
                  />
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="md:col-span-5 grid gap-4">
            <FadeIn delay={0.08}>
              <div className="rounded-[32px] border border-white/8 bg-gradient-to-br from-white/[0.05] to-white/[0.02] p-6">
                <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Why it feels natural</p>
                <p className="mt-3 max-w-sm text-2xl font-semibold tracking-tight text-white">
                  Fewer repeated boxes, clearer differences between sections, and a calmer rhythm between text and imagery.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.16}>
              <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <Terminal className="h-5 w-5 text-gray-300" />
                  <h3 className="text-lg font-semibold text-white">Made for live debugging</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  Inspect DOM, watch console output, check requests, and keep the browser state close to the page you are testing.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="rounded-[32px] border border-white/8 bg-white/[0.03] p-6">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-gray-300" />
                  <h3 className="text-lg font-semibold text-white">Privacy-first by design</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-400">
                  The app stays client-side and offline by default, which keeps the debugging loop local to the device.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <FadeIn>
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Core features</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A tighter feature grid with more breathing room.</h2>
            </div>
            <div className="hidden text-sm text-gray-500 md:block">
              The shape of the layout now changes by importance instead of repeating the same card size everywhere.
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-12">
          <FadeIn className="md:col-span-7">
            <FeatureCard
              icon={<Terminal className="h-5 w-5" />}
              title="Auto-injected console"
              text="Eruda is added automatically on every page so the inspection tools are available as soon as a page loads."
              className="h-full"
            />
          </FadeIn>

          <FadeIn delay={0.08} className="md:col-span-5">
            <FeatureCard
              icon={<LayoutTemplate className="h-5 w-5" />}
              title="Desktop mode"
              text="Switch to a desktop user agent and viewport when you need a more realistic testing environment."
            />
          </FadeIn>

          <FadeIn delay={0.12} className="md:col-span-5">
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Custom JS injection"
              text="Store your own JavaScript and run it across pages to test helpers, tweaks, and one-off fixes."
            />
          </FadeIn>

          <FadeIn delay={0.16} className="md:col-span-7">
            <FeatureCard
              icon={<Shield className="h-5 w-5" />}
              title="Smart interception"
              text="The browser uses interception logic to smooth out common roadblocks on major search engines and keep the workflow moving."
              className="h-full"
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <FadeIn>
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px flex-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-gray-400">Update log</span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
          </div>
        </FadeIn>

        <div className="space-y-4">
          {loadingReleases ? (
            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-8 text-center text-sm text-gray-500">
              Loading release notes…
            </div>
          ) : fetchError ? (
            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-8 text-center text-sm text-gray-500">
              Could not load releases.{' '}
              <a
                href={`${GITHUB_URL}/releases`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-200 underline decoration-white/20 underline-offset-4 hover:decoration-white/60"
              >
                View on GitHub
              </a>
            </div>
          ) : releases.length > 0 ? (
            releases.map((release, index) => {
              const isLatestStable = index === latestStableIndex;
              return (
                <FadeIn key={release.id} delay={0.06 + index * 0.05}>
                  <article className="rounded-[30px] border border-white/8 bg-white/[0.03] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-colors hover:bg-white/[0.05]">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-xl font-semibold tracking-tight text-white">{release.name || release.tag_name}</h3>
                          {release.prerelease ? (
                            <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2.5 py-1 text-[11px] font-medium text-yellow-300">
                              Pre-release
                            </span>
                          ) : isLatestStable ? (
                            <span className="rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-[11px] font-medium text-green-300">
                              Latest
                            </span>
                          ) : null}
                          <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-gray-400">
                            {formatDate(release.published_at)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{release.tag_name}</p>
                      </div>

                      <a
                        href={release.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/[0.08]"
                      >
                        <Github className="h-4 w-4" />
                        View release
                      </a>
                    </div>

                    <div className="markdown-body mt-5 max-w-none overflow-hidden text-sm leading-7 text-gray-400">
                      <Markdown>{release.body || 'No release notes were provided.'}</Markdown>
                    </div>
                  </article>
                </FadeIn>
              );
            })
          ) : (
            <div className="rounded-[28px] border border-white/8 bg-white/[0.03] p-8 text-center text-sm text-gray-500">
              No releases found.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
