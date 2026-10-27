import type { Metadata } from "next";
import { Suspense } from "react";
import ImoveisClient from "@/components/ImoveisClient";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = { title: "Imóveis | ValeCred Empreendimentos Imobiliários" };

export default function ImoveisPage() {
  return (
    <>
      <PageBanner title="Imóveis" crumbs={[{ label: "Imóveis" }]} />
      <div className="bg-surface">
        <Suspense fallback={<div className="container-site py-20 text-center text-muted">Carregando imóveis…</div>}>
          <ImoveisClient />
        </Suspense>
      </div>
    </>
  );
}
