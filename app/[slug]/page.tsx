import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/sections/AboutPage";
import GenericPage from "@/components/sections/GenericPage";
import PdfPage from "@/components/sections/PdfPage";
import ServicePage from "@/components/sections/ServicePage";
import { getPageBySlug, getRouteSlugs, isServiceSlug } from "@/lib/content";
import { SITE_NAME } from "@/lib/site-config";

type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getRouteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return {};

  const title = page.seo?.yoast_title || page.title;
  const description =
    page.seo?.yoast_description || page.paragraphs[0] || `Página ${page.title} da ${SITE_NAME}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: page.seo?.og_image ? [page.seo.og_image] : undefined,
      locale: "pt_BR",
      type: "article",
    },
  };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page || page.slug === "home") notFound();

  if (page.isPdfPage) {
    return <PdfPage page={page} />;
  }

  if (page.slug === "sobre-nos") {
    return <AboutPage page={page} />;
  }

  if (isServiceSlug(page.slug)) {
    return <ServicePage page={page} />;
  }

  return <GenericPage page={page} />;
}
