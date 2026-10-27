import RequestsList from "@/components/admin/RequestsList";
import { PageHeader } from "@/components/admin/ui";
import { requests } from "@/mvp-data/admin";

export default function AdminSolicitacoes() {
  return (
    <>
      <PageHeader title="Solicitações" subtitle="Imóveis enviados por proprietários na página “Anuncie”." />
      <RequestsList initial={requests} />
    </>
  );
}
