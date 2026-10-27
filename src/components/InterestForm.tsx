"use client";

import Link from "next/link";
import { useState } from "react";

// MVP: não envia nada. Na fase B grava lead do tipo "Interesse" + Resend + Turnstile.
export default function InterestForm({ code }: { code: string }) {
  const [sent, setSent] = useState(false);
  if (sent) {
    return <p className="rounded-control bg-surface p-4 text-sm font-medium text-brand">Recebemos seu contato (demonstração do MVP). Retornaremos em breve!</p>;
  }
  return (
    <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
      <input type="hidden" name="code" value={code} />
      <input required name="name" className="field !bg-surface !py-3" placeholder="Seu nome completo" aria-label="Seu nome completo" />
      <input required name="phone" inputMode="tel" className="field !bg-surface !py-3" placeholder="Seu telefone / WhatsApp" aria-label="Seu telefone ou WhatsApp" />
      <button type="submit" className="w-full rounded-control bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-black">Enviar contato</button>
      <p className="text-center text-[11px] text-muted">Ao enviar, você concorda com nossa <Link href="/privacidade" className="underline">política de privacidade</Link>.</p>
    </form>
  );
}
