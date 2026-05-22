type GitHubReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type GitHubRelease = {
  id: number;
  name: string;
  tag_name: string;
  published_at: string;
  body: string;
  html_url: string;
  prerelease: boolean;
  assets: GitHubReleaseAsset[];
};

type NormalizedRelease = GitHubRelease & {
  apkAsset: GitHubReleaseAsset | null;
};

const REPO = 'SANDRO00O/ConsoleFlow-mobile';
const GITHUB_API = `https://api.github.com/repos/${REPO}/releases`;

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'public, max-age=300, s-maxage=300');
  headers.set('x-content-type-options', 'nosniff');
  return new Response(JSON.stringify(data, null, 2), {
    ...init,
    headers,
  });
}

function normalizeRelease(release: GitHubRelease): NormalizedRelease {
  const apkAsset = release.assets?.find((asset) => asset.name.toLowerCase().endsWith('.apk')) ?? null;
  return {
    ...release,
    apkAsset,
  };
}

async function fetchReleases(env: Record<string, string | undefined>) {
  const headers = new Headers({
    accept: 'application/vnd.github+json',
    'user-agent': 'ConsoleFlow-Web/Cloudflare-Worker',
    'x-github-api-version': '2022-11-28',
  });

  if (env.GITHUB_TOKEN) {
    headers.set('authorization', `Bearer ${env.GITHUB_TOKEN}`);
  }

  const upstream = await fetch(GITHUB_API, {
    headers,
    cf: {
      cacheEverything: true,
      cacheTtl: 300,
      cacheTtlByStatus: {
        '200-299': 300,
        '404': 60,
        '500-599': 0,
      },
    },
  });

  if (!upstream.ok) {
    throw new Error(`failed_to_fetch_releases:${upstream.status}`);
  }

  const payload = (await upstream.json()) as GitHubRelease[];
  return Array.isArray(payload) ? payload.slice(0, 12).map(normalizeRelease) : [];
}

export async function onRequestGet(context: { request: Request; env: Record<string, string | undefined>; ctx: ExecutionContext }) {
  const { request, env, ctx } = context;
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/releases', request.url).toString(), { method: 'GET' });

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const releases = await fetchReleases(env);
    const latestStable = releases.find((release) => !release.prerelease) ?? releases[0] ?? null;

    const response = json({
      repo: REPO,
      generatedAt: new Date().toISOString(),
      latestStable,
      releases,
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'failed_to_fetch_releases:unknown';
    const status = message.includes(':') ? Number(message.split(':').at(-1)) || 502 : 502;
    return json(
      {
        error: 'failed_to_fetch_releases',
        status,
      },
      { status: 502 },
    );
  }
}
