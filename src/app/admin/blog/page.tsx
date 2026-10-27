import Image from "next/image";
import Link from "next/link";
import { Badge, Card, PageHeader, td, th } from "@/components/admin/ui";
import { formatShortDate } from "@/lib/format";
import { posts } from "@/mvp-data";

export default function AdminBlog() {
  return (
    <>
      <PageHeader
        title="Blog"
        subtitle="Artigos publicados no site (texto simples, com SEO próprio)."
        action={<button className="btn-primary" type="button">+ Novo artigo</button>}
      />
      <Card className="!p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-surface/60"><tr><th className={th}>Artigo</th><th className={th}>Data</th><th className={th}>Status</th><th className={`${th} text-right`}>Ações</th></tr></thead>
            <tbody className="divide-y divide-neutral-100">
              {posts.map((p) => (
                <tr key={p.slug}>
                  <td className={td}>
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-control"><Image src={p.image} alt="" fill unoptimized className="object-cover" /></div>
                      <div className="min-w-0"><p className="truncate font-semibold">{p.title}</p><p className="truncate text-xs text-muted">/blog/{p.slug}</p></div>
                    </div>
                  </td>
                  <td className={td}>{formatShortDate(p.date)}</td>
                  <td className={td}><Badge tone="green">Publicado</Badge></td>
                  <td className={`${td} text-right`}>
                    <div className="flex justify-end gap-2">
                      <Link href={`/blog/${p.slug}`} target="_blank" className="rounded-control border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-surface">Ver</Link>
                      <button type="button" className="rounded-control border border-neutral-300 px-3 py-1.5 text-xs font-semibold hover:bg-surface">Editar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
