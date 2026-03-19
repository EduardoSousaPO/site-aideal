import Image from "next/image";
import Link from "next/link";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";
import { REVIEW_CARDS, WHATSAPP_URL } from "@/lib/site-config";

type HomeSectionsProps = {
  homePage: PageContent;
  servicePages: PageContent[];
  clientLogos: string[];
};

function serviceCardDescription(page: PageContent): string {
  const raw =
    page.paragraphs.find(
      (paragraph) =>
        paragraph.length > 70 &&
        !paragraph.includes("?") &&
        !paragraph.toLocaleLowerCase("pt-BR").includes("entre em contato"),
    ) ?? "Solução técnica com execução especializada para ambientes industriais exigentes.";
  return raw.length > 130 ? `${raw.slice(0, 127).trim()}...` : raw;
}

function serviceDisplayName(page: PageContent): string {
  if (page.slug === "piso-industrial-epoxy") return "Piso Industrial Epóxi";
  if (page.slug === "revestimento-de-borracha-liquida")
    return "Revestimento de Borracha Líquida";
  return page.title;
}


export default function HomeSections({
  homePage,
  servicePages,
  clientLogos,
}: HomeSectionsProps) {
  const highlights = homePage.paragraphs
    .filter((item) => item.includes("✅"))
    .map((item) => item.replace("✅", "").trim())
    .slice(0, 3);
  const cards = servicePages.slice(0, 9);

  return (
    <div className="site-shell">

      {/* ─── HERO SPLIT ──────────────────────────────────────────── */}
      <section className="hero-split" aria-label="Apresentação">
        {/* Left: conteúdo */}
        <div className="hero-split-content">
          <span className="hero-split-eyebrow">Especialistas industriais</span>

          <h1 className="hero-split-title">
            Soluções
            <span className="accent">anticorrosivas</span>
            <span style={{ fontSize: "0.6em", display: "block", fontFamily: "var(--font-body)", textTransform: "none", fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.01em", marginTop: 8 }}>
              para indústria de alta criticidade
            </span>
          </h1>

          <p className="hero-split-desc">
            Pintura industrial, jateamento, revestimentos anticorrosivos e acesso por cordas
            com rastreabilidade técnica e excelência operacional em todo o Brasil.
          </p>

          <div className="hero-split-actions">
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Faça um orçamento
            </Link>
            <Link className="btn-outline-white" href="/sobre-nos">
              Quem somos
            </Link>
          </div>

          <div className="hero-split-chips">
            <span className="hero-chip">✓ +25 anos de experiência</span>
            <span className="hero-chip">✓ Atuação nacional</span>
            <span className="hero-chip">✓ ISO certificado</span>
          </div>
        </div>

        {/* Right: imagem */}
        <div className="hero-split-media">
          <div className="hero-split-media-stage">
            <div className="hero-split-media-overlay" />
            <Image
              src="/assets/bandesk5.webp"
              alt="Aplicação de pintura industrial pela equipe A Ideal"
              fill
              priority
              style={{ objectFit: "contain", objectPosition: "center center" }}
            />
          </div>
        </div>
      </section>

      {/* ─── WAVE (dark → white) ─────────────────────────────────── */}
      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── ESPECIALISTAS / ABOUT ───────────────────────────────── */}
      <section className="container section-block" style={{ paddingTop: 0 }}>
        <div className="especialistas-grid">
          <div className="about-overlap" data-reveal>
            <div className="about-overlap-img-main">
              <Image
                src="/assets/2149878738.webp"
                alt="Equipe A Ideal aplicando revestimento anticorrosivo"
                width={620}
                height={440}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <div className="about-overlap-img-secondary">
              <Image
                src="/assets/hero-paint.webp"
                alt="Detalhe de pintura industrial com qualidade técnica"
                width={380}
                height={260}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          </div>

          <div className="especialistas-content" data-reveal style={{ paddingBottom: 48 }}>
            <div className="section-accent-head">
              <h2 className="display-title section-title">
                Especialistas em
                <span className="highlight"> Pintura Industrial</span>
              </h2>
            </div>
            <p className="especialistas-text">
              Com mais de 25 anos de experiência no mercado industrial, a A Ideal oferece
              soluções técnicas de alta performance, durabilidade e acabamento superior para
              os ambientes mais exigentes do Brasil.
            </p>
            <ul className="checklist" style={{ marginBottom: 28 }}>
              {(highlights.length > 0
                ? highlights
                : [
                    "Qualidade garantida na prestação de serviços de engenharia de superfície.",
                    "Equipe especializada para segmentos industriais de alta criticidade.",
                    "Agilidade e eficiência operacional em projetos nacionais.",
                  ]
              ).map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Falar com um especialista
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WAVE (white → dark) ─────────────────────────────────── */}
      <WaveSep fill="#02264a" bg="#ffffff" />

      {/* ─── SERVIÇOS (dark section) ─────────────────────────────── */}
      <section className="section-dark" id="servicos" aria-label="Nossos Serviços">
        <div className="container">
          <header className="section-header section-header--centered" data-reveal style={{ marginBottom: 48 }}>
            <div className="section-accent-head" style={{ borderColor: "var(--brand-red)", textAlign: "left", width: "100%" }}>
              <h2 className="display-title section-title" style={{ color: "#fff" }}>
                Nossos
                <span className="highlight"> Serviços</span>
              </h2>
            </div>
            <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.6)" }}>
              Estrutura operacional completa para acesso por cordas, jateamento,
              revestimentos anticorrosivos e manutenção de superfícies com rastreabilidade técnica.
            </p>
          </header>

          <div className="services-grid">
            {cards.map((page) => (
              <article className="service-card-dark" key={page.slug} data-reveal>
                <h3>{serviceDisplayName(page)}</h3>
                <p>{serviceCardDescription(page)}</p>
                <Link className="service-link" href={`/${page.slug}`}>
                  Saiba mais <span aria-hidden>→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WAVE (dark → white) ─────────────────────────────────── */}
      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── ATENDEMOS NO BRASIL ─────────────────────────────────── */}
      <div className="map-section-wrap">
        <section className="container map-layout">
          <div data-reveal>
            <Image
              src="/assets/brazil_01.webp"
              alt="Mapa do Brasil — atendimento nacional da A Ideal"
              width={1080}
              height={1080}
              style={{ width: "100%", height: "auto", maxWidth: 480 }}
            />
          </div>
          <div data-reveal>
            <div className="section-accent-head">
              <h2 className="display-title section-title">
                Atendemos em todo o
                <span className="highlight"> Brasil</span>
              </h2>
            </div>
            <p style={{ color: "var(--ink-soft)", marginBottom: 28, lineHeight: 1.7, marginTop: 12 }}>
              Da logística ao relatório técnico final, nossa equipe garante execução de excelência
              em qualquer estado. Energia, mineração, alimentos e indústria de base.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              {["Energia elétrica", "Mineração", "Alimentos & Bebidas", "Infraestrutura"].map((seg) => (
                <span key={seg} style={{
                  background: "#fff",
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  color: "var(--ink-strong)",
                  fontSize: "0.82rem",
                  fontWeight: 700,
                  padding: "6px 16px",
                }}>
                  {seg}
                </span>
              ))}
            </div>
            <Link className="btn-primary" href="/contato" style={{ display: "inline-flex" }}>
              Solicitar visita técnica
            </Link>
          </div>
        </section>
      </div>

      {/* ─── CLIENTES DARK MARQUEE ───────────────────────────────── */}
      <div className="clients-dark-section" id="clientes">
        <div className="clients-dark-header">
          <h2 className="display-title section-title" style={{ color: "#fff" }} data-reveal>
            Empresas que
            <span className="highlight"> confiam</span> na A Ideal
          </h2>
          <p className="section-subtitle" style={{ color: "rgba(255,255,255,0.6)", margin: "12px auto 0" }}>
            Energia, mineração, alimentos, infraestrutura e indústria de base.
          </p>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div className="logo-track-dark">
            {[...clientLogos, ...clientLogos].map((logoPath, idx) => (
              <div className="logo-pill-dark" key={`${logoPath}-${idx}`}>
                <Image
                  src={logoPath}
                  alt="Logotipo de cliente A Ideal"
                  width={120}
                  height={44}
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── WAVE (dark → white) ─────────────────────────────────── */}
      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── AVALIAÇÕES ──────────────────────────────────────────── */}
      <section className="container section-block">
        <header className="section-header" data-reveal>
          <div>
            <div className="section-accent-head">
              <h2 className="display-title section-title">
                O que falam de
                <span className="highlight"> nós</span>
              </h2>
            </div>
            <p className="section-subtitle" style={{ marginTop: 8 }}>
              Avaliação Google: <strong>4.6 de 5</strong>, com base em 12 avaliações.
            </p>
          </div>
        </header>
        <div className="review-grid">
          {REVIEW_CARDS.map((review) => (
            <article className="review-card" key={review.name} data-reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <strong style={{ fontSize: "1rem" }}>{review.name}</strong>
                <span style={{ color: "#f7b500", fontSize: "1.1rem" }}>★★★★★</span>
              </div>
              <small style={{ color: "#6a7f96" }}>{review.date}</small>
              <p style={{ color: "var(--ink-soft)", margin: 0 }}>{review.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ─── CTA STRIP ───────────────────────────────────────────── */}
      <div className="container">
        <div className="cta-strip">
          <div>
            <p className="cta-strip-title">Pronto para proteger<br />seu patrimônio?</p>
            <p className="cta-strip-sub">
              Solicite um orçamento gratuito e receba retorno em até 24h.
            </p>
          </div>
          <Link className="btn-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar agora no WhatsApp
          </Link>
        </div>
      </div>

    </div>
  );
}
