"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const open = (build: (url: string) => string) => () => window.open(build(window.location.href), "_blank", "noopener,noreferrer");
  const btn = "rounded-control bg-surface px-3 py-1.5 text-xs font-medium text-ink hover:bg-accent";
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-muted">Compartilhar:</span>
      <button type="button" className={btn} onClick={open((u) => `https://wa.me/?text=${encodeURIComponent(`${title} ${u}`)}`)}>WhatsApp</button>
      <button type="button" className={btn} onClick={open((u) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(u)}`)}>Facebook</button>
      <button type="button" className={btn} onClick={() => { navigator.clipboard?.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); }}>
        {copied ? "Link copiado!" : "Copiar link"}
      </button>
    </div>
  );
}
