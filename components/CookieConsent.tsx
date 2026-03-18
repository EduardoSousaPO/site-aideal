"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "aideal_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(STORAGE_KEY);
    if (storedConsent) return;
    const timer = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const saveConsent = (value: "accepted" | "rejected") => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        value,
        date: new Date().toISOString(),
      }),
    );
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label="Consentimento de cookies">
      <strong>Privacidade e Cookies</strong>
      <p style={{ marginBottom: 0, marginTop: 8 }}>
        Utilizamos cookies para melhorar a navegação e medir desempenho. Você pode aceitar
        ou rejeitar cookies não essenciais a qualquer momento.
      </p>
      <div className="cookie-actions">
        <button type="button" className="accept" onClick={() => saveConsent("accepted")}>
          Aceitar
        </button>
        <button type="button" className="reject" onClick={() => saveConsent("rejected")}>
          Rejeitar
        </button>
      </div>
    </aside>
  );
}
