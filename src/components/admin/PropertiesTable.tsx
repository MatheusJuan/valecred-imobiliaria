"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Badge, Card, td, th } from "@/components/admin/ui";
import { formatPrice } from "@/lib/format";
import { applyFilters, parseFilters } from "@/lib/filters";
import { filterOptions, properties } from "@/mvp-data";

export default function PropertiesTable() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [removed, setRemoved] = useState<string[]>([]);

  const f = parseFilters({ get: (k) => ({ q, status, category }[k as "q"] ?? null) });
  const rows = applyFilters(properties, f).filter((p) => !removed.includes(p.id));

  return (
    <Card className="!p-0">
      <div className="grid gap-3 border-b border-neutral-100 p-4 md:grid-cols-[1fr_180px_200px]">
        <input className="field" placeholder="Buscar por título, código ou bairro" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="field" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Finalidade">
          <option value="">Todas finalidades</option>
          {filterOptions.statuses.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="field" value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Tipo">
          <option value="">Todos os tipos</option>
          {filterOptions.categories.map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-surface/60">
            <tr><th className={th}>Imóvel</th><th className={th}>Código</th><th className={th}>Finalidade</th><th className={th}>Preço</th><th className={th}>Marcações</th><th className={`${th} text-right`}>Ações</th></tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {rows.map((p) => (
              <tr key={p.id} className="hover:bg-surface/40">
                <td className={td}>
                  <div className="flex items-center gap-3">
                    <div className="relative h-12 w-14 shrink-0 overflow-hidden rounded-control"><Image src={p.images[0]} alt="" fill unoptimized className="object-cover" /></div>
                    <div className="min-w-0"><p className="truncate font-semibold">{p.title}</p><p className="truncate text-xs text-muted">{p.neighborhood}, {p.city}</p></div>
                  </div>
                </td>
                <td className={td}>{p.code}</td>
                <td className={td}><Badge tone={p.status === "Lançamento" ? "yellow" : "green"}>{p.status}</Badge></td>
                <td className={`${td} font-semibold`}>{formatPrice(p)}</td>
                <td className={td}>{p.featured ? <Badge tone="yellow">Destaque</Badge> : <span className="text-muted">—</span>}</td>
                <td className={`${td} text-right`}>
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/qrcode?property=${p.id}`} className="rounded-control border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-surface">QR Code</Link>
                    <Link href={`/admin/imoveis/${p.id}`} className="rounded-control border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-surface">Editar</Link>
                    <button className="rounded-control border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50" onClick={() => confirm(`Excluir ${p.code}? (demonstração)`) && setRemoved([...removed, p.id])}>Excluir</button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">Nenhum imóvel encontrado.</td></tr>}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
