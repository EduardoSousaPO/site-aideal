import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import WaveSep from "@/components/WaveSep";
import { CONTACT_INFO } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale com a equipe da A Ideal para solicitar orçamento de pintura industrial e revestimentos anticorrosivos.",
};

export default function ContactPage() {
  return (
    <>
      {/* ─── HERO DARK FULL-BLEED ──────────────────────────────── */}
      <section className="page-hero-banner">
        <div className="container">
          <span className="pill-badge">Contato</span>
          <h1 className="display-title section-title" style={{ marginTop: 18, color: "#fff" }}>
            Fale com a
            <span className="highlight"> A Ideal</span>
          </h1>
          <p className="hero-text" style={{ maxWidth: 620, color: "rgba(255,255,255,0.8)", marginTop: 12 }}>
            Entre em contato para solicitar um orçamento ou esclarecer detalhes sobre os serviços
            industriais da A Ideal.
          </p>
        </div>
      </section>

      <WaveSep fill="#ffffff" bg="#02264a" />

      {/* ─── GRID DE CONTATO ───────────────────────────────────── */}
      <div className="container">
        <section className="section-block contact-grid">
          <article className="contact-card-dark" data-reveal>
            <div className="section-accent-head" style={{ borderColor: "var(--brand-red)" }}>
              <h2 className="display-title section-title" style={{ fontSize: "2.2rem", color: "#fff" }}>
                Canais de Contato
              </h2>
            </div>
            <div className="contact-list" style={{ marginTop: 20 }}>
              <p>
                <strong>Telefone:</strong>{" "}
                <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>
              </p>
              <p>
                <strong>E-mail:</strong>{" "}
                <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a>
              </p>
              <p>
                <strong>WhatsApp:</strong> {CONTACT_INFO.whatsapp}
              </p>
              <p>
                <strong>Endereço:</strong> {CONTACT_INFO.address}
              </p>
            </div>
            <div style={{ marginTop: 20, borderRadius: 12, overflow: "hidden" }}>
              <iframe
                src={CONTACT_INFO.mapEmbed}
                width="100%"
                height="280"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa de localização A Ideal"
                style={{ border: 0, display: "block" }}
              />
            </div>
          </article>

          <article className="surface-panel" data-reveal>
            <div className="section-accent-head">
              <h2 className="display-title section-title" style={{ fontSize: "2.2rem" }}>
                Formulário
              </h2>
            </div>
            <div style={{ marginTop: 20 }}>
              <ContactForm />
            </div>
          </article>
        </section>
      </div>
    </>
  );
}
