"use client";

import { useState } from "react";

// MVP: não envia nada. Na fase B grava lead (tipo "visita") + Resend + Turnstile.
export default function VisitForm({ code }: { code: string }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return <p className="rounded-card bg-surface p-4 text-sm font-medium text-brand">Pedido de visita recebido (demonstração do MVP). Entraremos em contato!</p>;
  }
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input type="hidden" name="code" value={code} />
      <label className="block text-sm font-medium">Nome *<input required name="name" className="field mt-1" /></label>
      <label className="block text-sm font-medium">Telefone *<input required name="phone" inputMode="tel" className="field mt-1" /></label>
      <label className="block text-sm font-medium">E-mail<input type="email" name="email" className="field mt-1" /></label>
      <label className="block text-sm font-medium">Data preferida<input type="date" name="date" className="field mt-1" /></label>
      <label className="block text-sm font-medium">Mensagem<textarea name="message" rows={3} className="field mt-1" /></label>
      <button type="submit" className="btn-primary w-full">Agendar visita</button>
    </form>
  );
}
