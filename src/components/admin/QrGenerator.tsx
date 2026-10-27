"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/admin/ui";

type Item = { id: string; code: string; title: string; url: string };

export default function QrGenerator({ site, items, initialId }: { site: string; items: Item[]; initialId: string }) {
  const [id, setId] = useState(initialId); // "" = site principal
  const current = items.find((i) => i.id === id);
  const qs = id ? `target=property&id=${id}` : "target=site";
  const url = current ? current.url : site;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
      <Card>
        <label className="block text-sm font-medium">O que o QR Code abre?
          <select className="field mt-1" value={id} onChange={(e) => setId(e.target.value)}>
            <option value="">Site principal (home)</option>
            {items.map((i) => <option key={i.id} value={i.id}>{i.code} · {i.title}</option>)}
          </select>
        </label>

        <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-muted">Endereço codificado</p>
        <p className="mt-1 break-all rounded-control bg-surface p-3 text-sm">{url}</p>
        <p className="mt-2 text-xs text-muted">
          O trecho <code>utm_*</code> permite ver no Google Analytics quantos acessos vieram do QR. O domínio definitivo ainda não existe; ao publicar, o endereço passa a ser o do site oficial.
        </p>

        <ul className="mt-6 space-y-1.5 text-sm text-muted">
          <li>✓ PNG de 1024 px, correção de erro nível M e margem de 4 módulos (leitura confiável na impressão).</li>
          <li>✓ Preto sobre branco, que é o contraste mais seguro para leitores.</li>
          <li>• Versão final também terá PDF A4 pronto para imprimir (layout a aprovar).</li>
        </ul>
      </Card>

      <Card className="text-center">
        <div className="relative mx-auto aspect-square w-full max-w-[300px] overflow-hidden rounded-control ring-1 ring-black/10">
          <Image key={qs} src={`/api/admin/qrcode?${qs}`} alt="QR Code" fill unoptimized priority className="object-contain" />
        </div>
        <p className="mt-4 font-semibold">{current ? `${current.code} · ${current.title}` : "Site principal"}</p>
        <div className="mt-5 flex flex-col gap-3">
          <a href={`/api/admin/qrcode?${qs}&download=1`} className="btn-primary">Baixar PNG</a>
          <button type="button" disabled title="Disponível na versão final" className="rounded-control border border-neutral-300 px-5 py-3 text-sm font-semibold text-muted opacity-60">Baixar PDF (versão final)</button>
        </div>
      </Card>
    </div>
  );
}
