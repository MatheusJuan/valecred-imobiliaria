import Image from "next/image";
import Link from "next/link";
import { siteSettings as s } from "@/mvp-data";

const col = "text-sm text-white/80 transition hover:text-accent";

export default function Footer() {
  return (
    <footer className="px-3 pb-3 pt-3 md:px-6 md:pb-6">
      <div className="rounded-panel bg-brand text-white">
      <div className="container-site grid gap-10 py-14 md:grid-cols-4">
        <div>
          <Image src="/brand/logo-horizontal-white.png" alt="ValeCred Empreendimentos imobiliários" width={260} height={52} />
          <p className="mt-5 text-sm text-white/80">{s.address}</p>
          <p className="mt-2 text-sm text-white/80">{s.phone}</p>
          <p className="text-sm text-accent">{s.email}</p>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Empresa</h4>
          <ul className="space-y-2">
            <li><Link className={col} href="/sobre">Sobre nós</Link></li>
            <li><Link className={col} href="/blog">Blog</Link></li>
            <li><Link className={col} href="/anuncie">Anuncie seu imóvel</Link></li>
            <li><Link className={col} href="/contato">Contato</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Imóveis</h4>
          <ul className="space-y-2">
            <li><Link className={col} href="/imoveis?status=Venda">Comprar</Link></li>
            <li><Link className={col} href="/imoveis?status=Aluguel">Alugar</Link></li>
            <li><Link className={col} href="/imoveis?status=Lan%C3%A7amento">Lançamentos</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide">Legal</h4>
          <ul className="space-y-2">
            <li><Link className={col} href="/privacidade">Política de Privacidade</Link></li>
            <li><Link className={col} href="/termos-de-uso">Termos de Uso</Link></li>
            <li><Link className={col} href="/cookies">Cookies</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15 py-5 text-center text-xs text-white/70">
        © {new Date().getFullYear()} ValeCred Empreendimentos Imobiliários. Imagens e dados ilustrativos (MVP). CRECI: a definir.
      </div>
      </div>
    </footer>
  );
}
