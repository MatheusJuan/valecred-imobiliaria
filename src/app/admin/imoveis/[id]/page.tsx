import Link from "next/link";
import { notFound } from "next/navigation";
import PropertyForm from "@/components/admin/PropertyForm";
import { PageHeader } from "@/components/admin/ui";
import { properties } from "@/mvp-data";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export default async function EditarImovel({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const property = properties.find((p) => p.id === id);
  if (!property) notFound();
  return (
    <>
      <PageHeader
        title={`Editar ${property.code}`}
        subtitle={property.title}
        action={<Link href={`/admin/qrcode?property=${property.id}`} className="btn-outline">Gerar QR Code</Link>}
      />
      <PropertyForm property={property} />
    </>
  );
}
