"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Card } from "@/components/admin/ui";
import type { Property } from "@/lib/types";
import { cities, filterOptions } from "@/mvp-data";

const lbl = "block text-sm font-medium";

function Section({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="mb-5 flex items-center gap-3 text-lg font-bold">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-sm">{n}</span>{title}
      </h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </Card>
  );
}

// MVP: nada é salvo. Na fase B vira Server Action + upload de fotos para o R2.
export default function PropertyForm({ property: p }: { property?: Property }) {
  const [onRequest, setOnRequest] = useState(p ? p.price == null : false);
  const [description, setDescription] = useState(p?.description ?? "");
  const [images, setImages] = useState<string[]>(p?.images ?? []);
  const [saved, setSaved] = useState(false);

  const move = (i: number, d: number) => {
    const j = i + d;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    setImages(next);
  };

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => { e.preventDefault(); setSaved(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
    >
      {saved && (
        <p className="rounded-control bg-brand/10 p-4 text-sm font-medium text-brand">
          Salvo (demonstração do MVP). Nenhum dado foi gravado. <Link href="/admin/imoveis" className="underline">Voltar à lista</Link>
        </p>
      )}

      <Section n={1} title="Informações básicas">
        <label className={`${lbl} md:col-span-2`}>Título *<input required className="field mt-1" defaultValue={p?.title} /></label>
        <label className={lbl}>Finalidade *
          <select required className="field mt-1" defaultValue={p?.status ?? ""}>
            <option value="" disabled>Selecione</option>
            {filterOptions.statuses.map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
        <label className={lbl}>Tipo *
          <select required className="field mt-1" defaultValue={p?.category ?? ""}>
            <option value="" disabled>Selecione</option>
            {filterOptions.categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className={lbl}>Preço (R$)
          <input type="number" min={0} disabled={onRequest} className="field mt-1 disabled:bg-surface" defaultValue={p?.price ?? ""} />
        </label>
        <label className="flex items-end gap-2 pb-2 text-sm"><input type="checkbox" checked={onRequest} onChange={(e) => setOnRequest(e.target.checked)} /> Preço “A Consultar”</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" defaultChecked={p?.featured} /> Imóvel em destaque</label>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" /> Privado (não aparece no site)</label>
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <label htmlFor="desc" className={lbl}>Descrição</label>
            <button
              type="button"
              className="rounded-control bg-accent px-3 py-1.5 text-xs font-semibold hover:bg-accent-dark"
              onClick={() => setDescription("Imóvel bem localizado, com ótimo aproveitamento dos espaços e acabamento cuidadoso. Ideal para quem busca conforto e segurança. (Texto gerado por IA, demonstração.)")}
            >
              ✨ Gerar descrição com IA
            </button>
          </div>
          <textarea id="desc" rows={5} className="field mt-1" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </Section>

      <Section n={2} title="Especificações e custos">
        <label className={lbl}>Área (m²) *<input required type="number" min={0} className="field mt-1" defaultValue={p?.area} /></label>
        <label className={lbl}>Quartos<input type="number" min={0} className="field mt-1" defaultValue={p?.bedrooms} /></label>
        <label className={lbl}>Banheiros<input type="number" min={0} className="field mt-1" defaultValue={p?.bathrooms} /></label>
        <label className={lbl}>Vagas<input type="number" min={0} className="field mt-1" defaultValue={p?.parking} /></label>
        <label className={lbl}>Cômodos<input type="number" min={0} className="field mt-1" defaultValue={p?.rooms} /></label>
        <label className={lbl}>Andares<input type="number" min={0} className="field mt-1" defaultValue={p?.floors} /></label>
        <label className={lbl}>Condomínio (R$)<input type="number" min={0} className="field mt-1" defaultValue={p?.condoFee} /></label>
        <label className={lbl}>Seguro (R$)<input type="number" min={0} className="field mt-1" defaultValue={p?.insurance} /></label>
      </Section>

      <Section n={3} title="Localização">
        <label className={lbl}>Cidade *
          <select required className="field mt-1" defaultValue={p?.city ?? ""}>
            <option value="" disabled>Selecione</option>
            {cities.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </label>
        <label className={lbl}>UF<input maxLength={2} className="field mt-1" defaultValue={p?.state ?? "SP"} /></label>
        <label className={lbl}>Bairro *<input required className="field mt-1" defaultValue={p?.neighborhood} /></label>
        <label className={lbl}>Endereço<input className="field mt-1" placeholder="Rua, número" /></label>
      </Section>

      <Section n={4} title="Marketing e SEO">
        <label className={`${lbl} md:col-span-2`}>Título SEO<input maxLength={70} className="field mt-1" placeholder="Até 70 caracteres" defaultValue={p ? `${p.title} em ${p.city}` : ""} /></label>
        <label className={`${lbl} md:col-span-2`}>Descrição SEO<textarea rows={2} maxLength={160} className="field mt-1" placeholder="Até 160 caracteres" /></label>
        <label className={`${lbl} md:col-span-2`}>Características (separadas por vírgula)
          <input className="field mt-1" defaultValue={p?.features.join(", ")} />
        </label>
        <label className={`${lbl} md:col-span-2`}>Vídeo (link de incorporação)<input className="field mt-1" placeholder="https://www.youtube.com/embed/..." /></label>
      </Section>

      <Section n={5} title="Mídia">
        <div className="md:col-span-2">
          <label className={lbl}>Fotos
            <input
              type="file" accept="image/jpeg,image/png,image/webp" multiple className="field mt-1"
              onChange={(e) => setImages([...images, ...Array.from(e.target.files ?? []).map((f) => URL.createObjectURL(f))])}
            />
          </label>
          {images.length > 0 && (
            <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {images.map((src, i) => (
                <li key={src + i} className="overflow-hidden rounded-control ring-1 ring-black/10">
                  <div className="relative aspect-[4/3]">
                    <Image src={src} alt={`Foto ${i + 1}`} fill unoptimized className="object-cover" />
                    {i === 0 && <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[11px] font-semibold">Capa</span>}
                  </div>
                  <div className="flex justify-between bg-white p-1.5 text-xs">
                    <button type="button" aria-label="Mover para trás" onClick={() => move(i, -1)} className="px-2 py-1 hover:bg-surface">←</button>
                    <button type="button" aria-label="Remover foto" onClick={() => setImages(images.filter((_, n) => n !== i))} className="px-2 py-1 text-red-700 hover:bg-red-50">Remover</button>
                    <button type="button" aria-label="Mover para frente" onClick={() => move(i, 1)} className="px-2 py-1 hover:bg-surface">→</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Section>

      <div className="flex flex-wrap justify-end gap-3">
        <Link href="/admin/imoveis" className="btn-outline">Cancelar</Link>
        <button type="submit" className="btn-primary">Salvar imóvel</button>
      </div>
    </form>
  );
}
