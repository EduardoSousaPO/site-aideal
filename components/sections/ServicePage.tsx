import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import SafeImage from "@/components/SafeImage";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";
import WaveSep from "@/components/WaveSep";
import type { FaqItem, PageContent } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site-config";

type ServicePageProps = {
  page: PageContent;
};

const ATESTADO_META_CARDS = [
  { label: "Foco", value: "Comprovação técnica e documental" },
  { label: "Segurança", value: "Execução alinhada às normas aplicáveis" },
  { label: "Abrangência", value: "Atuação em diferentes segmentos industriais" },
];

const ATESTADO_CHECKLIST = [
  "Equipe técnica treinada e atualizada para ambientes industriais exigentes.",
  "Atestados de capacidade técnica e referências de serviços já executados.",
  "Protocolos de segurança com análise de risco, planejamento e uso de EPIs e EPCs.",
  "Transparência documental para apoiar avaliação, cadastro e contratação.",
];

const ATESTADO_DOCUMENT_CARDS = [
  {
    title: "Atestados de capacidade técnica",
    description:
      "Evidências emitidas por clientes atendidos, reforçando experiência prática e consistência na entrega.",
  },
  {
    title: "Qualificação da equipe",
    description:
      "Capacitações e treinamentos voltados para atuação segura e eficiente em operações industriais.",
  },
  {
    title: "Segurança operacional",
    description:
      "Rotinas de planejamento, análise de risco e execução com foco em controle e conformidade.",
  },
  {
    title: "Transparência para contratação",
    description:
      "Informações organizadas para dar mais clareza a processos de avaliação técnica e tomada de decisão.",
  },
];

const ATESTADO_SEGMENTS = [
  "Óleo e gás",
  "Energia",
  "Construção civil",
  "Mineração",
  "Agroindústria",
  "Papel e celulose",
  "Petroquímica",
];

const ATESTADO_FAQ_ITEMS: FaqItem[] = [
  {
    question: "Quais certificações e qualificações a Ideal possui para atuar em ambientes industriais?",
    answer:
      "A Ideal conta com equipe qualificada conforme exigências de segurança e atuação industrial, com treinamentos como NR-35 e NR-33, além de capacitações complementares para procedimentos técnicos e acesso por cordas.",
  },
  {
    question: "Como a Ideal garante a segurança durante a execução dos serviços?",
    answer:
      "Adotamos protocolos de segurança com análise de riscos, planejamento das atividades, uso adequado de EPIs e EPCs e reciclagem periódica da equipe para manter a operação alinhada às normas aplicáveis.",
  },
  {
    question: "Por que a transparência é um diferencial nos serviços da Ideal?",
    answer:
      "Mantemos documentação comprobatória, registros e referências técnicas acessíveis para dar mais segurança aos processos de avaliação, auditoria e contratação.",
  },
  {
    question: "A Ideal atua em quais segmentos da indústria?",
    answer:
      "Atendemos setores como óleo e gás, energia, construção civil, mineração, agroindústria, papel e celulose e petroquímica, sempre com solução técnica ajustada ao contexto operacional do cliente.",
  },
];

export default function ServicePage({ page }: ServicePageProps) {
  const isAtestadoPage = page.slug === "atestado-tecnico";
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

  const galleryImages = page.images
    .filter(
      (image, index, images) =>
        index > 0 && images.findIndex((candidate) => candidate.src === image.src) === index,
    )
    .slice(0, 5);

  const detailHeading =
    page.headings.find(
      (heading) =>
        heading.level >= 2 &&
        !heading.text.toLowerCase().includes("perguntas") &&
        !heading.text.toLowerCase().includes("obras"),
    )?.text ?? "Principais Vantagens";

  const headingWords = detailHeading.replace(/\.$/, "").split(" ");
  const headingLast = headingWords.slice(-1).join(" ") || "Vantagens";
  const headingRest = headingWords.slice(0, -1).join(" ") || "Principais";
  const heroSummary = isAtestadoPage
    ? "Documentação técnica e comprovações que reforçam segurança, conformidade e confiança na contratação da A Ideal."
    : introParagraphs[0];
  const faqItems = isAtestadoPage ? ATESTADO_FAQ_ITEMS : page.faqItems;

  return (
    <>
      {/* ─── HERO DARK FULL-BLEED ──────────────────────────────── */}
      <section className="page-hero-banner page-hero-banner--service">
        <ServiceHeroBackground />
        <div className="container" style={{ position: "relative", zIndex: 3 }}>
          <span className="pill-badge">Engenharia de Superfície</span>
          <h1
            className="display-title section-title"
            style={{ color: "#fff", marginTop: 20, maxWidth: 700, lineHeight: 1.05 }}
          >
            {page.title}
          </h1>
          {introParagraphs[0] && (
            <p style={{
              color: "rgba(255,255,255,0.72)",
              fontSize: "clamp(0.96rem, 1.2vw, 1.1rem)",
              lineHeight: 1.65,
              margin: "16px 0 0",
              maxWidth: 580,
            }}>
              {heroSummary && heroSummary.length > 140
                ? heroSummary.slice(0, 137) + "..."
                : heroSummary}
            </p>
          )}
          <div className="hero-actions" style={{ marginTop: 28 }}>
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Faça um orçamento
            </Link>
            <Link className="btn-outline-white" href="/#contato">
              Falar com especialista
            </Link>
          </div>
        </div>
      </section>

      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── CONTEÚDO PRINCIPAL ────────────────────────────────── */}
      <div className="container">
        {isAtestadoPage ? (
          <>
            <section
              className="section-block service-layout"
              style={{ padding: 0, background: "transparent", border: "none", boxShadow: "none" }}
            >
              <div
                className="service-hero-media"
                data-reveal
                style={{
                  aspectRatio: "4 / 5",
                  maxHeight: 640,
                }}
              >
                {heroImage ? (
                  <SafeImage
                    src={heroImage.src}
                    alt={heroImage.alt}
                    width={heroImage.width ?? 920}
                    height={heroImage.height ?? 920}
                    fallbackSrc="/assets/banner-quem-somos.png"
                    style={{
                      borderRadius: 16,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
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
                <div className="section-accent-head">
                  <h2
                    className="display-title section-title"
                    style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.6rem)" }}
                  >
                    Documentação que
                    <span className="highlight"> gera confiança</span>
                  </h2>
                </div>

                <p className="section-subtitle" style={{ maxWidth: "unset", marginBottom: 18 }}>
                  Reunimos em um só lugar os pontos que mais pesam na avaliação técnica de um
                  fornecedor industrial: qualificação, segurança, histórico e transparência.
                </p>

                <div className="service-meta-grid" style={{ marginTop: 0, marginBottom: 22 }}>
                  {ATESTADO_META_CARDS.map((item) => (
                    <article className="service-meta-card" key={item.label} data-reveal>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </article>
                  ))}
                </div>

                <ul className="checklist" style={{ marginTop: 0, marginBottom: 20 }}>
                  {ATESTADO_CHECKLIST.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="generic-content" style={{ marginBottom: 20 }}>
                  <p>
                    Em operações industriais, a contratação precisa ser sustentada por evidências.
                    Por isso, a página foi reorganizada para apresentar de forma direta os
                    elementos que reforçam a credibilidade da A Ideal.
                  </p>
                  <p>
                    O objetivo é facilitar processos de cadastro, análise técnica e homologação,
                    reduzindo dúvidas e acelerando a tomada de decisão do cliente.
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
                  <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                    Solicitar atendimento
                  </Link>
                  <Link className="btn-outline" href="/#contato">
                    Falar com especialista
                  </Link>
                </div>
              </article>
            </section>

            <section className="section-block">
              <div className="section-accent-head" style={{ marginBottom: 20 }}>
                <h2 className="display-title section-title">
                  Critérios de
                  <span className="highlight"> avaliação</span>
                </h2>
              </div>
              <p className="section-subtitle">
                Abaixo estão os pilares que normalmente orientam a análise de fornecedores para
                serviços industriais com exigência técnica e operacional.
              </p>

              <div className="document-center-grid" style={{ marginTop: 20 }}>
                {ATESTADO_DOCUMENT_CARDS.map((item) => (
                  <article className="document-card" key={item.title} data-reveal>
                    <h3>{item.title}</h3>
                    <p style={{ color: "var(--ink-soft)", margin: 0, lineHeight: 1.6 }}>
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <p
                  style={{
                    color: "var(--ink-strong)",
                    fontSize: "0.92rem",
                    fontWeight: 800,
                    letterSpacing: "0.04em",
                    margin: "0 0 12px",
                    textTransform: "uppercase",
                  }}
                >
                  Segmentos atendidos
                </p>
                <div className="segment-chip-list">
                  {ATESTADO_SEGMENTS.map((segment) => (
                    <span className="segment-chip" key={segment}>
                      {segment}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section
              className="section-block service-layout"
              style={{ padding: 0, background: "transparent", border: "none", boxShadow: "none" }}
            >
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
                <div className="section-accent-head">
                  <h2
                    className="display-title section-title"
                    style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.6rem)" }}
                  >
                    {headingRest}
                    <span className="highlight"> {headingLast}</span>
                  </h2>
                </div>

                <ul className="checklist" style={{ marginTop: 16, marginBottom: 20 }}>
                  {(checkItems.length > 0
                    ? checkItems
                    : ["Estrutura resistente", "Rapidez na execução", "Segurança operacional"]
                  ).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                <div className="generic-content" style={{ marginBottom: 20 }}>
                  {introParagraphs.slice(1, 4).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                {bulletItems.length > 0 ? (
                  <ul style={{ color: "var(--ink-soft)", marginBottom: 0, paddingLeft: 18 }}>
                    {bulletItems.map((bullet) => (
                      <li key={bullet} style={{ marginBottom: 8, lineHeight: 1.55 }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div style={{ marginTop: 28 }}>
                  <Link
                    className="btn-primary"
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Solicitar orçamento
                  </Link>
                </div>
              </article>
            </section>

            {galleryImages.length > 0 ? (
              <section className="section-block">
                <div className="section-accent-head" style={{ marginBottom: 20 }}>
                  <h2 className="display-title section-title">
                    Obras
                    <span className="highlight"> Realizadas</span>
                  </h2>
                </div>
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
          </>
        )}

        <section className="section-block">
          <div className="section-accent-head" style={{ marginBottom: 20 }}>
            <h2 className="display-title section-title">
              Perguntas
              <span className="highlight"> Frequentes</span>
            </h2>
          </div>
          <FaqAccordion title="" items={faqItems} />
        </section>
      </div>

      {/* ─── CTA STRIP ─────────────────────────────────────────── */}
      <div className="container">
        <div className="cta-strip">
          <div>
            <p className="cta-strip-title">
              Pronto para iniciar<br />seu projeto?
            </p>
            <p className="cta-strip-sub">
              Solicite um orçamento gratuito e receba retorno em até 24h.
            </p>
          </div>
          <Link className="btn-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar agora no WhatsApp
          </Link>
        </div>
      </div>
    </>
  );
}
