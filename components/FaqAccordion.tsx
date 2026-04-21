"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/content";

type FaqAccordionProps = {
  title: string;
  items: FaqItem[];
};

export default function FaqAccordion({ title, items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <div className="faq-shell">
      {title ? (
        <h2 className="display-title section-title" style={{ margin: 0 }}>
          {title}
        </h2>
      ) : null}
      <div className="faq-box">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const questionId = `faq-question-${index}`;
          return (
            <article className="faq-item" key={item.question}>
              <button
                type="button"
                id={questionId}
                className={`faq-question${isOpen ? " open" : ""}`}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              >
                <span>{item.question}</span>
                <span className="faq-indicator" aria-hidden>
                  <svg className="faq-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 9L12 15L18 9"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={panelId}
                className={`faq-answer-panel${isOpen ? " faq-answer-panel--open" : ""}`}
                role="region"
                aria-labelledby={questionId}
                aria-hidden={!isOpen}
              >
                <p className="faq-answer">{item.answer}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
