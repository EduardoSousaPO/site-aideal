"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site-config";

type ReviewFallback = {
  name: string;
  date: string;
  text: string;
};

type WidgetPayload = {
  ok: true;
  widgetHtml: string;
  cssUrl: string | null;
  loaderSrc: string;
};

type WidgetError = {
  ok: false;
  error: string;
};

type GoogleReviewsWidgetProps = {
  fallbackReviews: ReviewFallback[];
};

export default function GoogleReviewsWidget({
  fallbackReviews,
}: GoogleReviewsWidgetProps) {
  const [widget, setWidget] = useState<WidgetPayload | null>(null);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadWidget() {
      try {
        const response = await fetch("/api/google-reviews-widget", {
          cache: "no-store",
        });
        const data = (await response.json()) as WidgetPayload | WidgetError;

        if (cancelled) return;
        if (!response.ok || !data.ok) {
          setHasError(true);
          return;
        }

        setWidget(data);
      } catch {
        if (!cancelled) {
          setHasError(true);
        }
      }
    }

    loadWidget();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!widget) return;

    if (widget.cssUrl && !document.querySelector(`link[data-trustindex-css="${widget.cssUrl}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = widget.cssUrl;
      link.dataset.trustindexCss = widget.cssUrl;
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector(
      `script[data-trustindex-loader="${widget.loaderSrc}"]`,
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = widget.loaderSrc;
      script.async = true;
      script.dataset.trustindexLoader = widget.loaderSrc;
      document.body.appendChild(script);
      return;
    }

    const refreshed = document.createElement("script");
    refreshed.src = widget.loaderSrc;
    refreshed.async = true;
    refreshed.dataset.trustindexLoaderRefresh = "true";
    document.body.appendChild(refreshed);

    return () => {
      refreshed.remove();
    };
  }, [widget]);

  if (widget) {
    return (
      <div className="google-reviews-widget-shell" data-reveal>
        <div
          ref={containerRef}
          className="google-reviews-widget"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: widget.widgetHtml }}
        />
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Faça um orçamento
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {hasError ? (
        <p className="section-subtitle" style={{ marginTop: 8 }}>
          Nao foi possivel carregar o widget em tempo real. Exibindo o fallback local.
        </p>
      ) : null}
      <div className="review-grid">
        {fallbackReviews.map((review) => (
          <article className="review-card" key={review.name} data-reveal>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <strong style={{ fontSize: "1rem" }}>{review.name}</strong>
              <span style={{ color: "#f7b500", fontSize: "1.1rem" }}>★★★★★</span>
            </div>
            <small style={{ color: "#6a7f96" }}>{review.date}</small>
            <p style={{ color: "var(--ink-soft)", margin: 0 }}>{review.text}</p>
          </article>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          Faça um orçamento
        </Link>
      </div>
    </>
  );
}
