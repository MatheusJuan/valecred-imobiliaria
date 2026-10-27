import SettingsForm from "@/components/admin/SettingsForm";
import { PageHeader } from "@/components/admin/ui";

export default function AdminConfiguracoes() {
  return (
    <>
      <PageHeader title="Configurações" subtitle="Contato, identidade, SEO e analytics do site." />
      <SettingsForm />
    </>
  );
}
