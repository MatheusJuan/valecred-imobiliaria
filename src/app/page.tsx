import Image from "next/image";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import SaleRentTabs from "@/components/SaleRentTabs";
import SearchBox from "@/components/SearchBox";
import ContactForm from "@/components/ContactForm";
import { cities, posts, properties } from "@/mvp-data";
import BlogCard from "@/components/BlogCard";

const why = [
  { t: "Grupo sólido", d: "Parte do grupo ValeCred, com tradição e credibilidade no mercado.", icon: "M12 3 4 6v6c0 5 3.400 8 8 9 4.600-1 8-4 8-9V6l-8-3Zm-1 12-3-3 1.400-1.400L11 12.200l4.600-4.600L17 9l-6 6Z" },
  { t: "Atendimento próximo", d: "Um time que acompanha você do primeiro contato até a entrega das chaves.", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" },
  { t: "Transparência", d: "Informação clara sobre valores, documentos e prazos, sem surpresas.", icon: "M12 5C7 5 2.700 8.100 1 12c1.700 3.900 6 7 11 7s9.300-3.100 11-7c-1.700-3.900-6-7-11-7Zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" },
  { t: "Imóveis selecionados", d: "Casas, apartamentos, terrenos e lançamentos avaliados com critério.", icon: "M3 21V8l9-5 9 5v13h-6v-7H9v7H3Z" },
];

export default function Home() {
  const featured = properties.filter((p) => p.featured && p.status !== "Lançamento").slice(0, 3);
  const launches = properties.filter((p) => p.status === "Lançamento");

  return (
    <>
      {/* Hero */}
      <section className="px-3 pb-4 pt-3 md:px-6">
        <div className="relative isolate flex min-h-[calc(100svh-80px-28px)] items-center overflow-hidden rounded-panel bg-brand">
          <Image src="/mvp/hero.jpg" alt="" fill priority unoptimized className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-dark/70 via-black/40 to-brand-dark/70" aria-hidden="true" />
          <div className="container-site w-full py-16">
            <h1 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-tight text-white md:text-5xl">
              Que tal encontrar o seu lugar?
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-white/85">
              Compre, alugue ou conheça nossos lançamentos. #vempravale
            </p>
            <div className="mt-10"><SearchBox /></div>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <h2 className="section-title">Imóveis em destaque</h2>
          <p className="section-sub">Seleção de oportunidades para você conhecer.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Lançamentos: foto + cartão sobreposto (padrão da matriz) */}
      <section className="py-16">
        <div className="container-site">
          <h2 className="section-title">Lançamentos e empreendimentos</h2>
          <p className="section-sub">Projetos ValeCred para quem quer investir ou morar com segurança.</p>
          <div className="mt-10 space-y-10">
            {launches.slice(0, 2).map((p, i) => (
              <div key={p.id} className="relative md:min-h-[320px]">
                <div className={`relative h-64 overflow-hidden rounded-panel md:h-[320px] md:w-[65%] ${i % 2 ? "md:ml-auto" : ""}`}>
                  <Image src={p.images[0]} alt={p.title} fill unoptimized className="object-cover" />
                </div>
                <div className={`rounded-panel bg-white p-8 shadow-lg md:absolute md:top-1/2 md:w-[45%] md:-translate-y-1/2 ${i % 2 ? "md:left-0" : "md:right-0"}`}>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold">Lançamento</span>
                  <h3 className="mt-3 text-2xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted">{p.neighborhood}, {p.city} - {p.state}</p>
                  <p className="mt-3 text-sm text-muted">{p.description}</p>
                  <Link href={`/imovel/${p.id}`} className="btn-primary mt-5">Saiba mais</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Venda / Locação */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <h2 className="section-title">Encontre o imóvel ideal</h2>
          <p className="section-sub">Do menor para o maior preço. Imóveis “A Consultar” aparecem por último.</p>
          <SaleRentTabs items={properties} />
        </div>
      </section>

      {/* Imóveis por cidade */}
      <section className="py-16">
        <div className="container-site">
          <h2 className="section-title">Imóveis por cidade</h2>
          <p className="section-sub">Escolha a cidade e veja o que temos disponível.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {cities.map((c, i) => {
              const count = properties.filter((p) => p.city === c.name).length;
              return (
                <Link
                  key={c.name}
                  href={`/imoveis?city=${encodeURIComponent(c.name)}`}
                  className={`group relative block h-56 overflow-hidden rounded-card ${i === 0 ? "md:col-span-2" : ""}`}
                >
                  <Image src={c.image} alt={c.name} fill unoptimized className="object-cover transition duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 to-transparent p-5 text-center text-white">
                    <span className="text-2xl font-bold">{c.name}</span>
                    <span className="text-sm">{count} {count === 1 ? "imóvel" : "imóveis"}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Por que a ValeCred */}
      <section className="px-3 py-3 md:px-6">
        <div className="rounded-panel bg-brand py-16 text-white">
          <div className="container-site">
            <h2 className="text-center text-2xl font-bold md:text-3xl">Por que a ValeCred?</h2>
            <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-white/80">Um time que vale a pena.</p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w) => (
                <div key={w.t} className="text-center">
                  <svg className="mx-auto text-accent" width="44" height="44" viewBox="0 0 24 24" fill="currentColor"><path d={w.icon} /></svg>
                  <h3 className="mt-4 font-semibold">{w.t}</h3>
                  <p className="mt-2 text-sm text-white/80">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anuncie */}
      <section className="px-3 py-3 md:px-6">
        <div className="rounded-panel bg-accent py-14">
          <div className="container-site text-center">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">Tem um imóvel para vender ou alugar?</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-ink/80">Anuncie com a ValeCred e conte com um time para cuidar de tudo.</p>
            <Link href="/anuncie" className="btn-primary mt-6">Anunciar meu imóvel</Link>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="py-16">
        <div className="container-site">
          <h2 className="section-title">Blog</h2>
          <p className="section-sub">Dicas para comprar, alugar e investir em imóveis.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {posts.map((b) => <BlogCard key={b.slug} b={b} />)}
          </div>
        </div>
      </section>

      {/* Contato */}
      <section className="bg-surface py-16">
        <div className="container-site">
          <ContactForm title="Fale com a ValeCred" subtitle="Conte o que você procura e retornamos o quanto antes." />
        </div>
      </section>
    </>
  );
}
