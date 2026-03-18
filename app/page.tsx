import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeSections from "@/components/sections/HomeSections";
import { getClientLogos, getHomePage, getServicePages } from "@/lib/content";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: SITE_DESCRIPTION,
};

export default async function HomePage() {
  const [homePage, servicePages, clientLogos] = await Promise.all([
    getHomePage(),
    getServicePages(),
    getClientLogos(),
  ]);

  if (!homePage) notFound();

  return (
    <HomeSections
      homePage={homePage}
      servicePages={servicePages}
      clientLogos={clientLogos}
    />
  );
}
