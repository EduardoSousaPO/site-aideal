import Image from "next/image";
import type { PageContent } from "@/lib/content";
import { ABOUT_VALUE_ITEMS } from "@/lib/site-config";

type AboutPageProps = {
  page: PageContent;
};

export default function AboutPage({ page }: AboutPageProps) {
  const summaryParagraphs = page.paragraphs.filter((paragraph) => paragraph.length > 20).slice(0, 8);
  const primaryImage = page.images[0];
  const secondaryImage = page.images[1];

  return (
    <div className="container">
      <section className="section-block page-hero">
        <div className="page-hero-inner" data-reveal>
          <span className="pill-badge">Quem somos</span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
          <p className="hero-text" style={{ maxWidth: 720 }}>
            Engenharia de superfície orientada por segurança, disciplina operacional e compromisso
            com resultados de longo prazo para ativos industriais.
          </p>
        </div>
      </section>

      <section className="section-block surface-panel service-layout">
        <div data-reveal>
          {primaryImage ? (
            <Image
              src={primaryImage.src}
              alt={primaryImage.alt}
              width={primaryImage.width ?? 900}
              height={primaryImage.height ?? 900}
              style={{ borderRadius: 18, width: "100%", height: "auto" }}
            />
          ) : (
            <Image
              src="/assets/banner-quem-somos.png"
              alt="Equipe da A Ideal"
              width={1300}
              height={730}
              style={{ borderRadius: 18, width: "100%", height: "auto" }}
            />
          )}
        </div>
        <article className="generic-content" data-reveal>
          {summaryParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="section-block">
        <header className="section-header" data-reveal>
          <h2 className="display-title section-title">
            Nossos
            <span className="highlight"> Valores</span>
          </h2>
        </header>
        <div className="about-values">
          {ABOUT_VALUE_ITEMS.map((value) => (
            <div className="value-chip" key={value} data-reveal>
              {value}
            </div>
          ))}
        </div>
      </section>

      <section className="section-block surface-panel" data-reveal>
        <div className="service-layout">
          <article className="generic-content">
            <p>
              Na A Ideal, cada projeto é conduzido com foco em qualidade técnica, responsabilidade
              socioambiental e confiabilidade de execução.
            </p>
            <p>
              Priorizamos práticas seguras, equipes qualificadas e melhoria contínua dos processos
              para entregar desempenho industrial consistente em todo o Brasil.
            </p>
          </article>
          <div>
            {secondaryImage ? (
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                width={secondaryImage.width ?? 900}
                height={secondaryImage.height ?? 900}
                style={{ borderRadius: 14, width: "100%", height: "auto" }}
              />
            ) : (
              <Image
                src="/assets/banner-oque-importa.png"
                alt="Cultura e valores da A Ideal"
                width={1300}
                height={730}
                style={{ borderRadius: 14, width: "100%", height: "auto" }}
              />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
