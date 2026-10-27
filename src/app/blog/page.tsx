import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import PageBanner from "@/components/PageBanner";
import { posts } from "@/mvp-data";

export const metadata: Metadata = { title: "Blog | ValeCred Empreendimentos Imobiliários" };

export default function BlogPage() {
  return (
    <>
      <PageBanner title="Blog" crumbs={[{ label: "Blog" }]} />
      <section className="py-16">
        <div className="container-site">
          <p className="section-sub !mt-0">Dicas para comprar, alugar e investir em imóveis.</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((b) => <BlogCard key={b.slug} b={b} />)}
          </div>
        </div>
      </section>
    </>
  );
}
