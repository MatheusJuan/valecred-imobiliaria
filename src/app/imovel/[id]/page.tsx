import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Gallery from "@/components/Gallery";
import Icon, { type IconName } from "@/components/Icon";
import InterestForm from "@/components/InterestForm";
import PropertyCard from "@/components/PropertyCard";
import ShareButtons from "@/components/ShareButtons";
import VisitForm from "@/components/VisitForm";
import { formatPrice, plural } from "@/lib/format";
import { agent, properties, siteSettings } from "@/mvp-data";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = properties.find((x) => x.id === id);
  return { title: p ? `${p.title} | ValeCred Empreendimentos Imobiliários` : "Imóvel não encontrado" };
}

const card = "rounded-card bg-white p-6 shadow-sm ring-1 ring-black/5 md:p-8";
const brl = (n: number) => `R$ ${n.toLocaleString("pt-BR")}`;

export default async function ImovelPage({ params }: Props) {
  const { id } = await params;
  const p = properties.find((x) => x.id === id);
  if (!p) notFound();

  const specs: [IconName, string, string | number][] = [["area", "Área útil", `${p.area} m²`]];
  if (p.bedrooms) specs.push(["bed", "Quartos", p.bedrooms]);
  if (p.bathrooms) specs.push(["bath", "Banheiros", p.bathrooms]);
  if (p.parking) specs.push(["car", "Vagas", p.parking]);
  if (p.rooms) specs.push(["door", "Cômodos", p.rooms]);
  if (p.floors) specs.push(["layers", "Andares", p.floors]);

  const similar = properties
    .filter((x) => x.id !== p.id && (x.category === p.category || x.city === p.city))
    .slice(0, 3);
  const address = `${p.neighborhood}, ${p.city} - ${p.state}`;
  const wa = encodeURIComponent(`Olá! Tenho interesse no imóvel ${p.code} - ${p.title}.`);
  const [priceMain, priceSuffix] = formatPrice(p).split("/");
  const priceTone = p.price == null ? "text-accent-dark" : "text-brand";

  return (
    <>
      <section className="px-3 pt-3 md:px-6">
        <div className="rounded-panel bg-brand py-8">
          <div className="container-site"><Breadcrumb items={[{ label: "Imóveis", href: "/imoveis" }, { label: p.code }]} /></div>
        </div>
      </section>

      <div className="bg-surface pb-16">
        <div className="container-site">
          <Link href="/imoveis" className="inline-flex items-center gap-2 py-6 text-sm font-semibold text-muted transition hover:text-brand">
            <span aria-hidden="true">‹</span> Voltar para busca
          </Link>

          <Gallery images={p.images} title={p.title} status={p.status} category={p.category} />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="min-w-0 space-y-8">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold md:text-4xl">{p.title}</h1>
                  <span className="rounded-full bg-brand px-3 py-1 text-xs font-bold tracking-wide text-white">{p.code}</span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-muted"><Icon name="pin" className="h-5 w-5 shrink-0 text-brand" />{address}</p>
                <div className="mt-5 lg:hidden">
                  <p className="text-sm text-muted">{p.status}</p>
                  <p className={`text-3xl font-bold ${priceTone}`}>{formatPrice(p)}</p>
                  {p.condoFee && <p className="text-sm text-muted">Condomínio: {brl(p.condoFee)}</p>}
                </div>
                <div className="mt-5"><ShareButtons title={`${p.title} - ${p.code}`} /></div>
              </div>

              <dl className="flex flex-wrap gap-y-4 rounded-card bg-white py-5 shadow-sm ring-1 ring-black/5">
                {specs.map(([icon, k, v]) => (
                  <div key={k} className="flex min-w-[110px] flex-1 flex-col items-center px-4 text-center sm:border-l sm:border-neutral-200 sm:first:border-l-0">
                    <Icon name={icon} className="h-6 w-6 text-brand" />
                    <dt className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-muted">{k}</dt>
                    <dd className="text-lg font-bold">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className={card}>
                <h2 className="mb-4 text-xl font-bold">Apresentação</h2>
                <p className="text-sm leading-relaxed text-muted">{p.description}</p>
              </div>

              {p.features.length > 0 && (
                <div className={card}>
                  <h2 className="mb-5 text-xl font-bold">Características</h2>
                  <ul className="grid gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2"><span className="font-bold text-brand">✓</span>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className={card}>
                <h2 className="mb-5 text-xl font-bold">Localização</h2>
                <p className="mb-4 text-sm text-muted">{address}</p>
                <iframe
                  title={`Mapa: ${address}`}
                  loading="lazy"
                  className="h-72 w-full rounded-card border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
                />
              </div>

              {p.floorPlans && (
                <div className={card}>
                  <h2 className="mb-5 text-xl font-bold">Plantas</h2>
                  <div className="space-y-3">
                    {p.floorPlans.map((fp, n) => (
                      <details key={fp.name} open={n === 0} className="rounded-control border border-neutral-200">
                        <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm font-semibold">
                          <span>{fp.name}</span>
                          <span className="font-normal text-muted">{fp.area} m² · {plural(fp.bedrooms, "quarto", "quartos")} · {fp.bathrooms} banh.</span>
                        </summary>
                        <div className="border-t border-neutral-200 p-4">
                          {fp.description && <p className="mb-4 text-sm text-muted">{fp.description}</p>}
                          <div className="relative mx-auto aspect-[800/520] max-w-xl">
                            <Image src={fp.image} alt={`Planta - ${fp.name}`} fill unoptimized className="object-contain" />
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </div>
              )}

              {p.videoUrl && (
                <div className={card}>
                  <h2 className="mb-5 text-xl font-bold">Vídeo</h2>
                  <div className="aspect-video overflow-hidden rounded-card">
                    {p.videoUrl === "placeholder" ? (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-brand text-white">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl text-ink">▶</span>
                        <span className="text-sm">Vídeo ilustrativo</span>
                      </div>
                    ) : (
                      <iframe title={`Vídeo: ${p.title}`} src={p.videoUrl} loading="lazy" allowFullScreen className="h-full w-full border-0" />
                    )}
                  </div>
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
              <div className="rounded-panel bg-brand-dark p-6 text-white shadow-xl">
                <p className="text-[11px] font-bold uppercase tracking-widest text-accent">{p.status === "Aluguel" ? "Valor mensal" : "Valor do investimento"}</p>
                <p className="mt-2 text-4xl font-bold">
                  {priceMain}{priceSuffix && <span className="ml-1 text-base font-normal text-white/70">/{priceSuffix}</span>}
                </p>
                {(p.condoFee || p.insurance) && (
                  <dl className="mt-5 space-y-2 border-t border-white/15 pt-4 text-sm">
                    {p.condoFee && <div className="flex justify-between"><dt className="text-white/70">Condomínio:</dt><dd className="font-semibold">{brl(p.condoFee)}</dd></div>}
                    {p.insurance && <div className="flex justify-between"><dt className="text-white/70">Seguro:</dt><dd className="font-semibold">{brl(p.insurance)}</dd></div>}
                  </dl>
                )}
                <a href={`https://wa.me/${siteSettings.whatsapp}?text=${wa}`} target="_blank" rel="noopener noreferrer" className="btn-accent mt-6 w-full gap-2 !py-3.5 shadow-lg">
                  <Image src="/brand/whatsapp.png" alt="" width={22} height={22} /> Chamar no WhatsApp
                </a>
              </div>

              <div className="rounded-panel bg-white p-6 shadow-lg ring-1 ring-black/5">
                <h2 className="mb-4 text-xl font-bold">Tenho interesse</h2>
                <InterestForm code={p.code} />
              </div>

              <div className="rounded-panel bg-white p-6 shadow-sm ring-1 ring-black/5">
                <h2 className="mb-4 text-lg font-bold">Agendar visita</h2>
                <VisitForm code={p.code} />
              </div>

              <div className="flex items-center gap-4 rounded-card bg-brand/10 p-4 ring-1 ring-brand/20">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full bg-surface">
                  <Image src={agent.photo} alt={agent.name} fill unoptimized className="object-cover" />
                </div>
                <div className="min-w-0 text-sm">
                  <p className="truncate font-semibold">{agent.name}</p>
                  <p className="text-xs font-semibold text-brand">{agent.creci}</p>
                  <p className="text-xs text-muted">{agent.phone}</p>
                </div>
              </div>
            </aside>
          </div>

          {similar.length > 0 && (
            <section className="mt-14">
              <h2 className="text-2xl font-bold">Imóveis similares</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {similar.map((s) => <PropertyCard key={s.id} p={s} />)}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
