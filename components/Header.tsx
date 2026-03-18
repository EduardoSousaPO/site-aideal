"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MAIN_NAV,
  MOBILE_EXTRA_LINKS,
  SERVICE_DROPDOWN,
  SERVICE_SLUGS,
  WHATSAPP_URL,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

function MenuIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 6H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isRouteActive = useMemo(
    () => (href: string) => {
      if (href === "/") return pathname === "/";
      if (href.startsWith("/#")) return false;
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname],
  );
  const isServiceRoute = SERVICE_SLUGS.some((slug) => pathname === `/${slug}`);

  return (
    <header className="top-header">
      <div className="container top-header-inner">
        <Link className="brand-logo" href="/" aria-label="Ir para home">
          <Image
            src="/assets/logos/logo-aideal-peq.png"
            alt="A Ideal Soluções Anticorrosivas"
            width={220}
            height={52}
            priority
          />
        </Link>

        <nav aria-label="Menu principal">
          <ul className="desktop-nav">
            {MAIN_NAV.map((item) =>
              item.isDropdown ? (
                <li
                  className={cn("dropdown-shell", desktopDropdownOpen && "open")}
                  key={item.label}
                  onMouseEnter={() => setDesktopDropdownOpen(true)}
                  onMouseLeave={() => setDesktopDropdownOpen(false)}
                >
                  <button
                    type="button"
                    className={cn("nav-link", isServiceRoute && "active")}
                    onClick={() => setDesktopDropdownOpen((current) => !current)}
                  >
                    {item.label} <ChevronDownIcon />
                  </button>
                  <div className="dropdown-panel">
                    {SERVICE_DROPDOWN.map((serviceItem) => (
                      <Link className="dropdown-item" key={serviceItem.href} href={serviceItem.href}>
                        {serviceItem.label}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    className={cn("nav-link", isRouteActive(item.href) && "active")}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Faça um orçamento
        </Link>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={mobileOpen}
          className="menu-button"
          onClick={() => setMobileOpen((current) => !current)}
        >
          <MenuIcon />
        </button>
      </div>

      <div className={cn("mobile-panel", mobileOpen && "open")}>
        <div className="container mobile-links">
          {MAIN_NAV.filter((item) => !item.isDropdown).map((item) => (
            <Link
              key={item.href}
              className="mobile-link"
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            className="mobile-link"
            onClick={() => setMobileServicesOpen((current) => !current)}
            style={{ textAlign: "left", border: 0, background: "transparent", cursor: "pointer" }}
          >
            Serviços
          </button>
          {mobileServicesOpen &&
            SERVICE_DROPDOWN.map((serviceItem) => (
              <Link
                key={serviceItem.href}
                className="mobile-link"
                href={serviceItem.href}
                onClick={() => setMobileOpen(false)}
                style={{ marginLeft: 8 }}
              >
                {serviceItem.label}
              </Link>
            ))}

          {MOBILE_EXTRA_LINKS.map((item) => (
            <Link
              key={item.href}
              className="mobile-link"
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            className="btn-primary"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            onClick={() => setMobileOpen(false)}
            style={{ marginTop: 6 }}
          >
            Faça um orçamento
          </Link>
        </div>
      </div>
    </header>
  );
}
