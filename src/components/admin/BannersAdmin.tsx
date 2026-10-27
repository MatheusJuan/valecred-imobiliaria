"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge, Card } from "@/components/admin/ui";
import type { HeroBanner } from "@/lib/types";

function Toggle({ on, onChange, label }: { on: boolean; onChange: () => void; label: string }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${on ? "bg-brand" : "bg-neutral-300"}`}>
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
    </button>
  );
}

export default function BannersAdmin({ initialBanners, initialSections }: { initialBanners: HeroBanner[]; initialSections: { key: string; label: string; on: boolean }[] }) {
  const [banners, setBanners] = useState(initialBanners);
  const [sections, setSections] = useState(initialSections);

  return (
    <div className="grid gap-8 xl:grid-cols-[1.5fr_1fr]">
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Banners do topo</h2>
        {banners.map((b) => (
          <Card key={b.id} className="flex flex-wrap items-center gap-4 !p-4">
            <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-control"><Image src={b.image} alt="" fill unoptimized className="object-cover" /></div>
            <div className="min-w-[180px] flex-1">
              <p className="font-semibold">{b.title}</p>
              <p className="text-sm text-muted">{b.subtitle}</p>
              <p className="mt-1 text-xs text-muted">Botão “{b.buttonLabel}” → {b.link}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge tone={b.active ? "green" : "gray"}>{b.active ? "Ativo" : "Inativo"}</Badge>
              <Toggle on={b.active} label={`Ativar ${b.title}`} onChange={() => setBanners(banners.map((x) => (x.id === b.id ? { ...x, active: !x.active } : x)))} />
            </div>
          </Card>
        ))}
        <button type="button" className="btn-outline">+ Novo banner</button>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-bold">Seções da home</h2>
        <Card>
          <ul className="divide-y divide-neutral-100">
            {sections.map((s) => (
              <li key={s.key} className="flex items-center justify-between gap-3 py-3 text-sm">
                <span>{s.label}</span>
                <Toggle on={s.on} label={`Exibir ${s.label}`} onChange={() => setSections(sections.map((x) => (x.key === s.key ? { ...x, on: !x.on } : x)))} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
