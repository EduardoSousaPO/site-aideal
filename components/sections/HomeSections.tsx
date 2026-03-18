import Image from "next/image";
import Link from "next/link";
import HypnoticBackground from "@/components/HypnoticBackground";
import type { PageContent } from "@/lib/content";
import { REVIEW_CARDS, WHATSAPP_URL } from "@/lib/site-config";

type HomeSectionsProps = {
  homePage: PageContent;
  servicePages: PageContent[];
  clientLogos: string[];
};

function serviceCardDescription(page: PageContent): string {
  return (
    page.paragraphs.find(
      (paragraph) =>
        paragraph.length > 70 &&
        !paragraph.includes("?") &&
        !paragraph.toLocaleLowerCase("pt-BR").includes("entre em contato"),
    ) ?? "Solução técnica com execução especializada para ambientes industriais exigentes."
  );
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
  const introParagraph = homePage.paragraphs[0] ?? "";
  const heroHeading = (homePage.headings[0]?.text ?? "Especialistas em pintura industrial")
    .replace("emPintura", "em pintura")
    .replace("Industrial", "industrial");

  const cards = servicePages.slice(0, 9);
  const repeatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="container">
      <section className="section-block hero-shell">
        <div className="hero-grid">
          <HypnoticBackground />

          <div className="hero-content" data-reveal>
            <span className="pill-badge">+ de 20 anos atendendo todo o Brasil</span>
            <h1 className="display-title hero-title">
              {heroHeading.split("industrial").map((part, index, list) => (
                <span key={`${part}-${index}`}>
                  {part}
                  {index < list.length - 1 ? <span className="highlight">industrial</span> : null}
                </span>
              ))}
            </h1>
            <p className="hero-text">{introParagraph}</p>
            <div className="hero-actions">
              <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                Faça um orçamento
              </Link>
              <Link className="btn-secondary" href="#servicos">
                Conheça os serviços
              </Link>
            </div>
            <div className="hero-seal">Satisfação garantida desde 1997</div>
          </div>

          <div className="hero-media" data-parallax>
            <figure className="hero-media-frame" data-reveal>
              <Image
                src="/assets/hero-paint.webp"
                alt="Equipe da A Ideal em pintura industrial"
                width={1000}
                height={667}
                priority
              />
            </figure>
          </div>
        </div>
      </section>

      <section className="section-block" id="servicos">
        <header className="section-header" data-reveal>
          <h2 className="display-title section-title">
            Conheça os nossos
            <span className="highlight"> Serviços</span>
          </h2>
          <p className="section-subtitle">
            Estrutura operacional para acesso por cordas, jateamento, hidrojateamento,
            revestimentos anticorrosivos e manutenção de superfícies com rastreabilidade técnica.
          </p>
        </header>

        <div className="services-grid">
          {cards.map((page) => (
            <article className="service-card" key={page.slug} data-reveal data-tilt>
              <span
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 4,
                  background: "var(--brand-red)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 12,
                }}
              >
                ✓
              </span>
              <h3>{serviceDisplayName(page)}</h3>
              <p>{serviceCardDescription(page)}</p>
              <Link className="service-link" href={`/${page.slug}`}>
                Clique aqui e conheça <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block surface-panel map-layout">
        <div data-reveal>
          <Image
            src="/assets/brazil_01.webp"
            alt="Mapa do Brasil para atendimento nacional"
            width={1080}
            height={1080}
          />
        </div>
        <div data-reveal>
          <h2 className="display-title section-title">
            Atendemos em todo o
            <span className="highlight"> Brasil</span>
          </h2>
          <ul className="checklist">
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
          <Link
            className="btn-primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            style={{ marginTop: 16 }}
          >
            Faça um orçamento
          </Link>
        </div>
      </section>

      <section className="section-block" id="clientes">
        <header className="section-header" data-reveal>
          <h2 className="display-title section-title">
            Alguns
            <span className="highlight"> Clientes</span>
          </h2>
          <p className="section-subtitle">
            Empresas dos setores de energia, mineração, alimentos, infraestrutura e indústria de
            base confiam na execução da A Ideal.
          </p>
        </header>
        <div className="logo-marquee" data-reveal>
          <div className="logo-track">
            {repeatedLogos.map((logoPath, index) => (
              <div className="logo-pill" key={`${logoPath}-${index}`}>
                <Image src={logoPath} alt="Logotipo de cliente da A Ideal" width={130} height={56} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block">
        <header className="section-header" data-reveal>
          <h2 className="display-title section-title">
            O que falam de
            <span className="highlight"> nós</span>
          </h2>
          <p className="section-subtitle">
            Avaliação totalizada Google: <strong>4.6 de 5</strong>, com base em 12 avaliações.
          </p>
        </header>
        <div className="review-grid">
          {REVIEW_CARDS.map((review) => (
            <article className="review-card" key={review.name} data-reveal>
              <strong>{review.name}</strong>
              <small style={{ color: "#6a7f96" }}>{review.date}</small>
              <p>{review.text}</p>
              <span style={{ color: "#f7b500" }}>★★★★★</span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
