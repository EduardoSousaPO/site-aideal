import Link from "next/link";
import type { PageContent } from "@/lib/content";

type PdfPageProps = {
  page: PageContent;
};

export default function PdfPage({ page }: PdfPageProps) {
  const pdfUrl = page.pdfUrl ?? "#";

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

      <section className="section-block">
        <div className="pdf-viewer" data-reveal>
          <iframe src={pdfUrl} title={page.title} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
          <Link className="btn-primary" href={pdfUrl} target="_blank" rel="noreferrer">
            Baixar PDF
          </Link>
        </div>
      </section>
    </div>
  );
}
