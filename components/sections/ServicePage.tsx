import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import SafeImage from "@/components/SafeImage";
import ServiceHeroBackground from "@/components/ServiceHeroBackground";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";
import { WHATSAPP_URL } from "@/lib/site-config";

type ServicePageProps = {
  page: PageContent;
};

export default function ServicePage({ page }: ServicePageProps) {
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
              {introParagraphs[0].length > 140
                ? introParagraphs[0].slice(0, 137) + "..."
                : introParagraphs[0]}
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
        <section className="section-block service-layout" style={{ padding: 0, background: "transparent", border: "none", boxShadow: "none" }}>
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
              <h2 className="display-title section-title" style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.6rem)" }}>
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
              <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
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

        <section className="section-block">
          <div className="section-accent-head" style={{ marginBottom: 20 }}>
            <h2 className="display-title section-title">
              Perguntas
              <span className="highlight"> Frequentes</span>
            </h2>
          </div>
          <FaqAccordion title="" items={page.faqItems} />
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
