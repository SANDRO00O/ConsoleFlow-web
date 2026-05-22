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
const MAX_CACHE_SECONDS = 60 * 60 * 24 * 365;
const MAX_RELEASES_TO_SCAN = 20;

function safeFilename(name: string) {
  return name
    .replace(/[\\/\0\r\n"]/g, '_')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);
}

function encodeRFC5987ValueChars(str: string) {
  return encodeURIComponent(str)
    .replace(/['()]/g, escape)
    .replace(/\*/g, '%2A');
}

function json(data: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('content-type', 'application/json; charset=utf-8');
  headers.set('cache-control', 'no-store');
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

function selectLatestRelease(releases: NormalizedRelease[]) {
  return releases.find((release) => !release.prerelease && release.apkAsset) ?? releases.find((release) => release.apkAsset) ?? null;
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
  return Array.isArray(payload) ? payload.slice(0, MAX_RELEASES_TO_SCAN).map(normalizeRelease) : [];
}

export async function onRequestGet(context: { request: Request; env: Record<string, string | undefined>; ctx: ExecutionContext }) {
  const { request, env, ctx } = context;
  const url = new URL(request.url);
  const tag = url.searchParams.get('tag')?.trim();
  const asset = url.searchParams.get('asset')?.trim();

  if (tag && tag.length > 64) {
    return json({ error: 'invalid_tag' }, { status: 400 });
  }

  if (asset && (asset.length > 180 || !asset.toLowerCase().endsWith('.apk'))) {
    return json({ error: 'invalid_asset' }, { status: 400 });
  }

  const cache = caches.default;
  const cacheKeyUrl = new URL(url.toString());
  cacheKeyUrl.searchParams.sort();
  const cacheKey = new Request(cacheKeyUrl.toString(), { method: 'GET' });
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  try {
    const releases = await fetchReleases(env);
    const latestRelease = selectLatestRelease(releases);

    const release = tag
      ? releases.find((item) => item.tag_name === tag) ?? null
      : latestRelease;

    const matchedAsset = release
      ? (
          asset
            ? release.assets?.find((item) => item.name === asset && item.name.toLowerCase().endsWith('.apk')) ?? null
            : release.apkAsset
        )
      : null;

    if (!release || !matchedAsset) {
      return json({ error: 'release_or_asset_not_found' }, { status: 404 });
    }

    const upstream = await fetch(matchedAsset.browser_download_url, {
      headers: {
        accept: 'application/octet-stream',
        'user-agent': 'ConsoleFlow-Web/Cloudflare-Worker',
      },
      cf: {
        cacheEverything: true,
        cacheTtl: MAX_CACHE_SECONDS,
        cacheTtlByStatus: {
          '200-299': MAX_CACHE_SECONDS,
          '404': 60,
          '500-599': 0,
        },
      },
    });

    if (!upstream.ok) {
      return json(
        {
          error: 'failed_to_fetch_asset',
          status: upstream.status,
        },
        { status: 502 },
      );
    }

    const filename = safeFilename(matchedAsset.name);
    const responseHeaders = new Headers(upstream.headers);
    responseHeaders.set('cache-control', `public, max-age=${MAX_CACHE_SECONDS}, immutable`);
    responseHeaders.set('content-disposition', `attachment; filename="${filename}"; filename*=UTF-8''${encodeRFC5987ValueChars(filename)}`);
    responseHeaders.set('x-content-type-options', 'nosniff');

    const response = new Response(upstream.body, {
      status: upstream.status,
      headers: responseHeaders,
    });

    ctx.waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch {
    return json({ error: 'failed_to_fetch_asset' }, { status: 502 });
  }
}
