import Image from "next/image";
import Link from "next/link";
import { Badge, Card, PageHeader } from "@/components/admin/ui";
import { formatPrice, formatShortDate } from "@/lib/format";
import { leads, requests } from "@/mvp-data/admin";
import { posts, properties } from "@/mvp-data";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", notation: "compact", maximumFractionDigits: 1 });

export default function AdminDashboard() {
  const newLeads = leads.filter((l) => l.status === "Novo").length;
  const pending = requests.filter((r) => r.state === "Pendente").length;
  const featured = properties.filter((p) => p.featured).length;
  const portfolio = properties.filter((p) => p.status !== "Aluguel").reduce((s, p) => s + (p.price ?? 0), 0);

  const stats = [
    { label: "Imóveis ativos", value: properties.length, note: `${featured} em destaque`, cls: "bg-brand/10 ring-brand/20 text-brand" },
    { label: "Solicitações pendentes", value: pending, note: pending ? "Aguardando análise" : "Tudo em dia", cls: "bg-accent/25 ring-accent/50 text-ink" },
    { label: "Leads novos", value: newLeads, note: `${leads.length} no total`, cls: "bg-white ring-black/10 text-brand" },
    { label: "Posts no blog", value: posts.length, note: "Conteúdo ativo", cls: "bg-sky-50 ring-sky-100 text-sky-700" },
  ];

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Visão geral do portfólio e das comunicações." />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-card p-5 ring-1 ${s.cls}`}>
            <p className="text-xs font-semibold uppercase tracking-wide">{s.label}</p>
            <p className="mt-3 text-4xl font-bold">{s.value}</p>
            <p className="mt-1 text-xs opacity-70">{s.note}</p>
          </div>
        ))}
        <div className="rounded-card bg-brand p-5 text-white">
          <p className="text-xs font-semibold uppercase tracking-wide text-white/80">Valor do portfólio (venda)</p>
          <p className="mt-3 text-3xl font-bold">{brl.format(portfolio)}</p>
          <p className="mt-1 text-xs text-white/70">{properties.length} propriedades</p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Leads recentes</h2>
            <Link href="/admin/leads" className="text-sm font-medium text-brand">Ver todos →</Link>
          </div>
          <ul className="divide-y divide-neutral-100">
            {leads.slice(0, 4).map((l) => (
              <li key={l.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{l.name}</p>
                  <p className="truncate text-xs text-muted">{l.type}{l.propertyCode ? ` · ${l.propertyCode}` : ""} · {formatShortDate(l.date)}</p>
                </div>
                <Badge tone={l.status === "Novo" ? "green" : l.status === "Convertido" ? "yellow" : "gray"}>{l.status}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Solicitações recentes</h2>
            <Link href="/admin/solicitacoes" className="text-sm font-medium text-brand">Ver todas →</Link>
          </div>
          <ul className="divide-y divide-neutral-100">
            {requests.slice(0, 4).map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{r.category} em {r.city}</p>
                  <p className="truncate text-xs text-muted">{r.name} · {formatShortDate(r.date)}</p>
                </div>
                <Badge tone={r.state === "Pendente" ? "yellow" : r.state === "Aprovada" ? "green" : "red"}>{r.state}</Badge>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Imóveis recentes</h2>
            <Link href="/admin/imoveis" className="text-sm font-medium text-brand">Ver todos →</Link>
          </div>
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {properties.slice(0, 4).map((p) => (
              <li key={p.id}>
                <Link href={`/admin/imoveis/${p.id}`} className="flex items-center gap-4 rounded-control bg-surface p-3 transition hover:bg-neutral-200">
                  <div className="relative h-14 w-16 shrink-0 overflow-hidden rounded-control">
                    <Image src={p.images[0]} alt="" fill unoptimized className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{p.title}</p>
                    <p className="truncate text-xs text-muted">{p.neighborhood}, {p.city}</p>
                    <p className="text-xs font-semibold text-brand">{formatPrice(p)}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </>
  );
}
