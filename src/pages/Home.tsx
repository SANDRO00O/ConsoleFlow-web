import { ArrowRight, Download, Github, Shield, Terminal } from 'lucide-react';
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

function Card({
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
    <article className={`rounded-[28px] border border-white/8 bg-white/[0.03] p-6 text-center shadow-[0_18px_50px_rgba(0,0,0,0.16)] ${className}`}>
      <div className="mx-auto mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-gray-200">
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-gray-400">{text}</p>
    </article>
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
    <div className={`overflow-hidden rounded-[30px] border border-white/10 bg-[#0b0b0b] p-4 shadow-[0_22px_70px_rgba(0,0,0,0.28)] ${className}`}>
      <div className="flex min-h-[18rem] items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="block h-auto w-auto max-h-full max-w-full object-contain"
          onError={() => setHidden(true)}
        />
      </div>
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

  const releaseLabel = releases.length > 0 ? `${latestRelease?.tag_name ?? ''}` : loadingReleases ? 'Loading releases…' : 'No release data';

  return (
    <main className="px-4 pb-20 sm:px-6 text-center">
      <section className="mx-auto grid max-w-6xl gap-10 py-10 md:grid-cols-[1.02fr_0.98fr] md:items-center md:py-16 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-gray-300">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              Android browser for inspection and script testing
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-5xl font-semibold tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
              Built for the page.
              <span className="block bg-gradient-to-r from-gray-100 via-gray-300 to-cyan-200 bg-clip-text text-transparent">
                Ready for the console.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-400 sm:text-xl">
              ConsoleFlow is a lightweight Android browser for live debugging, with the tools you need kept close to the content you are testing.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
        </div>

        <FadeIn delay={0.12}>
          <div className="rounded-[34px] border border-white/10 bg-white/[0.03] p-4 shadow-[0_26px_80px_rgba(0,0,0,0.35)]">
            <div className="rounded-[24px] border border-white/10 bg-black/35 px-4 py-4 text-center">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-500">Latest stable</p>
              <p className="mt-2 text-sm font-medium text-gray-200">{releaseLabel}</p>
              <a
                href={downloadUrl}
                className="mx-auto mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[11px] font-medium text-gray-200 transition-colors hover:bg-white/[0.08]"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Install
              </a>
            </div>

            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              <ScreenshotFrame src={`${GITHUB_RAW}/screenshots/1.jpg`} alt="ConsoleFlow screenshot 1" className="lg:col-span-2" />
              <ScreenshotFrame src={`${GITHUB_RAW}/screenshots/2.jpg`} alt="ConsoleFlow screenshot 2" />
              <ScreenshotFrame src={`${GITHUB_RAW}/screenshots/3.jpg`} alt="ConsoleFlow screenshot 3" />
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <FadeIn>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Overview</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">A calmer layout with clear center alignment.</h2>
            <p className="mt-4 text-sm leading-6 text-gray-500">
              The page now keeps the focus on one visual path instead of many competing blocks.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 md:grid-cols-2">
          <FadeIn>
            <Card
              icon={<Terminal className="h-5 w-5" />}
              title="Console stays close"
              text="Debugging tools remain available while you move through pages, so the interface does not pull focus away from the site itself."
              className="h-full"
            />
          </FadeIn>

          <FadeIn delay={0.08}>
            <Card
              icon={<Shield className="h-5 w-5" />}
              title="Local by default"
              text="The browser keeps the workflow on-device, which makes it easier to test without turning the page into a crowded dashboard."
              className="h-full"
            />
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl py-10">
        <FadeIn>
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-gray-500">Update log</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Release notes, centered and easier to scan.</h2>
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
                  <article className="rounded-[30px] border border-white/8 bg-white/[0.03] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-colors hover:bg-white/[0.05]">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-center justify-center gap-3">
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

                      <div className="mx-auto inline-flex">
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
                    </div>

                    <div className="markdown-body mx-auto mt-5 max-w-none overflow-hidden text-center text-sm leading-7 text-gray-400">
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
