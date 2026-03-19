import Link from "next/link";
import AboutValueIcon from "@/components/AboutValueIcons";
import SafeImage from "@/components/SafeImage";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";
import { ABOUT_VALUE_ITEMS, WHATSAPP_URL } from "@/lib/site-config";

type AboutPageProps = {
  page: PageContent;
};

export default function AboutPage({ page }: AboutPageProps) {
  const summaryParagraphs = page.paragraphs.filter((paragraph) => paragraph.length > 20).slice(0, 8);
  const primaryImage = page.images[0];
  const secondaryImage = page.images.find((image) => image.width && image.width > 200 && image !== primaryImage);
  const introParagraph = summaryParagraphs[0];
  const missionParagraph = summaryParagraphs[1];
  const visionParagraph = summaryParagraphs[2];
  const valueNarrative = summaryParagraphs.find((paragraph) => paragraph.length > 260) ?? summaryParagraphs[3];
  const supportingParagraphs = summaryParagraphs.filter(
    (paragraph) =>
      paragraph !== introParagraph &&
      paragraph !== missionParagraph &&
      paragraph !== visionParagraph &&
      paragraph !== valueNarrative,
  );
  const valueIcons = [
    "responsabilidade-social",
    "valorizacao-humana",
    "transparencia",
    "etica",
    "qualidade",
    "pontualidade",
  ] as const;

  return (
    <>
      {/* ─── HERO DARK FULL-BLEED ──────────────────────────────── */}
      <section className="page-hero-banner">
        <div className="container" style={{ paddingBottom: 0 }}>
          <div className="about-wp-grid">
            <article className="about-wp-copy" data-reveal>
              <span className="about-hero-eyebrow">Quem somos</span>
              <h1 className="display-title about-wp-title">
                <span>Especialistas em</span>
                <span className="highlight"> Pintura Industrial</span>
              </h1>
              {introParagraph ? <p className="especialistas-text">{introParagraph}</p> : null}
              <div className="about-mission-grid">
                {missionParagraph ? (
                  <article className="about-mini-card">
                    <h2>Missão</h2>
                    <p>{missionParagraph}</p>
                  </article>
                ) : null}
                {visionParagraph ? (
                  <article className="about-mini-card">
                    <h2>Visão</h2>
                    <p>{visionParagraph}</p>
                  </article>
                ) : null}
              </div>
            </article>

            <div className="about-wp-visual" data-reveal>
              <SafeImage
                src={primaryImage?.src ?? "/assets/banner-quem-somos.png"}
                alt={primaryImage?.alt ?? "Equipe da A Ideal"}
                width={Number(primaryImage?.width) || 900}
                height={Number(primaryImage?.height) || 900}
                fallbackSrc="/assets/banner-quem-somos.png"
                style={{ width: "100%", height: "auto" }}
              />
              <div className="about-wp-labels">
                <strong>A Ideal</strong>
                <span>Soluções Anticorrosivas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── VALORES (dark section, flui do hero) ──────────────── */}
      <section className="section-dark" id="valores">
        <div className="container">
          <header className="section-header section-header--centered" data-reveal style={{ marginBottom: 48 }}>
            <div className="section-accent-head" style={{ borderColor: "var(--brand-red)", textAlign: "left", width: "100%" }}>
              <h2 className="display-title section-title" style={{ color: "#fff" }}>
                Nossos
                <span className="highlight"> Valores</span>
              </h2>
            </div>
          </header>
          <div className="about-values about-values--icons">
            {ABOUT_VALUE_ITEMS.map((label, index) => {
              return (
                <article className="about-icon-card" key={label} data-reveal>
                  <AboutValueIcon kind={valueIcons[index]} className="about-icon-symbol" />
                  <p>{label}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── CONTEÚDO DE APOIO ─────────────────────────────────── */}
      <div className="container">
        <section className="section-block about-wp-bottom" data-reveal>
          <div className="about-wp-bottom-grid">
            <div>
              {secondaryImage ? (
                <SafeImage
                  src={secondaryImage.src}
                  alt={secondaryImage.alt}
                  width={secondaryImage.width ?? 900}
                  height={secondaryImage.height ?? 900}
                  fallbackSrc="/assets/banner-oque-importa.png"
                  style={{ width: "100%", height: "auto", borderRadius: 14 }}
                />
              ) : null}
            </div>
            <article className="generic-content">
              {valueNarrative ? <p>{valueNarrative}</p> : null}
              {supportingParagraphs.slice(0, 3).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          </div>
        </section>
      </div>

      {/* ─── CTA STRIP ─────────────────────────────────────────── */}
      <div className="container">
        <div className="cta-strip">
          <div>
            <p className="cta-strip-title">
              Precisa de uma equipe<br />especializada?
            </p>
            <p className="cta-strip-sub">
              Entre em contato e receba um orçamento personalizado para seu projeto industrial.
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
