import Link from "next/link";
import PropertiesTable from "@/components/admin/PropertiesTable";
import { PageHeader } from "@/components/admin/ui";

export default function AdminImoveis() {
  return (
    <>
      <PageHeader
        title="Imóveis"
        subtitle="Cadastre, edite e publique os imóveis do site."
        action={<Link href="/admin/imoveis/novo" className="btn-primary">+ Novo imóvel</Link>}
      />
      <PropertiesTable />
    </>
  );
}
