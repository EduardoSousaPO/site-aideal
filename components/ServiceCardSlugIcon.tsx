import type { PageContent } from "@/lib/content";

type Props = {
  slug: PageContent["slug"];
};

/** SVGs minimalistas por serviço (stroke, viewBox 24). */
export default function ServiceCardSlugIcon({ slug }: Props) {
  const common = {
    width: 26,
    height: 26,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (slug) {
    case "acesso-por-cordas":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 4v16M9 7l3-3 3 3M9 17l3 3 3-3" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      );
    case "hidrojateamento":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3c-3 4-6 7-6 11a6 6 0 0 0 12 0c0-4-3-7-6-11z" />
          <path d="M10 14h4" />
        </svg>
      );
    case "jateamento-abrasivo":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 18l6-6M10 12l2 2M14 8l4 4M6 6l2 2" />
          <circle cx="18" cy="6" r="2" />
        </svg>
      );
    case "pintura-industrial-anticorrosiva":
      return (
        <svg {...common} aria-hidden>
          <path d="M5 19l4-10 3 3 5-9 2 2-5 9-3-3-4 8z" />
          <path d="M3 21h6" />
        </svg>
      );
    case "piso-industrial-uretano":
    case "piso-industrial-mma":
    case "piso-industrial-epoxy":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 21V10l8-5 8 5v11" />
          <path d="M9 21v-6h6v6" />
        </svg>
      );
    case "revestimento-de-borracha-liquida":
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V7l8-4z" />
        </svg>
      );
    case "montagem-de-quick-deck":
      return (
        <svg {...common} aria-hidden>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M4 12h16" />
        </svg>
      );
    case "atestado-tecnico":
      return (
        <svg {...common} aria-hidden>
          <path d="M7 3h10v18l-5-3-5 3V3z" />
          <path d="M9 8h6M9 12h6" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M4 21V10l8-5 8 5v11" />
          <path d="M9 21v-4h6v4" />
        </svg>
      );
  }
}
