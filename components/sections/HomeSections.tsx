import Image from "next/image";
import Link from "next/link";
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
  return raw.length > 140 ? `${raw.slice(0, 137).trim()}...` : raw;
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
  const rawHeading = homePage.headings[0]?.text ?? "Especialistas em pintura industrial";
  const heroHeading = rawHeading.replace(/emPintura/gi, "em pintura").trim();
  const headingParts = heroHeading.split(/\s+industrial\s+/i);
  const heroMetrics = [
    { value: "20+", label: "anos de atuação industrial" },
    { value: "NR-35 / NR-33", label: "protocolos de segurança" },
    { value: "Brasil inteiro", label: "cobertura operacional" },
  ];

  const cards = servicePages.slice(0, 9);

  return (
    <div className="container">
      <section className="section-block hero-shell">
        <div className="hero-grid hero-grid--wordpress">
          <div className="hero-bg-image">
            <Image
              src="/assets/bandesk5.webp"
              alt=""
              fill
              priority
              sizes="100vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content" data-reveal>
            <span className="pill-badge pill-badge--blue">+ de 20 anos atendendo todo o Brasil</span>
            <h1 className="display-title hero-title">
              {headingParts.length > 1 ? (
                <>
                  {headingParts[0]}
                  <span className="highlight"> industrial</span>
                  {headingParts[1]}
                </>
              ) : (
                heroHeading
              )}
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
            <div className="hero-seal hero-seal--gold">Satisfação garantida desde 1997</div>
          </div>
        </div>
      </section>

      <section className="home-metrics" aria-label="Indicadores institucionais">
        {heroMetrics.map((metric) => (
          <article className="metric-card" key={metric.label} data-reveal>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section-block especialistas-section">
        <div className="especialistas-grid">
          <div className="especialistas-media" data-reveal>
            <Image
              src="/assets/2149878738.webp"
              alt="Detalhe de pintura industrial com equipamento especializado"
              width={600}
              height={400}
              style={{ width: "100%", height: "auto", borderRadius: 16 }}
            />
          </div>
          <div className="especialistas-content" data-reveal>
            <h2 className="display-title section-title">
              Especialistas em
              <span className="highlight"> Pintura Industrial</span>
            </h2>
            <p className="especialistas-text">
              Somos especialistas em pintura industrial, oferecendo soluções técnicas de alta
              performance, durabilidade e acabamento superior para ambientes industriais exigentes.
            </p>
            <Link className="btn-outline" href="/sobre-nos">
              Conheça nossa metodologia
            </Link>
          </div>
        </div>
      </section>

      <section className="section-block" id="servicos">
        <header className="section-header section-header--centered" data-reveal>
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
            style={{ width: "100%", height: "auto" }}
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
            href="/contato"
            style={{ marginTop: 16 }}
          >
            Falar com especialista
          </Link>
        </div>
      </section>

      <section className="section-block clients-section" id="clientes">
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
        <div className="logo-grid" data-reveal>
          {clientLogos.map((logoPath) => (
            <div className="logo-card" key={logoPath}>
              <Image src={logoPath} alt="Logotipo de cliente da A Ideal" width={140} height={70} style={{ objectFit: "contain" }} />
            </div>
          ))}
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
