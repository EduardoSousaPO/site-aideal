import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <section className="section-block surface-panel" style={{ textAlign: "center" }}>
        <h1 className="display-title section-title">Página não encontrada</h1>
        <p className="section-subtitle" style={{ margin: "0 auto" }}>
          A rota solicitada não existe no novo site. Volte para a home para navegar pelos
          serviços e páginas institucionais.
        </p>
        <Link className="btn-primary" href="/" style={{ marginTop: 20 }}>
          Ir para Home
        </Link>
      </section>
    </div>
  );
}
