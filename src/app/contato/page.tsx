import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon, { type IconName } from "@/components/Icon";
import PageBanner from "@/components/PageBanner";
import { siteSettings as s } from "@/mvp-data";

export const metadata: Metadata = { title: "Contato | ValeCred Empreendimentos Imobiliários" };

export default function ContatoPage() {
  const info: [IconName, string, string][] = [
    ["pin", "Endereço", s.address],
    ["phone", "Telefone", s.phone],
    ["mail", "E-mail", s.email],
    ["clock", "Horário", s.hours],
  ];
  return (
    <>
      <PageBanner title="Contato" crumbs={[{ label: "Contato" }]} />
      <section className="py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-bold">Fale com a ValeCred</h2>
            <p className="mt-2 text-sm text-muted">Tire dúvidas, agende uma visita ou conte o que você procura.</p>
            <dl className="mt-6 space-y-4">
              {info.map(([icon, k, v]) => (
                <div key={k} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"><Icon name={icon} className="h-5 w-5" /></span>
                  <div>
                    <dt className="text-sm font-semibold">{k}</dt>
                    <dd className="text-sm text-muted">{v}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <ContactForm title="Envie uma mensagem" />
          </div>
        </div>
        <div className="container-site mt-12">
          <iframe
            title={`Mapa: ${s.address}`}
            loading="lazy"
            className="h-80 w-full rounded-panel border-0"
            src={`https://www.google.com/maps?q=${encodeURIComponent(s.address)}&output=embed`}
          />
        </div>
      </section>
    </>
  );
}
