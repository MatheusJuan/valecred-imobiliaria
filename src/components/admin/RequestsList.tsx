"use client";

import { useState } from "react";
import { Badge, Card } from "@/components/admin/ui";
import { formatShortDate } from "@/lib/format";
import type { AdRequest, RequestState } from "@/lib/types";

const tone = { Pendente: "yellow", Aprovada: "green", Rejeitada: "red" } as const;
const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export default function RequestsList({ initial }: { initial: AdRequest[] }) {
  const [rows, setRows] = useState(initial);
  const set = (id: string, state: RequestState) => setRows(rows.map((r) => (r.id === id ? { ...r, state } : r)));

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {rows.map((r) => (
        <Card key={r.id}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-lg font-bold">{r.category} para {r.status === "Venda" ? "venda" : "aluguel"}</p>
              <p className="text-sm text-muted">{r.neighborhood}, {r.city} · {formatShortDate(r.date)}</p>
            </div>
            <Badge tone={tone[r.state]}>{r.state}</Badge>
          </div>
          <p className="mt-3 text-sm font-semibold text-brand">{r.price == null ? "A Consultar" : brl.format(r.price)}{r.status === "Aluguel" ? "/mês" : ""}</p>
          <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div><dt className="text-xs text-muted">Proprietário</dt><dd>{r.name}</dd></div>
            <div><dt className="text-xs text-muted">Telefone</dt><dd>{r.phone}</dd></div>
            <div className="col-span-2"><dt className="text-xs text-muted">E-mail</dt><dd>{r.email}</dd></div>
          </dl>
          {r.state === "Pendente" ? (
            <div className="mt-5 flex gap-3">
              <button className="btn-primary !py-2" onClick={() => set(r.id, "Aprovada")}>Aprovar</button>
              <button className="btn-outline !py-2" onClick={() => set(r.id, "Rejeitada")}>Rejeitar</button>
            </div>
          ) : (
            <div className="mt-5 flex items-center gap-3 text-sm text-muted">
              {r.state === "Aprovada" && <span>Na fase final, aprovar cria o imóvel já preenchido.</span>}
              <button className="font-medium text-brand underline" onClick={() => set(r.id, "Pendente")}>Voltar para pendente</button>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
