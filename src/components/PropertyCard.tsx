import Image from "next/image";
import Link from "next/link";
import type { Property } from "@/lib/types";
import { formatPrice, plural } from "@/lib/format";
import Icon, { type IconName } from "./Icon";

const badge: Record<Property["status"], string> = {
  Venda: "bg-brand text-white",
  Aluguel: "bg-ink text-white",
  Lançamento: "bg-accent text-ink",
};

export default function PropertyCard({ p }: { p: Property }) {
  const specs: [IconName, string, string][] = [["area", `${p.area} m²`, `${p.area} m²`]];
  if (p.bedrooms > 0) specs.push(["bed", String(p.bedrooms), plural(p.bedrooms, "quarto", "quartos")]);
  if (p.bathrooms > 0) specs.push(["bath", String(p.bathrooms), plural(p.bathrooms, "banheiro", "banheiros")]);
  if (p.parking > 0) specs.push(["car", String(p.parking), plural(p.parking, "vaga", "vagas")]);
  return (
    <Link href={`/imovel/${p.id}`} className="group block overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-surface">
        <Image src={p.images[0]} alt={p.title} fill unoptimized sizes="(min-width:1024px) 33vw, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
        <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${badge[p.status]}`}>{p.status}</span>
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2 py-1 text-[11px] font-medium text-muted">{p.code}</span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">{p.category}</p>
        <h3 className="mt-1 line-clamp-1 text-base font-semibold text-ink">{p.title}</h3>
        <p className="mt-0.5 text-sm text-muted">{p.neighborhood}, {p.city} - {p.state}</p>
        <p className={`mt-3 text-xl font-bold ${p.price == null ? "text-accent-dark" : "text-brand"}`}>{formatPrice(p)}</p>
      </div>
      <div className="flex gap-5 border-t border-neutral-200 px-4 py-3 text-sm text-ink">
        {specs.map(([icon, value, label]) => (
          <span key={icon} title={label} className="flex items-center gap-1.5">
            <Icon name={icon} className="h-4 w-4 text-brand" />
            <span aria-hidden="true">{value}</span>
            <span className="sr-only">{label}</span>
          </span>
        ))}
      </div>
    </Link>
  );
}
