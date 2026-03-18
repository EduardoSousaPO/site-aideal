import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

const namedEntityMap: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&nbsp;": " ",
  "&ndash;": "-",
  "&mdash;": "-",
};

export function decodeHtmlEntities(input: string): string {
  if (!input) return "";
  const withNamedEntities = input.replace(
    /&[a-zA-Z#0-9]+;/g,
    (entity) => namedEntityMap[entity] ?? entity,
  );

  return withNamedEntities
    .replace(/&#(\d+);/g, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 10)),
    )
    .replace(/&#x([a-f0-9]+);/gi, (_, codePoint) =>
      String.fromCodePoint(Number.parseInt(codePoint, 16)),
    );
}

export function stripHtml(input: string): string {
  return decodeHtmlEntities(input)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeText(input: string): string {
  return decodeHtmlEntities(input).replace(/\s+/g, " ").trim();
}
