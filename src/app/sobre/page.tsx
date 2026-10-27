import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = { title: "Sobre nós | ValeCred Empreendimentos Imobiliários" };

const values = [
  { t: "Transparência", d: "Informação clara sobre valores, documentos e prazos em cada etapa." },
  { t: "Proximidade", d: "Atendimento humano, do primeiro contato até a entrega das chaves." },
  { t: "Compromisso", d: "Responsabilidade com cada cliente e com cada empreendimento." },
  { t: "Solidez", d: "A força e a tradição de um grupo com décadas de atuação." },
];

export default function SobrePage() {
  return (
    <>
      <PageBanner title="Sobre nós" crumbs={[{ label: "Sobre" }]} />

      <section className="py-16">
        <div className="container-site grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold md:text-3xl">Um time que vale a pena</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              A ValeCred Empreendimentos Imobiliários faz parte do grupo ValeCred, instituição com mais de 25 anos de atuação, sediada em Tatuí-SP.
              Levamos para o mercado imobiliário a mesma cultura de transparência, tecnologia e cuidado com as pessoas.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Nosso trabalho é ajudar você a encontrar o imóvel certo, seja para morar, alugar ou investir, com segurança e sem burocracia. #vempravale
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/imoveis" className="btn-primary">Ver imóveis</Link>
              <a href="https://www.valecred.com.br/" target="_blank" rel="noopener noreferrer" className="btn-outline">Conheça o grupo ValeCred</a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface">
            <Image src="/mvp/imovel-1.jpg" alt="Fachada ilustrativa" fill unoptimized className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="container-site">
          <h2 className="section-title">Nossos valores</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5">
                <span className="block h-1 w-10 bg-accent" />
                <h3 className="mt-4 font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm text-muted">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-3 py-3 md:px-6">
        <div className="rounded-panel bg-accent py-14">
          <div className="container-site text-center">
            <h2 className="text-2xl font-bold">Vamos conversar sobre o seu próximo imóvel?</h2>
            <Link href="/contato" className="btn-primary mt-6">Fale com a gente</Link>
          </div>
        </div>
      </section>
    </>
  );
}
