import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";
import {
  DEFAULT_FAQ_BY_SLUG,
  PDF_PAGE_MAP,
  SERVICE_SLUGS,
  WHATSAPP_URL,
} from "@/lib/site-config";
import { normalizeText, stripHtml } from "@/lib/utils";

const CONTENT_DIR = path.join(process.cwd(), "aideal-clone", "content", "pages");
const CLIENT_LOGOS_DIR = path.join(process.cwd(), "public", "assets", "clients");

const RAW_TO_CANONICAL_SLUG: Record<string, string> = {
  "home-aideal": "home",
  "acesso-por-cordas-cloned-346": "hidrojateamento",
};

const CANONICAL_TO_RAW_SLUG = new Map<string, string>(
  Object.entries(RAW_TO_CANONICAL_SLUG).map(([raw, canonical]) => [canonical, raw]),
);

export interface PageHeading {
  level: number;
  text: string;
}

export interface PageImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface PageButton {
  text: string;
  href: string;
  target: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageContent {
  id: number;
  slug: string;
  rawSlug: string;
  title: string;
  link: string;
  date: string;
  modified: string;
  seo: {
    yoast_title?: string | null;
    yoast_description?: string | null;
    og_image?: string | null;
  };
  featuredImageUrl?: string | null;
  headings: PageHeading[];
  paragraphs: string[];
  images: PageImage[];
  buttons: PageButton[];
  listItems: string[];
  plainText: string;
  rawHtml: string;
  faqItems: FaqItem[];
  isPdfPage: boolean;
  pdfUrl?: string;
}

interface RawPage {
  id: number;
  slug: string;
  title: string;
  link: string;
  date: string;
  modified: string;
  seo: {
    yoast_title?: string | null;
    yoast_description?: string | null;
    og_image?: string | null;
  };
  featured_image_url?: string | null;
  headings?: Array<{ level: number; text: string }>;
  paragraphs?: string[];
  images?: Array<{
    src: string;
    alt?: string;
    width?: string | number | null;
    height?: string | number | null;
  }>;
  buttons?: Array<{ text?: string; href?: string; target?: string }>;
  listItems?: string[];
  plainText?: string;
  raw_html?: string;
}

const serviceSlugSet = new Set<string>(SERVICE_SLUGS);

function toNumber(value: string | number | null | undefined) {
  if (typeof value === "number") return Number.isNaN(value) ? undefined : value;
  if (typeof value === "string") {
    const numeric = Number.parseInt(value, 10);
    return Number.isNaN(numeric) ? undefined : numeric;
  }
  return undefined;
}

function canonicalizeSlug(slug: string): string {
  return RAW_TO_CANONICAL_SLUG[slug] ?? slug;
}

function rawSlugFromCanonical(slug: string): string {
  return CANONICAL_TO_RAW_SLUG.get(slug) ?? slug;
}

function normalizeTitle(title: string): string {
  return normalizeText(title).replace(/Valeres/gi, "Valores");
}

function normalizeHref(href?: string): string {
  if (!href) return "";
  const trimmed = href.trim();
  if (!trimmed) return "";

  if (/wa\.me/i.test(trimmed)) return WHATSAPP_URL;

  const wpPathMatch = trimmed.match(
    /https?:\/\/(?:www\.)?aideal\.com\.br\/?([^?#]*)/i,
  );
  if (wpPathMatch) {
    const pathParts = wpPathMatch[1]
      .split("/")
      .map((part) => part.trim())
      .filter(Boolean);
    const maybeSlug = pathParts[0];
    if (!maybeSlug) return "/";

    const canonical = canonicalizeSlug(maybeSlug);
    return canonical === "home" ? "/" : `/${canonical}`;
  }

  if (trimmed.startsWith("/")) {
    const pathParts = trimmed
      .replace(/^\//, "")
      .split("/")
      .filter(Boolean);
    if (pathParts.length === 0) return "/";
    const maybeSlug = canonicalizeSlug(pathParts[0]);
    return maybeSlug === "home" ? "/" : `/${maybeSlug}`;
  }

  return trimmed;
}

function normalizeImageSrc(src: string): string {
  const safeSrc = src.trim();
  if (/^http:\/\//i.test(safeSrc)) return safeSrc.replace(/^http:\/\//i, "https://");
  return safeSrc;
}

function dedupe(items: string[]): string[] {
  const result: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const normalized = normalizeText(item);
    if (!normalized || seen.has(normalized)) continue;
    seen.add(normalized);
    result.push(normalized);
  }
  return result;
}

function normalizeFaq(rawHtml: string, paragraphs: string[], slug: string): FaqItem[] {
  const parsedFaq: FaqItem[] = [];
  const faqRegex =
    /<a class="elementor-accordion-title"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<div id="elementor-tab-content-[^"]+"[^>]*>([\s\S]*?)<\/div>/g;

  for (const match of rawHtml.matchAll(faqRegex)) {
    const question = stripHtml(match[1] ?? "");
    const answer = stripHtml(match[2] ?? "");
    if (!question || !answer) continue;
    parsedFaq.push({ question, answer });
  }

  const uniqueParsedFaq = parsedFaq.filter(
    (faq, index, list) =>
      list.findIndex((item) => item.question === faq.question) === index,
  );
  if (uniqueParsedFaq.length > 0) return uniqueParsedFaq.slice(0, 4);

  const fallbackFromParagraphs: FaqItem[] = [];
  for (let index = 0; index < paragraphs.length - 1; index += 1) {
    const current = paragraphs[index];
    const next = paragraphs[index + 1];
    if (!current.includes("?")) continue;
    if (!next || next.includes("?")) continue;
    fallbackFromParagraphs.push({ question: current, answer: next });
  }
  if (fallbackFromParagraphs.length > 0) return fallbackFromParagraphs.slice(0, 4);

  return DEFAULT_FAQ_BY_SLUG[slug] ?? [];
}

function transformRawPage(raw: RawPage): PageContent {
  const slug = canonicalizeSlug(raw.slug);
  const paragraphs = dedupe(raw.paragraphs ?? []);
  const rawHtml = raw.raw_html ?? "";
  const headings: PageHeading[] = (raw.headings ?? [])
    .map((heading) => ({
      level: heading.level,
      text: normalizeText(heading.text),
    }))
    .filter((heading) => heading.text.length > 0);

  const images: PageImage[] = (raw.images ?? [])
    .map((image) => ({
      src: normalizeImageSrc(image.src),
      alt: normalizeText(image.alt ?? "") || "Imagem institucional da A Ideal",
      width: toNumber(image.width),
      height: toNumber(image.height),
    }))
    .filter((image) => image.src.length > 0);

  const buttons: PageButton[] = (raw.buttons ?? [])
    .map((button) => ({
      text: normalizeText(button.text ?? ""),
      href: normalizeHref(button.href),
      target: button.target?.trim() || "_self",
    }))
    .filter((button) => button.text.length > 0);

  const listItems = dedupe(raw.listItems ?? []);
  const faqItems = normalizeFaq(rawHtml, paragraphs, slug);
  const normalizedTitle = normalizeTitle(raw.title);
  const isPdfPage = Object.prototype.hasOwnProperty.call(PDF_PAGE_MAP, slug);

  return {
    id: raw.id,
    slug,
    rawSlug: raw.slug,
    title: normalizedTitle,
    link: normalizeHref(raw.link) || raw.link,
    date: raw.date,
    modified: raw.modified,
    seo: raw.seo ?? {},
    featuredImageUrl: raw.featured_image_url
      ? normalizeImageSrc(raw.featured_image_url)
      : null,
    headings,
    paragraphs,
    images,
    buttons,
    listItems,
    plainText: normalizeText(raw.plainText ?? ""),
    rawHtml,
    faqItems,
    isPdfPage,
    pdfUrl: isPdfPage ? PDF_PAGE_MAP[slug] : undefined,
  };
}

const loadAllPages = cache(async (): Promise<PageContent[]> => {
  const files = await fs.readdir(CONTENT_DIR);
  const jsonFiles = files.filter((file) => file.endsWith(".json"));

  const rawPages = await Promise.all(
    jsonFiles.map(async (fileName) => {
      const fullPath = path.join(CONTENT_DIR, fileName);
      const rawContent = await fs.readFile(fullPath, "utf8");
      return JSON.parse(rawContent) as RawPage;
    }),
  );

  return rawPages
    .map(transformRawPage)
    .sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
});

export async function getAllPages(): Promise<PageContent[]> {
  return loadAllPages();
}

export async function getRouteSlugs(): Promise<string[]> {
  const pages = await loadAllPages();
  return pages.filter((page) => page.slug !== "home").map((page) => page.slug);
}

export async function getHomePage(): Promise<PageContent | null> {
  const pages = await loadAllPages();
  return pages.find((page) => page.slug === "home") ?? null;
}

export async function getPageBySlug(slug: string): Promise<PageContent | null> {
  const canonicalSlug = canonicalizeSlug(slug);
  const pages = await loadAllPages();
  return pages.find((page) => page.slug === canonicalSlug) ?? null;
}

export async function getServicePages(): Promise<PageContent[]> {
  const pages = await loadAllPages();
  const pageBySlug = new Map(pages.map((page) => [page.slug, page]));

  return SERVICE_SLUGS.map((slug) => pageBySlug.get(slug))
    .filter((page): page is PageContent => Boolean(page));
}

export async function getClientLogos(): Promise<string[]> {
  const files = await fs.readdir(CLIENT_LOGOS_DIR);
  return files
    .filter((file) => /\.(png|webp|jpg|jpeg|svg)$/i.test(file))
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((file) => `/assets/clients/${file}`);
}

export function isServiceSlug(slug: string): boolean {
  return serviceSlugSet.has(slug);
}

export function getRawSlugFromCanonical(slug: string): string {
  return rawSlugFromCanonical(slug);
}
