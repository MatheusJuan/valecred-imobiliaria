import type { Property } from "./types";

// Domínio definitivo ainda não existe: configurar SITE_URL (futuro: site_settings).
// Nunca derivar da requisição, para ninguém gerar QR apontando para outro host.
export const siteUrl = () => (process.env.SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");

// Só dois alvos possíveis (allowlist): site principal ou imóvel existente.
export function qrTargetUrl(target: "site" | "property", property?: Property): { url: string; campaign: string } {
  const campaign = target === "site" || !property ? "site" : property.code;
  const path = target === "site" || !property ? "/" : `/imovel/${property.id}`;
  const utm = `utm_source=qr&utm_medium=print&utm_campaign=${encodeURIComponent(campaign)}`;
  return { url: `${siteUrl()}${path}?${utm}`, campaign };
}
