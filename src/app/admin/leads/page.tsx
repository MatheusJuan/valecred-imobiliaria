import LeadsTable from "@/components/admin/LeadsTable";
import { PageHeader } from "@/components/admin/ui";
import { leads } from "@/mvp-data/admin";

export default function AdminLeads() {
  return (
    <>
      <PageHeader title="Leads" subtitle="Interessados que entraram em contato pelo site." />
      <LeadsTable initial={leads} />
    </>
  );
}
