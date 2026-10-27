import BannersAdmin from "@/components/admin/BannersAdmin";
import { PageHeader } from "@/components/admin/ui";
import { banners, homeSections } from "@/mvp-data/admin";

export default function AdminBanners() {
  return (
    <>
      <PageHeader title="Banners Home" subtitle="Banners do topo e seções exibidas na página inicial." />
      <BannersAdmin initialBanners={banners} initialSections={homeSections} />
    </>
  );
}
