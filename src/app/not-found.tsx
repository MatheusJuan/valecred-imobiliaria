import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24 text-center">
      <div className="container-site">
        <p className="text-6xl font-bold text-brand">404</p>
        <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">O endereço que você tentou acessar não existe ou o imóvel não está mais disponível.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">Voltar ao início</Link>
          <Link href="/imoveis" className="btn-outline">Ver imóveis</Link>
        </div>
      </div>
    </section>
  );
}
