import Image from "next/image";
import Link from "next/link";
import { CONTACT_INFO } from "@/lib/site-config";

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M16.5 3H7.5C5.01 3 3 5.01 3 7.5V16.5C3 18.99 5.01 21 7.5 21H16.5C18.99 21 21 18.99 21 16.5V7.5C21 5.01 18.99 3 16.5 3Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M15.9 11.4333C16.0111 12.1832 15.8829 12.9488 15.5334 13.6218C15.1839 14.2949 14.6309 14.8409 13.9535 15.1818C13.2761 15.5228 12.5089 15.6413 11.7607 15.5207C11.0126 15.4 10.3224 15.0463 9.78747 14.5114C9.25254 13.9765 8.89884 13.2863 8.77816 12.5381C8.65748 11.79 8.77599 11.0227 9.11694 10.3453C9.4579 9.66795 10.0039 9.11497 10.6769 8.76547C11.35 8.41597 12.1156 8.28773 12.8655 8.3988C13.6304 8.51224 14.3386 8.86874 14.8874 9.41757C15.4363 9.96639 15.7928 10.6746 15.9062 11.4395L15.9 11.4333Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M16.95 7.05H16.96" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 8C17.59 8 19 9.41 19 11V19H15V11.75C15 11.06 14.44 10.5 13.75 10.5C13.06 10.5 12.5 11.06 12.5 11.75V19H8.5V8H12.5V9.45C13.05 8.58 14.02 8 15.13 8H16Z" fill="currentColor" />
      <path d="M6 8H2V19H6V8Z" fill="currentColor" />
      <path d="M4 6.5C5.1 6.5 6 5.6 6 4.5C6 3.4 5.1 2.5 4 2.5C2.9 2.5 2 3.4 2 4.5C2 5.6 2.9 6.5 4 6.5Z" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div>
          <Image
            src="/assets/logos/logo-aideal-peq-1.webp"
            alt="Logo A Ideal"
            width={250}
            height={56}
          />
          <p className="footer-title" style={{ marginTop: 18 }}>
            Redes Sociais
          </p>
          <div className="social-links">
            <Link
              className="social-link"
              href={CONTACT_INFO.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </Link>
            <Link
              className="social-link"
              href={CONTACT_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </Link>
          </div>
        </div>

        <div>
          <p className="footer-title">Atendimento</p>
          <p>
            <Link href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</Link>
          </p>
          <p>
            <Link href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</Link>
          </p>
          <p>{CONTACT_INFO.address}</p>
        </div>

        <div>
          <p className="footer-title">Localização</p>
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,.3)" }}>
            <iframe
              src={CONTACT_INFO.mapEmbed}
              width="100%"
              height="180"
              title="Google Maps A Ideal"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      <div className="container footer-small">
        Todos os direitos autorais reservados A Ideal 2010 - 2026.
      </div>
    </footer>
  );
}
