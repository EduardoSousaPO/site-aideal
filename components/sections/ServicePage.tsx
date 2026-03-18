import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import HypnoticBackground from "@/components/HypnoticBackground";
import SafeImage from "@/components/SafeImage";
import type { PageContent } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site-config";

type ServicePageProps = {
  page: PageContent;
};

export default function ServicePage({ page }: ServicePageProps) {
  const isDocumentCenter = page.slug === "atestado-tecnico";
  const heroImage = page.images[0];
  const introParagraphs = page.paragraphs
    .filter(
      (paragraph) =>
        paragraph.length > 35 &&
        !paragraph.includes("?") &&
        !paragraph.toLocaleLowerCase("pt-BR").startsWith("nossos principais serviços incluem"),
    )
    .slice(0, 5);

  const checkItems = page.listItems
    .filter((item) => item.includes("✅"))
    .map((item) => item.replace("✅", "").trim())
    .slice(0, 4);

  const bulletItems = page.listItems
    .filter((item) => !item.includes("✅"))
    .slice(0, 6);

  const galleryImages =
    page.images.length > 5 ? page.images.slice(1, 6) : page.images.slice(0, 5);

  const faqTitle =
    page.headings.find((heading) => heading.text.toLowerCase().includes("perguntas"))?.text ??
    `Perguntas Frequentes sobre ${page.title}`;
  const plainTextLower = page.plainText.toLocaleLowerCase("pt-BR");
  const segmentCatalog = [
    { keyword: "mineração", label: "Mineração" },
    { keyword: "energia", label: "Energia" },
    { keyword: "óleo e gás", label: "Óleo e gás" },
    { keyword: "petroquímica", label: "Petroquímica" },
    { keyword: "papel e celulose", label: "Papel e celulose" },
    { keyword: "alimentos", label: "Alimentos e bebidas" },
    { keyword: "infraestrutura", label: "Infraestrutura" },
  ];
  const detectedSegments = segmentCatalog
    .filter((item) => plainTextLower.includes(item.keyword))
    .map((item) => item.label);
  const segmentChips =
    detectedSegments.length > 0
      ? detectedSegments
      : ["Energia", "Mineração", "Infraestrutura", "Indústria de base"];
  const applicationItems =
    bulletItems.length > 0
      ? bulletItems.slice(0, 4)
      : [
          "Preparação e proteção de superfícies com método técnico definido.",
          "Execução em ambiente operacional com controle de segurança.",
          "Adequação de escopo conforme criticidade do ativo industrial.",
        ];
  const serviceMeta = isDocumentCenter
    ? [
        { label: "Atualização", value: "Revisão contínua" },
        { label: "Conformidade", value: "NR, ISO e requisitos legais" },
        { label: "Transparência", value: "Acesso público aos documentos" },
      ]
    : [
        { label: "Planejamento", value: "Escopo técnico detalhado" },
        { label: "Segurança", value: "Protocolos NR-35 e NR-33" },
        { label: "Cobertura", value: "Atendimento nacional" },
      ];
  const executionSteps = isDocumentCenter
    ? [
        "Levantamento de requisitos e documentos obrigatórios.",
        "Validação técnica e legal da documentação.",
        "Organização e disponibilização por tipo de evidência.",
        "Atualização periódica e controle de validade.",
      ]
    : [
        "Diagnóstico técnico do ambiente e definição do método.",
        "Planejamento operacional com análise de risco e segurança.",
        "Execução com equipe especializada e rastreabilidade.",
        "Inspeção final, relatório e alinhamento de continuidade.",
      ];
  const complianceItems = isDocumentCenter
    ? [
        "Atestados de capacidade técnica",
        "Certidões e evidências de conformidade",
        "Referências de projetos anteriores",
      ]
    : [
        "Procedimentos conforme normas regulamentadoras",
        "Equipe treinada para ambientes industriais críticos",
        "Protocolos de segurança, qualidade e inspeção",
      ];
  const documentLinks = [
    { label: "Manual de Código de Conduta", href: "/manual-de-codigo-de-conduta" },
    { label: "Missão, Visão e Valores", href: "/missao-visao-voleres" },
    { label: "Política Integrada", href: "/politica_integrada_assinada" },
    { label: "Relatório de Igualdade Salarial", href: "/relatorio-de-iqualdade-salarial" },
  ];

  return (
    <div className="container">
      <section className="section-block page-hero">
        <div className="page-hero-inner">
          <HypnoticBackground />
          <span className="pill-badge">+ de 20 anos atendendo todo o Brasil</span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
          <div className="hero-actions" style={{ marginTop: 10 }}>
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Faça um orçamento
            </Link>
          </div>
        </div>
      </section>

      <section className="service-meta-grid" aria-label="Indicadores da solução">
        {serviceMeta.map((item) => (
          <article className="service-meta-card" key={item.label} data-reveal>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="section-block surface-panel service-layout">
        <div className="service-hero-media" data-reveal>
          {heroImage ? (
            <SafeImage
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width ?? 920}
              height={heroImage.height ?? 920}
              fallbackSrc="/assets/banner-quem-somos.png"
              style={{ borderRadius: 16, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <SafeImage
              src="/assets/banner-quem-somos.png"
              alt="Equipe técnica da A Ideal"
              width={900}
              height={620}
              style={{ borderRadius: 16, width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <article data-reveal>
          <h2 className="display-title section-title" style={{ fontSize: "2.35rem" }}>
            {isDocumentCenter ? "Documentos" : "Principais"}
            <span className="highlight"> {isDocumentCenter ? " Técnicos" : " Vantagens"}</span>
          </h2>

          <ul className="checklist" style={{ marginTop: 10, marginBottom: 18 }}>
            {(checkItems.length > 0
              ? checkItems
              : ["Estrutura resistente", "Rapidez na execução", "Segurança operacional"]
            ).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="generic-content">
            {introParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {bulletItems.length > 0 ? (
            <ul style={{ color: "var(--ink-soft)", marginBottom: 0 }}>
              {bulletItems.map((bullet) => (
                <li key={bullet} style={{ marginBottom: 8 }}>
                  {bullet}
                </li>
              ))}
            </ul>
          ) : null}
        </article>
      </section>

      <section className="section-block">
        <header className="section-header section-header--centered" data-reveal>
          <h2 className="display-title section-title">
            Fluxo de
            <span className="highlight"> Execução</span>
          </h2>
        </header>
        <div className="service-process-grid">
          {executionSteps.map((step, index) => (
            <article className="service-process-card" key={step} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block surface-panel">
        <header className="section-header section-header--centered" data-reveal>
          <h2 className="display-title section-title">
            Segurança e
            <span className="highlight"> Conformidade</span>
          </h2>
        </header>
        <ul className="compliance-list">
          {complianceItems.map((item) => (
            <li key={item} data-reveal>
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-block surface-panel service-narrative">
        <header className="section-header section-header--centered" data-reveal>
          <h2 className="display-title section-title">
            Aplicações e
            <span className="highlight"> Segmentos</span>
          </h2>
        </header>
        <div className="service-narrative-grid">
          <article data-reveal>
            <h3>Aplicações Comuns</h3>
            <ul className="compliance-list">
              {applicationItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article data-reveal>
            <h3>Segmentos Atendidos</h3>
            <div className="segment-chip-list">
              {segmentChips.map((segment) => (
                <span className="segment-chip" key={segment}>
                  {segment}
                </span>
              ))}
            </div>
          </article>
        </div>
      </section>

      {isDocumentCenter ? (
        <section className="section-block">
          <header className="section-header section-header--centered" data-reveal>
            <h2 className="display-title section-title">
              Centro
              <span className="highlight"> Documental</span>
            </h2>
            <p className="section-subtitle">
              Acesse documentos institucionais, políticas e referências técnicas da A Ideal.
            </p>
          </header>
          <div className="document-center-grid">
            {documentLinks.map((doc) => (
              <article className="document-card" key={doc.href} data-reveal>
                <h3>{doc.label}</h3>
                <Link className="service-link" href={doc.href}>
                  Abrir documento <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {galleryImages.length > 0 ? (
        <section className="section-block">
          <header className="section-header" data-reveal>
            <h2 className="display-title section-title">
              Obras
              <span className="highlight"> Realizadas</span>
            </h2>
          </header>
          <div className="service-gallery">
            {galleryImages.map((image) => (
              <figure key={image.src} data-reveal>
                <SafeImage
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 700}
                  height={image.height ?? 700}
                  fallbackSrc="/assets/banner-oque-importa.png"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <FaqAccordion title={faqTitle} items={page.faqItems} />
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
          <Link
            className="btn-outline"
            href="/contato"
          >
            Falar com especialista
          </Link>
        </div>
      </section>
    </div>
  );
}
