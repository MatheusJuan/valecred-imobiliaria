import Link from "next/link";

export default function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Você está em" className="text-sm text-white/80">
      <Link href="/" className="hover:text-accent">Início</Link>
      {items.map((i) => (
        <span key={i.label}>
          <span className="mx-2">/</span>
          {i.href ? <Link href={i.href} className="hover:text-accent">{i.label}</Link> : <span className="text-accent">{i.label}</span>}
        </span>
      ))}
    </nav>
  );
}
