import Link from "next/link";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";

type PdfPageProps = {
  page: PageContent;
};

const PDF_SUMMARY_BY_SLUG: Record<string, string> = {};

function formatDateBR(dateValue: string): string {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return dateValue;
  return parsedDate.toLocaleDateString("pt-BR");
}

export default function PdfPage({ page }: PdfPageProps) {
  const pdfUrl = page.pdfUrl ?? "#";
  const summary =
    PDF_SUMMARY_BY_SLUG[page.slug] ??
    "Documento oficial disponível para consulta pública e download direto.";

  return (
    <>
      {/* ─── HERO DARK FULL-BLEED ──────────────────────────────── */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="pill-badge">Documento oficial</span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
        </div>
      </section>

      <WaveSep fill="#ffffff" bg="#02264a" />

      <div className="container">
        <section className="section-block pdf-info-grid">
          <article className="surface-panel pdf-summary" data-reveal>
            <div className="section-accent-head">
              <h2>Resumo</h2>
            </div>
            <p style={{ marginTop: 12 }}>{summary}</p>
          </article>
          <article className="surface-panel pdf-meta" data-reveal>
            <div className="section-accent-head">
              <h2>Informações do Documento</h2>
            </div>
            <p style={{ marginTop: 12 }}>
              <strong>Última atualização:</strong> {formatDateBR(page.modified)}
            </p>
            <p>
              <strong>Formato:</strong> PDF
            </p>
            <div className="pdf-meta-actions">
              <Link className="btn-primary" href={pdfUrl} target="_blank" rel="noreferrer">
                Abrir em nova aba
              </Link>
              <Link className="btn-outline" href={pdfUrl} download>
                Baixar PDF
              </Link>
            </div>
          </article>
        </section>

        <section className="section-block">
          <div className="pdf-viewer" data-reveal>
            <iframe src={pdfUrl} title={page.title} />
          </div>
          <p className="pdf-fallback">
            Se o visualizador não carregar corretamente, use a opção{" "}
            <Link href={pdfUrl} target="_blank" rel="noreferrer">
              abrir em nova aba
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
