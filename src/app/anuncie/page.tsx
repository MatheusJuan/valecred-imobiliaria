import type { Metadata } from "next";
import AnuncieForm from "@/components/AnuncieForm";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = { title: "Anuncie seu imóvel | ValeCred Empreendimentos Imobiliários" };

const steps = [
  ["1", "Envie os dados", "Preencha o formulário com as informações do seu imóvel."],
  ["2", "Análise do time", "Avaliamos o imóvel e entramos em contato para alinhar os detalhes."],
  ["3", "Divulgação", "Seu imóvel é publicado no site e divulgado para quem procura."],
];

export default function AnunciePage() {
  return (
    <>
      <PageBanner title="Anuncie seu imóvel" crumbs={[{ label: "Anuncie" }]} />
      <section className="py-16">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map(([n, t, d]) => (
              <div key={n} className="rounded-card bg-surface p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent font-bold">{n}</span>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-1 text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-12 max-w-3xl rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8">
            <AnuncieForm />
          </div>
        </div>
      </section>
    </>
  );
}
