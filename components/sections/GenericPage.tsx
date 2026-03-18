import Image from "next/image";
import Link from "next/link";
import type { PageContent } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site-config";

type GenericPageProps = {
  page: PageContent;
};

export default function GenericPage({ page }: GenericPageProps) {
  const paragraphBlocks = page.paragraphs.filter((paragraph) => paragraph.length > 0);
  const images = page.images.slice(0, 6);

  return (
    <div className="container">
      <section className="section-block page-hero">
        <div className="page-hero-inner" data-reveal>
          <span className="pill-badge">A Ideal Soluções Anticorrosivas</span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
        </div>
      </section>

      <section className="section-block surface-panel">
        <article className="generic-content" data-reveal>
          {paragraphBlocks.length > 0 ? (
            paragraphBlocks.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
          ) : (
            <p>
              Conteúdo institucional disponível nesta página. Para mais detalhes, entre em contato
              com o time da A Ideal.
            </p>
          )}
        </article>
      </section>

      {images.length > 0 ? (
        <section className="section-block">
          <div className="service-gallery">
            {images.map((image) => (
              <figure key={image.src} data-reveal>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 800}
                  height={image.height ?? 800}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-block surface-panel" data-reveal>
        <h2 className="display-title section-title" style={{ fontSize: "2rem" }}>
          Precisa de apoio técnico?
        </h2>
        <p className="section-subtitle">
          Nossa equipe está pronta para detalhar escopo, metodologia de execução e estimativa de
          prazo para o seu projeto industrial.
        </p>
        <Link
          className="btn-primary"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          style={{ marginTop: 14 }}
        >
          Fale com a equipe
        </Link>
      </section>
    </div>
  );
}
