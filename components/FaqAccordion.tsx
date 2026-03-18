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
    <section className="faq-shell" data-reveal>
      <h2 className="display-title section-title" style={{ color: "#fff", margin: 0 }}>
        {title}
      </h2>
      <div className="faq-box">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <article className="faq-item" key={item.question}>
              <button
                type="button"
                className={`faq-question${isOpen ? " open" : ""}`}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
              >
                <span>{item.question}</span>
                <span className="faq-indicator" aria-hidden>
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
