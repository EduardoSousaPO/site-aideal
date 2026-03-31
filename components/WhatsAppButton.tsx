import Link from "next/link";
import { WHATSAPP_URL } from "@/lib/site-config";
import WhatsAppBrandIcon from "@/components/WhatsAppBrandIcon";

export default function WhatsAppButton() {
  return (
    <Link
      className="wa-floating"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
    >
      <WhatsAppBrandIcon size={30} tone="inherit" animated />
    </Link>
  );
}
