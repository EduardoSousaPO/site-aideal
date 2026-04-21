import Image from "next/image";
import Link from "next/link";
import FachadaHeroCarousel from "@/components/FachadaHeroCarousel";
import ServiceCardSlugIcon from "@/components/ServiceCardSlugIcon";
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget";
import IndustrialShowcasePanel from "@/components/IndustrialShowcasePanel";
import WhatsAppBrandIcon from "@/components/WhatsAppBrandIcon";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";
import { REVIEW_CARDS, WHATSAPP_URL } from "@/lib/site-config";

/** Logos clientes em grade estática (true) ou fileiras animadas (false). */
const USE_CLIENT_LOGOS_GRID = true;

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
  return raw.length > 88 ? `${raw.slice(0, 85).trim()}…` : raw;
}

function shortTrustLine(text: string, max = 68): string {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trim()}…`;
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

          <h1 className="hero-split-title hero-split-title--editorial">
            <span className="hero-split-title__years">Mais de 28 anos</span>
            <span className="hero-split-title__main">
              Referência em{" "}
              <span className="accent accent--inline">soluções anti corrosivas</span>
            </span>
            <span className="hero-split-title__scope">
              Indústrias de alta criticidade · atendimento em todo o Brasil
            </span>
          </h1>

          <ul className="hero-capabilities" aria-label="Principais frentes de atuação">
            <li>Pintura industrial</li>
            <li>Jateamento</li>
            <li>Revestimentos</li>
            <li>Acesso por cordas</li>
          </ul>
          <p className="hero-split-desc hero-split-desc--compact">
            Engenharia de superfície com rastreabilidade técnica e padrão operacional rigoroso.
          </p>

          <div className="hero-split-actions">
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <WhatsAppBrandIcon size={22} />
              Faça um orçamento
            </Link>
            <Link className="btn-outline-white" href="/sobre-nos">
              Quem somos
            </Link>
          </div>

          <div className="hero-split-chips hero-split-chips--lean">
            <span className="hero-chip">
              <span className="hero-chip__glyph" aria-hidden>
                ✓
              </span>
              Atuação nacional
            </span>
            <span className="hero-chip">
              <span className="hero-chip__glyph" aria-hidden>
                ✓
              </span>
              ISO em fase de certificação
            </span>
          </div>
        </div>

        {/* Right: imagem */}
        <div className="hero-split-media">
          <div className="hero-split-media-stage hero-split-media-stage--carousel">
            <FachadaHeroCarousel alt="Fachada e instalações da A Ideal Soluções Anticorrosivas" />
          </div>
        </div>
      </section>

      {/* ─── WAVE (dark → white) ─────────────────────────────────── */}
      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── ESPECIALISTAS / ABOUT ───────────────────────────────── */}
      <section className="container section-block" style={{ paddingTop: 0 }}>
        <div className="especialistas-grid">
          <div data-reveal>
            <IndustrialShowcasePanel />
          </div>

          <div className="especialistas-content" data-reveal style={{ paddingBottom: 48 }}>
            <div className="section-accent-head">
              <h2 className="display-title section-title">
                Especialistas em
                <span className="highlight"> Pintura Industrial</span>
              </h2>
            </div>
            <p className="especialistas-text especialistas-text--lead">
              Engenharia de superfície para os ambientes industriais mais exigentes do Brasil —
              performance, durabilidade e acabamento técnico.
            </p>
            <div className="about-trust-grid">
              {(highlights.length > 0
                ? highlights
                : [
                    "Qualidade garantida em engenharia de superfície.",
                    "Equipe focada em indústria de alta criticidade.",
                    "Agilidade em projetos em todo o território nacional.",
                  ]
              ).map((highlight) => (
                <div className="about-trust-item" key={highlight}>
                  <span className="about-trust-item__mark" aria-hidden>
                    ✓
                  </span>
                  <p>{shortTrustLine(highlight)}</p>
                </div>
              ))}
            </div>
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <WhatsAppBrandIcon size={22} />
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
          <header className="section-header section-header--centered section-header--services" data-reveal>
            <div className="section-accent-head section-accent-head--services">
              <h2 className="display-title section-title" style={{ color: "#fff" }}>
                Nossos
                <span className="highlight"> Serviços</span>
              </h2>
            </div>
            <p className="section-subtitle section-subtitle--narrow" style={{ color: "rgba(255,255,255,0.58)" }}>
              Cordas, jateamento, pintura e revestimentos — execução integrada com rastreabilidade.
            </p>
          </header>

          <div className="services-grid">
            {cards.map((page) => (
              <article className="service-card-dark" key={page.slug} data-reveal>
                <span className="service-card-dark-icon" aria-hidden="true">
                  <ServiceCardSlugIcon slug={page.slug} />
                </span>
                <h3>{serviceDisplayName(page)}</h3>
                <p className="service-card-dark__excerpt">{serviceCardDescription(page)}</p>
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
      <div className="map-section-wrap" id="contato">
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
            <p className="map-section-lead">
              Operação nacional com a mesma disciplina técnica da obra ao relatório final.
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
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              <WhatsAppBrandIcon size={22} />
              Solicitar visita técnica
            </Link>
          </div>
        </section>
      </div>

      {/* ─── CLIENTES DARK MARQUEE ───────────────────────────────── */}
      <div className="clients-dark-section" id="clientes">
        <div className="clients-dark-header">
          <h2 className="display-title section-title" style={{ color: "#fff" }} data-reveal>
            {USE_CLIENT_LOGOS_GRID ? (
              <>
                Quem confia na
                <span className="highlight"> A Ideal</span>
              </>
            ) : (
              <>
                Empresas que
                <span className="highlight"> confiam</span> na A Ideal
              </>
            )}
          </h2>
          <p className="section-subtitle section-subtitle--narrow clients-dark-header__sub">
            Grandes operações em energia, mineração, alimentos e infraestrutura.
          </p>
        </div>

        {USE_CLIENT_LOGOS_GRID ? (
          <div className="clients-logo-grid" data-reveal>
            {clientLogos.map((logoPath) => (
              <div className="clients-logo-grid__cell" key={logoPath}>
                <Image
                  src={logoPath}
                  alt="Logotipo de cliente A Ideal"
                  width={140}
                  height={48}
                  loading="lazy"
                  sizes="(max-width: 680px) 42vw, (max-width: 1024px) 28vw, 150px"
                  className="clients-logo-grid__img"
                  style={{ objectFit: "contain" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <div style={{ overflow: "hidden", display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ overflow: "hidden" }}>
              <div className="logo-track-dark logo-track-row1">
                {(() => {
                  const row1 = clientLogos.slice(0, Math.ceil(clientLogos.length / 2));
                  return [...row1, ...row1].map((logoPath, idx) => (
                    <div className="logo-pill-dark" key={`row1-${logoPath}-${idx}`}>
                      <Image
                        src={logoPath}
                        alt="Logotipo de cliente A Ideal"
                        width={120}
                        height={44}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div className="logo-track-dark logo-track-row2">
                {(() => {
                  const row2 = clientLogos.slice(Math.ceil(clientLogos.length / 2));
                  return [...row2, ...row2].map((logoPath, idx) => (
                    <div className="logo-pill-dark" key={`row2-${logoPath}-${idx}`}>
                      <Image
                        src={logoPath}
                        alt="Logotipo de cliente A Ideal"
                        width={120}
                        height={44}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>
        )}
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
            <p className="section-subtitle section-subtitle--narrow" style={{ marginTop: 8 }}>
              <strong>4,6/5</strong> no Google · 12 avaliações
            </p>
          </div>
        </header>
        <GoogleReviewsWidget fallbackReviews={REVIEW_CARDS} />
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
            <WhatsAppBrandIcon size={22} tone="brand" />
            Falar agora no WhatsApp
          </Link>
        </div>
      </div>

    </div>
  );
}
