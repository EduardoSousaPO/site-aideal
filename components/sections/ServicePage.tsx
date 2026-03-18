import Image from "next/image";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import HypnoticBackground from "@/components/HypnoticBackground";
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

  const faqTitle =
    page.headings.find((heading) => heading.text.toLowerCase().includes("perguntas"))?.text ??
    `Perguntas Frequentes sobre ${page.title}`;

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

      <section className="section-block surface-panel service-layout">
        <div data-reveal>
          {heroImage ? (
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width ?? 920}
              height={heroImage.height ?? 920}
              style={{ borderRadius: 16, width: "100%", height: "auto" }}
            />
          ) : (
            <Image
              src="/assets/banner-quem-somos.png"
              alt="Equipe técnica da A Ideal"
              width={900}
              height={620}
              style={{ borderRadius: 16, width: "100%", height: "auto" }}
            />
          )}
        </div>

        <article data-reveal>
          <h2 className="display-title section-title" style={{ fontSize: "2.35rem" }}>
            Principais
            <span className="highlight"> Vantagens</span>
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
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width ?? 700}
                  height={image.height ?? 700}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </figure>
            ))}
          </div>
          <div style={{ marginTop: 18, display: "flex", justifyContent: "center" }}>
            <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Faça um orçamento
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section-block">
        <FaqAccordion title={faqTitle} items={page.faqItems} />
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
          <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Faça um orçamento
          </Link>
        </div>
      </section>
    </div>
  );
}
