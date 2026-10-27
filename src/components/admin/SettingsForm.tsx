"use client";

import { useState } from "react";
import { Card } from "@/components/admin/ui";
import { siteSettings as s } from "@/mvp-data";

const lbl = "block text-sm font-medium";

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card>
      <h2 className="mb-5 text-lg font-bold">{title}</h2>
      <div className="grid gap-4 md:grid-cols-2">{children}</div>
    </Card>
  );
}

// MVP: nada é salvo. Na fase B grava em site_settings (Postgres).
export default function SettingsForm() {
  const [saved, setSaved] = useState(false);
  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSaved(true); }}>
      {saved && <p className="rounded-control bg-brand/10 p-4 text-sm font-medium text-brand">Configurações salvas (demonstração do MVP).</p>}

      <Group title="Contato">
        <label className={lbl}>Telefone<input className="field mt-1" defaultValue={s.phone} /></label>
        <label className={lbl}>WhatsApp (com DDI)<input className="field mt-1" defaultValue={s.whatsapp} /></label>
        <label className={lbl}>E-mail de contato<input type="email" className="field mt-1" defaultValue={s.email} /></label>
        <label className={lbl}>E-mail que recebe os leads<input type="email" className="field mt-1" placeholder="leads@dominio.com.br" /></label>
        <label className={lbl}>Endereço<input className="field mt-1" defaultValue={s.address} /></label>
        <label className={lbl}>Horário de atendimento<input className="field mt-1" defaultValue={s.hours} /></label>
      </Group>

      <Group title="Identidade do site">
        <label className={lbl}>Nome<input className="field mt-1" defaultValue={s.name} /></label>
        <label className={lbl}>CRECI / registro<input className="field mt-1" placeholder="CRECI J-00000" /></label>
        <label className={`${lbl} md:col-span-2`}>Texto do rodapé<textarea rows={2} className="field mt-1" /></label>
        <label className={lbl}>Instagram<input className="field mt-1" placeholder="https://instagram.com/..." /></label>
        <label className={lbl}>Facebook<input className="field mt-1" placeholder="https://facebook.com/..." /></label>
      </Group>

      <Group title="SEO">
        <label className={`${lbl} md:col-span-2`}>Título do site<input className="field mt-1" defaultValue={s.name} /></label>
        <label className={`${lbl} md:col-span-2`}>Descrição<textarea rows={2} className="field mt-1" defaultValue="Imóveis para comprar e alugar, lançamentos e empreendimentos ValeCred." /></label>
        <label className={`${lbl} md:col-span-2`}>Palavras-chave<input className="field mt-1" placeholder="imóveis em Tatuí, casas à venda..." /></label>
      </Group>

      <Group title="Analytics (só carregam após aceite de cookies)">
        <label className={lbl}>Google Analytics 4 (G-XXXXXXXXXX)<input className="field mt-1" /></label>
        <label className={lbl}>Meta Pixel (ID numérico)<input className="field mt-1" /></label>
        <label className={lbl}>Microsoft Clarity (ID)<input className="field mt-1" /></label>
      </Group>

      <div className="flex justify-end"><button type="submit" className="btn-primary">Salvar configurações</button></div>
    </form>
  );
}
