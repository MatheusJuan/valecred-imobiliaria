"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/imoveis", label: "Imóveis" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/solicitacoes", label: "Solicitações" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/banners", label: "Banners Home" },
  { href: "/admin/qrcode", label: "QR Code" },
  { href: "/admin/configuracoes", label: "Configurações" },
];

export default function Sidebar() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) => (href === "/admin" ? path === href : path.startsWith(href));

  const nav = (
    <nav className="flex flex-col gap-1 p-4">
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          onClick={() => setOpen(false)}
          className={`rounded-control px-4 py-2.5 text-sm font-medium transition ${active(i.href) ? "bg-brand text-white shadow" : "text-muted hover:bg-surface hover:text-ink"}`}
        >
          {i.label}
        </Link>
      ))}
      <div className="mt-6 flex flex-col gap-2 border-t border-neutral-200 pt-4">
        <Link href="/" target="_blank" className="rounded-control border border-brand px-4 py-2.5 text-center text-sm font-semibold text-brand hover:bg-brand hover:text-white">Acessar site</Link>
        <Link href="/login" className="px-4 py-2 text-center text-sm text-muted hover:text-ink">Sair</Link>
      </div>
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-30 flex items-center justify-between bg-white px-4 py-3 shadow-sm lg:hidden">
        <Image src="/brand/logo-horizontal.png" alt="ValeCred" width={150} height={30} />
        <button aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </header>
      {open && <div className="border-b bg-white lg:hidden">{nav}</div>}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 overflow-y-auto bg-white shadow-sm lg:block">
        <div className="p-6">
          <Image src="/brand/logo-horizontal.png" alt="ValeCred Empreendimentos imobiliários" width={190} height={38} />
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-widest text-muted">Painel de gestão</p>
        </div>
        {nav}
      </aside>
    </>
  );
}
