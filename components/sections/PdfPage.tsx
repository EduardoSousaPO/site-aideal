import Link from "next/link";
import type { PageContent } from "@/lib/content";

type PdfPageProps = {
  page: PageContent;
};

const PDF_SUMMARY_BY_SLUG: Record<string, string> = {
  "manual-de-codigo-de-conduta":
    "Diretrizes de conduta, ética e responsabilidades para atuação institucional e operacional.",
  "missao-visao-voleres":
    "Documento com direcionadores estratégicos da empresa: missão, visão e valores corporativos.",
  "nota-institucional":
    "Comunicado institucional com posicionamentos oficiais e informações relevantes ao público.",
  politica_integrada_assinada:
    "Política integrada com compromissos de qualidade, segurança, saúde e responsabilidade socioambiental.",
  "relatorio-de-iqualdade-salarial":
    "Relatório oficial com dados de igualdade salarial e critérios de acompanhamento institucional.",
};

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
    <div className="container">
      <section className="section-block page-hero">
        <div className="page-hero-inner" data-reveal>
          <span className="pill-badge">Documento oficial</span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
        </div>
      </section>

      <section className="section-block pdf-info-grid">
        <article className="surface-panel pdf-summary" data-reveal>
          <h2>Resumo</h2>
          <p>{summary}</p>
        </article>
        <article className="surface-panel pdf-meta" data-reveal>
          <h2>Informações do Documento</h2>
          <p>
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
  );
}
