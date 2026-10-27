"use client";

import Link from "next/link";
import { useState } from "react";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";

const byPrice = (a: Property, b: Property) => (a.price ?? Infinity) - (b.price ?? Infinity);

export default function SaleRentTabs({ items }: { items: Property[] }) {
  const [tab, setTab] = useState<"Venda" | "Aluguel">("Venda");
  const list = items.filter((p) => p.status === tab).sort(byPrice).slice(0, 6);
  return (
    <div>
      <div className="mt-8 flex justify-center gap-2">
        {(["Venda", "Aluguel"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-control px-6 py-2.5 text-sm font-semibold transition ${tab === t ? "bg-brand text-white" : "bg-white text-ink ring-1 ring-neutral-300 hover:bg-neutral-100"}`}
          >
            {t === "Venda" ? "Para comprar" : "Para alugar"}
          </button>
        ))}
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => <PropertyCard key={p.id} p={p} />)}
      </div>
      <div className="mt-8 text-center">
        <Link href={`/imoveis?status=${tab}`} className="btn-outline">Ver todos os imóveis</Link>
      </div>
    </div>
  );
}
