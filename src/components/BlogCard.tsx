import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/format";

export default function BlogCard({ b }: { b: BlogPost }) {
  return (
    <Link href={`/blog/${b.slug}`} className="group block overflow-hidden rounded-card bg-white shadow-sm ring-1 ring-black/5">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image src={b.image} alt={b.title} fill unoptimized className="object-cover transition duration-300 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-xs text-muted">{formatDate(b.date)}</p>
        <h3 className="mt-1 font-semibold">{b.title}</h3>
        <p className="mt-2 text-sm text-muted">{b.excerpt}</p>
        <span className="mt-3 inline-block text-sm font-semibold text-brand">Ler artigo →</span>
      </div>
    </Link>
  );
}
