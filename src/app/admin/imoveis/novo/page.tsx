import PropertyForm from "@/components/admin/PropertyForm";
import { PageHeader } from "@/components/admin/ui";

export default function NovoImovel() {
  return (
    <>
      <PageHeader title="Novo imóvel" subtitle="Preencha as seções abaixo. O código é gerado automaticamente." />
      <PropertyForm />
    </>
  );
}
