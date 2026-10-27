"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";
import { applyFilters, parseFilters, sortProperties, type Filters } from "@/lib/filters";
import { cities, filterOptions, properties } from "@/mvp-data";

const PAGE_SIZE = 6;
const sorts = [
  ["relevancia", "Relevância"],
  ["preco-asc", "Menor preço"],
  ["preco-desc", "Maior preço"],
  ["area-desc", "Maior área"],
] as const;

export default function ImoveisClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const f = parseFilters(sp);

  const filtered = sortProperties(applyFilters(properties, f), f.sort);
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const page = Math.min(f.page, pages);
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const hrefWith = (patch: Record<string, string>) => {
    const p = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v ? p.set(k, v) : p.delete(k)));
    return `/imoveis?${p.toString()}`;
  };

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const p = new URLSearchParams();
    new FormData(e.currentTarget).forEach((v, k) => {
      if (typeof v === "string" && v.trim()) p.set(k, v.trim());
    });
    if (f.sort !== "relevancia") p.set("sort", f.sort);
    router.push(`/imoveis?${p.toString()}`);
  }

  const hasAdvanced = !!(f.bedrooms || f.bathrooms || f.parking || f.minPrice || f.maxPrice || f.minArea || f.maxArea);
  const hasAny = hasAdvanced || !!(f.q || f.status || f.category || f.city);
  const catCounts = applyFilters(properties, f, "category");

  const num = (name: keyof Filters, placeholder: string) => (
    <input name={name} type="number" min={0} defaultValue={f[name] ? String(f[name]) : ""} className="field" placeholder={placeholder} aria-label={placeholder} />
  );
  const sel = (name: keyof Filters, label: string, max: number) => (
    <select name={name} defaultValue={f[name] ? String(f[name]) : ""} className="field" aria-label={label}>
      <option value="">{label}</option>
      {Array.from({ length: max }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n}+</option>)}
    </select>
  );

  return (
    <div className="container-site py-10">
      {/* key refaz os valores padrão quando a URL muda (ex.: clique na barra lateral) */}
      <form key={sp.toString()} onSubmit={onSubmit} className="rounded-card bg-white p-4 shadow-md ring-1 ring-black/5 md:p-6">
        <div className="grid gap-3 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
          <input name="q" defaultValue={f.q} className="field" placeholder="Bairro, empreendimento ou código" aria-label="Buscar" />
          <select name="status" defaultValue={f.status} className="field" aria-label="Finalidade">
            <option value="">Qualquer finalidade</option>
            {filterOptions.statuses.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select name="category" defaultValue={f.category} className="field" aria-label="Tipo">
            <option value="">Qualquer tipo</option>
            {filterOptions.categories.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select name="city" defaultValue={f.city} className="field" aria-label="Cidade">
            <option value="">Qualquer cidade</option>
            {cities.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
          <button className="btn-primary" type="submit">Buscar</button>
        </div>
        <details open={hasAdvanced} className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-brand">Filtros avançados</summary>
          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-7">
            {sel("bedrooms", "Quartos", 4)}
            {sel("bathrooms", "Banheiros", 3)}
            {sel("parking", "Vagas", 3)}
            {num("minPrice", "Preço mín. (R$)")}
            {num("maxPrice", "Preço máx. (R$)")}
            {num("minArea", "Área mín. (m²)")}
            {num("maxArea", "Área máx. (m²)")}
          </div>
        </details>
      </form>

      <div className="mt-10 grid gap-8 lg:grid-cols-[250px_1fr]">
        <aside className="order-2 h-fit rounded-card bg-white p-5 shadow-sm ring-1 ring-black/5 lg:order-1">
          <h2 className="text-lg font-bold">Tipo de imóvel</h2>
          <ul className="mt-3 space-y-1 text-sm">
            <li>
              <Link href={hrefWith({ category: "", page: "" })} className={`flex justify-between rounded-control px-2 py-1.5 hover:bg-surface ${!f.category ? "font-semibold text-brand" : "text-muted"}`}>
                <span>Todos</span><span>{catCounts.length}</span>
              </Link>
            </li>
            {filterOptions.categories.map((c) => (
              <li key={c}>
                <Link href={hrefWith({ category: c, page: "" })} className={`flex justify-between rounded-control px-2 py-1.5 hover:bg-surface ${f.category === c ? "font-semibold text-brand" : "text-muted"}`}>
                  <span>{c}</span><span>{catCounts.filter((p) => p.category === c).length}</span>
                </Link>
              </li>
            ))}
          </ul>
          {hasAny && <Link href="/imoveis" className="mt-4 block text-sm font-medium text-brand underline">Limpar filtros</Link>}
        </aside>

        <section className="order-1 lg:order-2">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-muted"><b className="text-ink">{filtered.length}</b> {filtered.length === 1 ? "imóvel encontrado" : "imóveis encontrados"}</p>
            <label className="flex items-center gap-2 text-sm text-muted">
              Ordenar por
              <select className="field !w-auto" value={f.sort} onChange={(e) => router.push(hrefWith({ sort: e.target.value === "relevancia" ? "" : e.target.value, page: "" }))}>
                {sorts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="rounded-card bg-surface p-10 text-center">
              <p className="font-semibold">Nenhum imóvel encontrado com esses filtros.</p>
              <p className="mt-1 text-sm text-muted">Tente ampliar a busca ou limpar os filtros.</p>
              <Link href="/imoveis" className="btn-primary mt-5">Ver todos os imóveis</Link>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {visible.map((p) => <PropertyCard key={p.id} p={p} />)}
            </div>
          )}

          {pages > 1 && (
            <nav className="mt-10 flex justify-center gap-2" aria-label="Paginação">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link key={n} href={hrefWith({ page: n === 1 ? "" : String(n) })} aria-current={n === page ? "page" : undefined}
                  className={`flex h-10 w-10 items-center justify-center rounded-control text-sm font-semibold ${n === page ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-neutral-300 hover:bg-surface"}`}>
                  {n}
                </Link>
              ))}
            </nav>
          )}
        </section>
      </div>
    </div>
  );
}
