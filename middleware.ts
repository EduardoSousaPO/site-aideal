import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Modo manutenção — desliga o site sem alterar nenhum conteúdo.
 *
 * Ligar:    MAINTENANCE_MODE=1 na Vercel + redeploy
 * Desligar: remover a variável (ou deixar vazia) + redeploy
 */
const MAINTENANCE_HTML = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>A Ideal — em manutenção</title>
<style>
  :root { color-scheme: light dark; }
  body {
    margin: 0; min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    font-family: system-ui, -apple-system, "Segoe UI", sans-serif;
    background: #0e1116; color: #e8eaed; padding: 24px;
  }
  main { max-width: 34rem; text-align: center; }
  h1 { font-size: 1.6rem; margin: 0 0 .75rem; letter-spacing: -0.01em; }
  p { margin: 0; line-height: 1.6; color: #a8b0bb; }
</style>
</head>
<body>
  <main>
    <h1>Estamos em manutenção</h1>
    <p>Nosso site está temporariamente fora do ar e voltará em breve.</p>
  </main>
</body>
</html>`;

export function middleware(_request: NextRequest) {
  if (process.env.MAINTENANCE_MODE !== "1") {
    return NextResponse.next();
  }

  return new NextResponse(MAINTENANCE_HTML, {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "retry-after": "3600",
    },
  });
}

export const config = {
  // Intercepta tudo, exceto assets internos do Next e o favicon.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
