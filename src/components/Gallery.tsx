"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props { images: string[]; title: string; status: string; category: string }

export default function Gallery({ images, title, status, category }: Props) {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(false);
  const go = (d: number) => setI((i + d + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setI((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  const arrow = "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl text-ink shadow transition hover:bg-white";
  const pill = "rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide";
  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-panel bg-surface shadow-xl sm:aspect-[16/9] lg:aspect-[2/1]">
        <button type="button" onClick={() => setOpen(true)} className="absolute inset-0" aria-label="Ampliar foto">
          <Image src={images[i]} alt={`${title} - foto ${i + 1}`} fill unoptimized priority className="object-cover" />
        </button>
        <div className="pointer-events-none absolute left-4 top-4 flex gap-2">
          <span className={`${pill} bg-white text-ink`}>{status}</span>
          <span className={`${pill} bg-brand text-white`}>{category}</span>
        </div>
        {images.length > 1 && (
          <>
            <button type="button" aria-label="Foto anterior" onClick={() => go(-1)} className={`${arrow} left-4`}>‹</button>
            <button type="button" aria-label="Próxima foto" onClick={() => go(1)} className={`${arrow} right-4`}>›</button>
            <span className="pointer-events-none absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">{i + 1} / {images.length}</span>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {images.map((src, n) => (
            <button key={src + n} type="button" onClick={() => setI(n)} aria-label={`Ver foto ${n + 1}`}
              className={`relative h-16 w-20 shrink-0 overflow-hidden rounded-control ring-2 transition ${n === i ? "ring-brand" : "ring-transparent opacity-80 hover:opacity-100"}`}>
              <Image src={src} alt="" fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button type="button" aria-label="Fechar" className="absolute right-4 top-4 text-3xl text-white">×</button>
          <div className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={images[i]} alt={`${title} - foto ${i + 1}`} fill unoptimized className="object-contain" />
          </div>
          {images.length > 1 && (
            <>
              <button type="button" aria-label="Foto anterior" onClick={(e) => { e.stopPropagation(); go(-1); }} className={`${arrow} left-3`}>‹</button>
              <button type="button" aria-label="Próxima foto" onClick={(e) => { e.stopPropagation(); go(1); }} className={`${arrow} right-3`}>›</button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
