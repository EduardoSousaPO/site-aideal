import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <section className="section-block surface-panel surface-panel--muted not-found-hero">
        <div className="not-found-hero__watermark" aria-hidden>
          404
        </div>
        <div className="not-found-hero__inner">
          <h1 className="display-title section-title">Página não encontrada</h1>
          <p className="section-subtitle not-found-hero__sub">
            A rota solicitada não existe no novo site. Volte para a home para navegar pelos
            serviços e páginas institucionais.
          </p>
          <div className="not-found-actions">
            <Link className="btn-primary" href="/">
              Ir para Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
