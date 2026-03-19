const LIVE_SITE_URL = "https://aideal.com.br";
const DEFAULT_LOADER_SRC = "https://cdn.trustindex.io/loader.js?ver=1";

function extractTrustindexWidget(html: string) {
  const widgetMatch = html.match(
    /<pre class="ti-widget"><template id="trustindex-google-widget-html">([\s\S]*?)<\/template><\/pre><div([^>]+data-src="https:\/\/cdn\.trustindex\.io\/loader\.js\?wp-widget"[^>]*)><\/div>/i,
  );

  if (!widgetMatch) return null;

  const widgetHtml =
    `<pre class="ti-widget"><template id="trustindex-google-widget-html">` +
    `${widgetMatch[1]}</template></pre><div${widgetMatch[2]}></div>`;

  const cssMatch = widgetMatch[2].match(/data-css-url="([^"]+)"/i);
  const loaderMatch = html.match(
    /<script[^>]+src="([^"]*cdn\.trustindex\.io\/loader\.js\?ver=1[^"]*)"[^>]*id="trustindex-loader-js-js"/i,
  );

  return {
    widgetHtml,
    cssUrl: cssMatch?.[1] ?? null,
    loaderSrc: loaderMatch?.[1] ?? DEFAULT_LOADER_SRC,
  };
}

export async function GET() {
  try {
    const response = await fetch(LIVE_SITE_URL, {
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; site-aideal/1.0)",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Falha ao buscar home publicada: ${response.status}`);
    }

    const html = await response.text();
    const widget = extractTrustindexWidget(html);

    if (!widget) {
      return Response.json(
        { ok: false, error: "Widget Trustindex nao encontrado no HTML publicado." },
        { status: 404 },
      );
    }

    return Response.json(
      { ok: true, ...widget },
      {
        headers: {
          "cache-control": "s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Falha ao carregar widget.",
      },
      { status: 500 },
    );
  }
}
