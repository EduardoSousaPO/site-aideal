import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import WaveSep from "@/components/WaveSep";
import type { PageContent } from "@/lib/content";
import { CONTACT_INFO, WHATSAPP_URL } from "@/lib/site-config";
import { normalizeText, stripHtml } from "@/lib/utils";

type GenericPageProps = {
  page: PageContent;
};

type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets: string[];
};

const LEGAL_PAGE_SLUGS = new Set(["politica-de-privacidade", "termos-de-uso"]);

function toSectionId(title: string, index: number): string {
  const normalized = normalizeText(title)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `sec-${index + 1}-${normalized || "documento"}`;
}

function parseLegalContent(page: PageContent): { intro: string[]; sections: LegalSection[] } {
  const rawHtml = page.rawHtml ?? "";
  const firstHeadingIndex = rawHtml.search(/<h2[^>]*>/i);
  const introBlock = firstHeadingIndex >= 0 ? rawHtml.slice(0, firstHeadingIndex) : rawHtml;
  const intro = [...introBlock.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => stripHtml(match[1] ?? ""))
    .filter(
      (paragraph) =>
        paragraph.length > 0 &&
        !/^(claro|perfeito)[!,.]/i.test(paragraph) &&
        !paragraph.toLowerCase().includes("modelo de"),
    );

  const sections: LegalSection[] = [];
  const sectionMatches = rawHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>([\s\S]*?)(?=<h2[^>]*>|$)/gi);

  for (const match of sectionMatches) {
    const headingHtml = match[1];
    const bodyHtml = match[2];
    const title = stripHtml(headingHtml ?? "");
    if (!title) continue;

    const paragraphs = [...(bodyHtml ?? "").matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
      .map((match) => stripHtml(match[1] ?? ""))
      .filter(Boolean);

    const bullets = [...(bodyHtml ?? "").matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
      .map((match) => stripHtml(match[1] ?? ""))
      .filter(Boolean);

    sections.push({
      id: toSectionId(title, sections.length),
      title,
      paragraphs,
      bullets,
    });
  }

  if (sections.length === 0) {
    const headingSections = page.headings.filter((heading) => heading.level >= 2);
    return {
      intro: page.paragraphs.slice(0, 1),
      sections: headingSections.map((heading, index) => ({
        id: toSectionId(heading.text, index),
        title: heading.text,
        paragraphs: [],
        bullets: [],
      })),
    };
  }

  return { intro, sections };
}

function formatDateBR(dateValue: string): string {
  const parsedDate = new Date(dateValue);
  if (Number.isNaN(parsedDate.getTime())) return dateValue;
  return parsedDate.toLocaleDateString("pt-BR");
}

function fillContactPlaceholders(text: string): string {
  return text
    .replace(/E-mail:\s*\[\]/gi, `E-mail: ${CONTACT_INFO.email}`)
    .replace(/Telefone:\s*\[\]/gi, `Telefone: ${CONTACT_INFO.phone}`);
}

export default function GenericPage({ page }: GenericPageProps) {
  const isLegalPage = LEGAL_PAGE_SLUGS.has(page.slug);
  const paragraphBlocks = page.paragraphs.filter((paragraph) => paragraph.length > 0);
  const images = page.images.slice(0, 6);
  const legalContent = isLegalPage ? parseLegalContent(page) : null;

  return (
    <>
      {/* ─── HERO DARK FULL-BLEED ──────────────────────────────── */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="pill-badge">
            {isLegalPage ? "Documento institucional" : "A Ideal Soluções Anticorrosivas"}
          </span>
          <h1 className="display-title section-title" style={{ color: "#fff", marginTop: 16 }}>
            {page.title}
          </h1>
        </div>
      </section>

      <WaveSep fill="#ffffff" bg="#02264a" />

      <div className="container">
        {isLegalPage && legalContent ? (
          <section className="section-block legal-layout">
            <aside className="surface-panel legal-aside" data-reveal>
              <h2>Índice</h2>
              <nav aria-label={`Índice de ${page.title}`}>
                {legalContent.sections.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>
                    {section.title}
                  </a>
                ))}
              </nav>
              <div className="legal-meta">
                <span>Última atualização</span>
                <strong>{formatDateBR(page.modified)}</strong>
              </div>
            </aside>
            <article className="surface-panel legal-article">
              <div className="generic-content" data-reveal>
                {legalContent.intro.length > 0
                  ? legalContent.intro.map((paragraph) => (
                      <p key={paragraph}>{fillContactPlaceholders(paragraph)}</p>
                    ))
                  : null}
              </div>
              {legalContent.sections.map((section) => (
                <section className="legal-section" id={section.id} key={section.id} data-reveal>
                  <h3>{section.title}</h3>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{fillContactPlaceholders(paragraph)}</p>
                  ))}
                  {section.bullets.length > 0 ? (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{fillContactPlaceholders(bullet)}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>
          </section>
        ) : (
          <section className="section-block surface-panel">
            <article className="generic-content" data-reveal>
              {paragraphBlocks.length > 0 ? (
                paragraphBlocks.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
              ) : (
                <p>
                  Conteúdo institucional disponível nesta página. Para mais detalhes, entre em contato
                  com o time da A Ideal.
                </p>
              )}
            </article>
          </section>
        )}

        {images.length > 0 ? (
          <section className="section-block">
            <div className="service-gallery">
              {images.map((image) => (
                <figure key={image.src} data-reveal>
                  <SafeImage
                    src={image.src}
                    alt={image.alt}
                    width={image.width ?? 800}
                    height={image.height ?? 800}
                    fallbackSrc="/assets/banner-oque-importa.png"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </figure>
              ))}
            </div>
          </section>
        ) : null}

        {isLegalPage ? (
          <div className="cta-strip">
            <div>
              <p className="cta-strip-title">
                Dúvidas sobre<br />seus direitos?
              </p>
              <p className="cta-strip-sub">
                Para solicitações relacionadas à LGPD, termos e privacidade, fale com nosso canal
                oficial de atendimento.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
              <Link className="btn-white" href={CONTACT_INFO.emailHref}>
                {CONTACT_INFO.email}
              </Link>
              <Link className="btn-white" href={CONTACT_INFO.phoneHref}>
                {CONTACT_INFO.phone}
              </Link>
            </div>
          </div>
        ) : (
          <div className="cta-strip">
            <div>
              <p className="cta-strip-title">
                Precisa de<br />apoio técnico?
              </p>
              <p className="cta-strip-sub">
                Nossa equipe está pronta para detalhar escopo, metodologia de execução e estimativa
                de prazo para o seu projeto industrial.
              </p>
            </div>
            <Link className="btn-white" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              Fale com a equipe
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
