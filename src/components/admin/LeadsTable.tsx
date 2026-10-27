"use client";

import { useState } from "react";
import { Badge, Card, td, th } from "@/components/admin/ui";
import { formatShortDate } from "@/lib/format";
import type { Lead, LeadStatus } from "@/lib/types";
import { siteSettings } from "@/mvp-data";

const statuses: LeadStatus[] = ["Novo", "Contatado", "Convertido", "Arquivado"];
const tone = { Novo: "green", Contatado: "blue", Convertido: "yellow", Arquivado: "gray" } as const;

export default function LeadsTable({ initial }: { initial: Lead[] }) {
  const [rows, setRows] = useState(initial);
  const [filter, setFilter] = useState<"" | LeadStatus>("");
  const shown = rows.filter((l) => !filter || l.status === filter);

  return (
    <Card className="!p-0">
      <div className="flex flex-wrap gap-2 border-b border-neutral-100 p-4">
        {(["", ...statuses] as const).map((s) => (
          <button key={s || "todos"} onClick={() => setFilter(s)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${filter === s ? "bg-brand text-white" : "bg-surface text-muted hover:bg-neutral-200"}`}>
            {s || "Todos"}{s ? ` (${rows.filter((l) => l.status === s).length})` : ` (${rows.length})`}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-surface/60">
            <tr><th className={th}>Contato</th><th className={th}>Tipo</th><th className={th}>Imóvel</th><th className={th}>Data</th><th className={th}>Status</th><th className={`${th} text-right`}>Ação</th></tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {shown.map((l) => (
              <tr key={l.id}>
                <td className={td}><p className="font-semibold">{l.name}</p><p className="text-xs text-muted">{l.phone}</p></td>
                <td className={td}>{l.type}</td>
                <td className={td}>{l.propertyCode ? <><b>{l.propertyCode}</b><span className="block max-w-[220px] truncate text-xs text-muted">{l.propertyTitle}</span></> : <span className="text-muted">—</span>}</td>
                <td className={td}>{formatShortDate(l.date)}</td>
                <td className={td}>
                  <select aria-label={`Status de ${l.name}`} value={l.status} className="field !w-auto !py-1.5"
                    onChange={(e) => setRows(rows.map((r) => (r.id === l.id ? { ...r, status: e.target.value as LeadStatus } : r)))}>
                    {statuses.map((s) => <option key={s}>{s}</option>)}
                  </select>
                  <span className="ml-2 hidden xl:inline"><Badge tone={tone[l.status]}>{l.status}</Badge></span>
                </td>
                <td className={`${td} text-right`}>
                  <a className="rounded-control bg-accent px-3 py-1.5 text-xs font-semibold hover:bg-accent-dark" target="_blank" rel="noopener noreferrer"
                    href={`https://wa.me/55${l.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Olá ${l.name}, aqui é da ${siteSettings.name}.`)}`}>
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
            {shown.length === 0 && <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-muted">Nenhum lead nesse status.</td></tr>}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
