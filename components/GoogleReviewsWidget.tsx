"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import WhatsAppBrandIcon from "@/components/WhatsAppBrandIcon";
import { getInitials, getRelativeDate } from "@/lib/format";
import { WHATSAPP_URL } from "@/lib/site-config";

type ReviewFallback = {
  name: string;
  date: string;
  text: string;
  dateIso?: string;
  rating?: number;
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

function StarRow({ rating }: { rating: number }) {
  const n = Math.min(5, Math.max(0, Math.round(rating)));
  return (
    <span className="review-card-v2__stars" aria-label={`${n} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={i < n ? "review-card-v2__star review-card-v2__star--on" : "review-card-v2__star"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </span>
  );
}

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
            <WhatsAppBrandIcon size={22} />
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
          Não foi possível carregar o widget em tempo real. Exibindo o fallback local.
        </p>
      ) : null}
      <div className="review-grid">
        {fallbackReviews.map((review) => {
          const rating = review.rating ?? 5;
          const dateLabel = review.dateIso ? getRelativeDate(review.dateIso) : review.date;
          return (
            <article
              className="review-card review-card-v2"
              key={`${review.name}-${review.dateIso ?? review.date}`}
              data-reveal
            >
              <div className="review-card-v2__head">
                <div className="review-card-v2__avatar" aria-hidden>
                  {getInitials(review.name)}
                </div>
                <div className="review-card-v2__meta">
                  <div className="review-card-v2__name-row">
                    <strong>{review.name}</strong>
                    <StarRow rating={rating} />
                  </div>
                  <span className="review-card-v2__date-chip">{dateLabel}</span>
                </div>
              </div>
              <p className="review-card-v2__quote">{review.text}</p>
            </article>
          );
        })}
      </div>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
        <Link className="btn-primary" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
          <WhatsAppBrandIcon size={22} />
          Faça um orçamento
        </Link>
      </div>
    </>
  );
}
