import type { ReactNode } from "react";

type ValueIconKey =
  | "responsabilidade-social"
  | "valorizacao-humana"
  | "transparencia"
  | "etica"
  | "qualidade"
  | "pontualidade";

type AboutValueIconsProps = {
  kind: ValueIconKey;
  className?: string;
};

const stroke = "#2c3139";
const accent = "#ef1717";

function IconFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {children}
      </svg>
    </span>
  );
}

export default function AboutValueIcon({ kind, className }: AboutValueIconsProps) {
  switch (kind) {
    case "responsabilidade-social":
      return (
        <IconFrame className={className}>
          <circle cx="26" cy="24" r="8" stroke={stroke} strokeWidth="3" />
          <path d="M16 47C16 39.82 21.82 34 29 34C36.18 34 42 39.82 42 47" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <circle cx="50" cy="18" r="7" stroke={accent} strokeWidth="3" />
          <path d="M42 36C44.56 33.5 48 32 51.7 32C59.05 32 65 37.95 65 45.3" stroke={accent} strokeWidth="3" strokeLinecap="round" />
        </IconFrame>
      );
    case "valorizacao-humana":
      return (
        <IconFrame className={className}>
          <circle cx="33" cy="22" r="9" stroke={stroke} strokeWidth="3" />
          <path d="M22 49C22 41.27 28.27 35 36 35C43.73 35 50 41.27 50 49" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M57.69 31.5C56.01 29.82 53.29 29.82 51.61 31.5C49.93 33.18 49.93 35.9 51.61 37.58L58.5 44.47L65.39 37.58C67.07 35.9 67.07 33.18 65.39 31.5C63.71 29.82 60.99 29.82 59.31 31.5L58.5 32.31L57.69 31.5Z" fill={accent} />
        </IconFrame>
      );
    case "transparencia":
      return (
        <IconFrame className={className}>
          <path d="M24 19H56C60.42 19 64 22.58 64 27V47L53 57H24C19.58 57 16 53.42 16 49V27C16 22.58 19.58 19 24 19Z" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
          <path d="M30 31H40" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <path d="M30 40H50" stroke={accent} strokeWidth="4" strokeLinecap="round" />
          <path d="M53 57V47H64" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
        </IconFrame>
      );
    case "etica":
      return (
        <IconFrame className={className}>
          <path d="M40.05 58.22L37.5 55.9C24 43.67 15 35.5 15 25.5C15 18.23 20.73 13 28 13C32.11 13 36.05 14.92 38.5 17.95C40.95 14.92 44.89 13 49 13C56.27 13 62 18.23 62 25.5C62 35.5 53 43.67 39.5 55.9L40.05 58.22Z" stroke={accent} strokeWidth="3.4" strokeLinejoin="round" />
        </IconFrame>
      );
    case "qualidade":
      return (
        <IconFrame className={className}>
          <path d="M40 14L57 20V34C57 45.7 49.96 53.93 40 58C30.04 53.93 23 45.7 23 34V20L40 14Z" stroke={stroke} strokeWidth="3" strokeLinejoin="round" />
          <path d="M32 35.5L37.5 41L48.5 29.5" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </IconFrame>
      );
    case "pontualidade":
      return (
        <IconFrame className={className}>
          <path d="M40 17C52.7 17 63 27.3 63 40" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M24.43 57C19.84 52.8 17 46.76 17 40C17 27.3 27.3 17 40 17" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
          <path d="M40 28V40L32.5 47.5" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M46 52L51.5 57.5L63.5 45.5" stroke={accent} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </IconFrame>
      );
    default:
      return null;
  }
}
