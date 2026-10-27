import PageBanner from "./PageBanner";

export interface LegalSection { title: string; body: string[] }

export default function LegalPage({ title, sections }: { title: string; sections: LegalSection[] }) {
  return (
    <>
      <PageBanner title={title} crumbs={[{ label: title }]} />
      <section className="py-14">
        <div className="container-site max-w-3xl">
          <p className="rounded-card bg-accent/25 p-4 text-sm text-ink">
            <b>Rascunho do MVP.</b> Este texto é um modelo e será revisado com o responsável jurídico antes do lançamento, refletindo exatamente o que o site coleta e faz.
          </p>
          <div className="mt-8 space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold">{s.title}</h2>
                {s.body.map((p, i) => <p key={i} className="mt-3 text-sm leading-relaxed text-muted">{p}</p>)}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
