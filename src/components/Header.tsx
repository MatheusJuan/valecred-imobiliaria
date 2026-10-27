"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/", label: "Início" },
  { href: "/imoveis", label: "Imóveis" },
  { href: "/imoveis?status=Lan%C3%A7amento", label: "Lançamentos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link href="/" aria-label="ValeCred Empreendimentos Imobiliários">
          <Image src="/brand/logo-horizontal.png" alt="ValeCred Empreendimentos imobiliários" width={290} height={58} priority className="h-auto w-[200px] sm:w-[250px] lg:w-[290px]" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-ink lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-brand">{l.label}</Link>
          ))}
        </nav>
        <Link href="/anuncie" className="btn-primary hidden lg:inline-flex">+ Anuncie seu imóvel</Link>
        <button className="lg:hidden" aria-label="Abrir menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
        </button>
      </div>
      {open && (
        <nav className="border-t border-neutral-200 bg-white lg:hidden">
          <div className="container-site flex flex-col py-2">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-sm font-medium">{l.label}</Link>
            ))}
            <Link href="/anuncie" onClick={() => setOpen(false)} className="btn-primary my-3">+ Anuncie seu imóvel</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
