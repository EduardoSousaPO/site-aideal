import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { CONTACT_INFO, WHATSAPP_URL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe da A Ideal para solicitar orçamento de pintura industrial e revestimentos anticorrosivos.",
};

export default function ContactPage() {
  return (
    <div className="container">
      <section className="section-block page-hero">
        <div className="page-hero-inner">
          <span className="pill-badge">Atendimento em todo o Brasil</span>
          <h1 className="display-title section-title" style={{ marginTop: 18, color: "#fff" }}>
            Solicite um
            <span className="highlight"> Orçamento</span>
          </h1>
          <p className="hero-text" style={{ maxWidth: 620 }}>
            Envie os dados do seu projeto e nossa equipe comercial retorna com uma proposta
            técnica aderente ao seu cenário de operação industrial.
          </p>
          <div className="contact-sla" data-reveal>
            Retorno comercial em até 1 dia útil.
          </div>
        </div>
      </section>

      <section className="section-block contact-grid">
        <article className="contact-card" data-reveal>
          <h2 className="display-title section-title" style={{ fontSize: "2.2rem" }}>
            Canais de Contato
          </h2>
          <div className="contact-quick-actions">
            <Link className="contact-quick-link" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
              WhatsApp
            </Link>
            <Link className="contact-quick-link" href={CONTACT_INFO.phoneHref}>
              Ligar agora
            </Link>
            <Link className="contact-quick-link" href={CONTACT_INFO.emailHref}>
              Enviar e-mail
            </Link>
          </div>
          <div className="contact-list">
            <p>
              <strong>Telefone:</strong> <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
            </p>
            <p>
              <strong>E-mail:</strong> <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
            </p>
            <p>
              <strong>WhatsApp:</strong> {CONTACT_INFO.whatsapp}
            </p>
            <p>
              <strong>Endereço:</strong> {CONTACT_INFO.address}
            </p>
          </div>
          <div className="surface-panel" style={{ marginTop: 20, padding: 0, overflow: "hidden" }}>
            <iframe
              src={CONTACT_INFO.mapEmbed}
              width="100%"
              height="280"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de localização A Ideal"
              style={{ border: 0 }}
            />
          </div>
        </article>

        <article className="surface-panel" data-reveal>
          <h2 className="display-title section-title" style={{ fontSize: "2.2rem" }}>
            Formulário
          </h2>
          <ContactForm />
        </article>
      </section>
    </div>
  );
}
