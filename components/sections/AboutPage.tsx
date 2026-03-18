import SafeImage from "@/components/SafeImage";
import type { PageContent } from "@/lib/content";
import { ABOUT_VALUE_ITEMS } from "@/lib/site-config";

type AboutPageProps = {
  page: PageContent;
};

export default function AboutPage({ page }: AboutPageProps) {
  const summaryParagraphs = page.paragraphs.filter((paragraph) => paragraph.length > 20).slice(0, 8);
  const primaryImage = page.images[0];
  const secondaryImage = page.images[1];
  const introParagraphs = summaryParagraphs.slice(0, 3);
  const moduleParagraphs = summaryParagraphs.slice(3);
  const narrativeModules = [
    {
      title: "História e Atuação",
      description:
        moduleParagraphs[0] ??
        "Atuação nacional em engenharia de superfície com foco em confiabilidade operacional.",
    },
    {
      title: "Método de Execução",
      description:
        moduleParagraphs[1] ??
        "Planejamento técnico, equipe qualificada e gestão de risco em todas as etapas.",
    },
    {
      title: "Diferenciais",
      description:
        moduleParagraphs[2] ??
        "Compromisso com segurança, qualidade e entrega dentro do escopo e prazo.",
    },
  ];
  const valueDescriptions: Record<string, { code: string; description: string }> = {
    "Responsabilidade Social": {
      code: "RS",
      description: "Compromisso com comunidade, sustentabilidade e impacto positivo.",
    },
    "Valorização Humana": {
      code: "VH",
      description: "Ambiente seguro, desenvolvimento contínuo e respeito às pessoas.",
    },
    Transparência: {
      code: "TR",
      description: "Informação clara sobre escopo, execução, riscos e resultados.",
    },
    "Ética": {
      code: "ET",
      description: "Conduta técnica responsável em todas as decisões e operações.",
    },
    Qualidade: {
      code: "QL",
      description: "Padrão elevado de execução, inspeção e melhoria contínua.",
    },
    Pontualidade: {
      code: "PT",
      description: "Planejamento com foco em prazo e previsibilidade de entrega.",
    },
  };

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
        <div className="about-primary-media" data-reveal>
          <SafeImage
            src={primaryImage?.src ?? "/assets/banner-quem-somos.png"}
            alt={primaryImage?.alt ?? "Equipe da A Ideal"}
            width={Number(primaryImage?.width) || 900}
            height={Number(primaryImage?.height) || 900}
            fallbackSrc="/assets/banner-quem-somos.png"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
          />
        </div>
        <article className="generic-content" data-reveal>
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>
      </section>

      <section className="section-block">
        <header className="section-header section-header--centered" data-reveal>
          <h2 className="display-title section-title">
            Como
            <span className="highlight"> Trabalhamos</span>
          </h2>
          <p className="section-subtitle">
            Uma estrutura de atuação orientada por método, segurança e controle de qualidade.
          </p>
        </header>
        <div className="about-modules">
          {narrativeModules.map((module) => (
            <article className="about-module-card" key={module.title} data-reveal>
              <h3>{module.title}</h3>
              <p>{module.description}</p>
            </article>
          ))}
        </div>
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
            <article className="value-card" key={value} data-reveal>
              <span className="value-card-code">{valueDescriptions[value]?.code ?? "AI"}</span>
              <h3>{value}</h3>
              <p>{valueDescriptions[value]?.description ?? "Diretriz central da cultura A Ideal."}</p>
            </article>
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
            <SafeImage
              src={secondaryImage?.src ?? "/assets/banner-oque-importa.png"}
              alt={secondaryImage?.alt ?? "Cultura e valores da A Ideal"}
              width={secondaryImage?.width ?? 900}
              height={secondaryImage?.height ?? 900}
              fallbackSrc="/assets/banner-oque-importa.png"
              style={{ borderRadius: 14, width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
