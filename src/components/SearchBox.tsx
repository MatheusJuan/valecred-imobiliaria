"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { cities, filterOptions } from "@/mvp-data";

export default function SearchBox() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("Venda");
  const [more, setMore] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("status", status);
    new FormData(e.currentTarget).forEach((v, k) => {
      if (typeof v === "string" && v.trim()) params.set(k, v.trim());
    });
    router.push(`/imoveis?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-4xl rounded-card bg-white p-4 shadow-xl md:p-6">
      <div className="mb-4 flex gap-1 text-sm font-semibold">
        {filterOptions.statuses.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatus(s)}
            className={`rounded-control px-4 py-2 transition ${status === s ? "bg-brand text-white" : "bg-surface text-ink hover:bg-neutral-200"}`}
          >
            {s === "Venda" ? "Comprar" : s === "Aluguel" ? "Alugar" : s}
          </button>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <input name="q" className="field" placeholder="Bairro, empreendimento ou código (ex.: VD0001)" aria-label="Buscar por texto" />
        <select name="category" className="field" aria-label="Tipo de imóvel" defaultValue="">
          <option value="">Qualquer tipo</option>
          {filterOptions.categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select name="city" className="field" aria-label="Cidade" defaultValue="">
          <option value="">Qualquer cidade</option>
          {cities.map((c) => <option key={c.name}>{c.name}</option>)}
        </select>
        <button className="btn-primary" type="submit">Buscar</button>
      </div>
      <button type="button" onClick={() => setMore(!more)} className="mt-3 text-sm font-medium text-brand">
        {more ? "− Menos opções" : "+ Mais opções"}
      </button>
      {more && (
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <select name="bedrooms" className="field" aria-label="Quartos" defaultValue="">
            <option value="">Quartos</option>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
          <select name="bathrooms" className="field" aria-label="Banheiros" defaultValue="">
            <option value="">Banheiros</option>
            {[1, 2, 3].map((n) => <option key={n} value={n}>{n}+</option>)}
          </select>
          <input name="minPrice" type="number" min={0} className="field" placeholder="Preço mínimo (R$)" aria-label="Preço mínimo" />
          <input name="maxPrice" type="number" min={0} className="field" placeholder="Preço máximo (R$)" aria-label="Preço máximo" />
        </div>
      )}
    </form>
  );
}
