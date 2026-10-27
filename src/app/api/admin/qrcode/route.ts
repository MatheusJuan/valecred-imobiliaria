import QRCode from "qrcode";
import { qrTargetUrl } from "@/lib/qr";
import { properties } from "@/mvp-data";

// MVP: sem autenticação. Na fase B3 exige sessão do admin; B7 adiciona format=pdf.
export async function GET(req: Request) {
  const sp = new URL(req.url).searchParams;
  const target = sp.get("target");
  if (target !== "site" && target !== "property") return new Response("target inválido", { status: 400 });

  const property = target === "property" ? properties.find((p) => p.id === sp.get("id")) : undefined;
  if (target === "property" && !property) return new Response("imóvel não encontrado", { status: 404 });

  const { url, campaign } = qrTargetUrl(target, property);
  const png = await QRCode.toBuffer(url, { type: "png", width: 1024, margin: 4, errorCorrectionLevel: "M" });

  const disposition = sp.get("download") ? `attachment; filename="qr-${campaign.toLowerCase()}.png"` : "inline";
  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png", "Content-Disposition": disposition, "Cache-Control": "no-store" },
  });
}
