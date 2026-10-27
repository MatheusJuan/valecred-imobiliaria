import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import PageBanner from "@/components/PageBanner";
import { formatDate } from "@/lib/format";
import { posts } from "@/mvp-data";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return { title: p ? `${p.title} | ValeCred` : "Artigo não encontrado" };
}

export default async function ArtigoPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((x) => x.slug === slug);
  if (!post) notFound();
  const others = posts.filter((x) => x.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageBanner title="Blog" crumbs={[{ label: "Blog", href: "/blog" }, { label: "Artigo" }]} />
      <article className="py-14">
        <div className="container-site max-w-3xl">
          <p className="text-sm text-muted">{formatDate(post.date)}</p>
          <h1 className="mt-2 text-3xl font-bold leading-tight">{post.title}</h1>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-panel bg-surface">
            <Image src={post.image} alt={post.title} fill unoptimized priority className="object-cover" />
          </div>
          <div className="mt-8 space-y-5 leading-relaxed text-ink/90">
            {post.content.map((para, i) => <p key={i}>{para}</p>)}
          </div>
          <Link href="/blog" className="btn-outline mt-10">← Voltar ao blog</Link>
        </div>
      </article>
      {others.length > 0 && (
        <section className="bg-surface py-14">
          <div className="container-site">
            <h2 className="section-title">Continue lendo</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:mx-auto lg:max-w-3xl">
              {others.map((b) => <BlogCard key={b.slug} b={b} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
