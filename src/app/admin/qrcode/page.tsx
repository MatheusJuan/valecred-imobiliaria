import QrGenerator from "@/components/admin/QrGenerator";
import { PageHeader } from "@/components/admin/ui";
import { qrTargetUrl } from "@/lib/qr";
import { properties } from "@/mvp-data";

export default async function AdminQrCode({ searchParams }: { searchParams: Promise<{ property?: string }> }) {
  const { property } = await searchParams;
  const items = properties.map((p) => ({ id: p.id, code: p.code, title: p.title, url: qrTargetUrl("property", p).url }));
  const initialId = items.some((i) => i.id === property) ? (property as string) : "";

  return (
    <>
      <PageHeader title="QR Code" subtitle="Gere o QR Code do site ou de um imóvel para placas, banners e folders." />
      <QrGenerator site={qrTargetUrl("site").url} items={items} initialId={initialId} />
    </>
  );
}
