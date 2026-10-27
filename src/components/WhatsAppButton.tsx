import Image from "next/image";
import { siteSettings } from "@/mvp-data";

export default function WhatsAppButton() {
  const msg = encodeURIComponent("Olá! Vim pelo site da ValeCred e gostaria de mais informações.");
  return (
    <a
      href={`https://wa.me/${siteSettings.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 h-16 w-16 drop-shadow-lg transition hover:scale-110"
    >
      <Image src="/brand/whatsapp.png" alt="" width={64} height={64} />
    </a>
  );
}
