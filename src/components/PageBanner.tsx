import Breadcrumb from "./Breadcrumb";

export default function PageBanner({ title, crumbs }: { title: string; crumbs: { label: string; href?: string }[] }) {
  return (
    <section className="px-3 pt-3 md:px-6">
      <div className="rounded-panel bg-brand py-12 text-center text-white md:py-16">
        <div className="container-site">
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>
          <div className="mt-2"><Breadcrumb items={crumbs} /></div>
        </div>
      </div>
    </section>
  );
}
