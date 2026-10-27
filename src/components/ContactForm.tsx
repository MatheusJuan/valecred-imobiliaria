"use client";

import { useState } from "react";

// MVP: não envia nada. Na fase B grava lead no Postgres + Resend + Turnstile.
export default function ContactForm({ title, subtitle }: { title: string; subtitle?: string }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
      {sent ? (
        <p className="mt-8 rounded-card bg-surface p-6 text-center text-sm font-medium text-brand">
          Recebemos sua mensagem (demonstração do MVP). Em breve entraremos em contato!
        </p>
      ) : (
        <form
          className="mt-8 grid gap-4 md:grid-cols-2"
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
        >
          <label className="text-sm font-medium">Nome *<input required className="field mt-1" name="name" /></label>
          <label className="text-sm font-medium">Telefone *<input required className="field mt-1" name="phone" inputMode="tel" /></label>
          <label className="text-sm font-medium md:col-span-2">E-mail<input type="email" className="field mt-1" name="email" /></label>
          <label className="text-sm font-medium md:col-span-2">Mensagem<textarea rows={4} className="field mt-1" name="message" /></label>
          <button className="btn-primary md:col-span-2" type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}
