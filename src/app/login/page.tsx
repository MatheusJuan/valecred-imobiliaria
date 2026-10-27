import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = { title: "Entrar | ValeCred", robots: { index: false, follow: false } };

// MVP: visual apenas. Na fase B vira login real (sessão em cookie seguro, admin único).
export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand p-5">
      <div className="w-full max-w-sm rounded-panel bg-white p-8 shadow-xl">
        <Image src="/brand/logo-vertical.png" alt="ValeCred Empreendimentos imobiliários" width={220} height={114} className="mx-auto" priority />
        <h1 className="mt-6 text-center text-xl font-bold">Painel de gestão</h1>
        <form className="mt-6 space-y-4">
          <label className="block text-sm font-medium">E-mail<input type="email" className="field mt-1" autoComplete="username" /></label>
          <label className="block text-sm font-medium">Senha<input type="password" className="field mt-1" autoComplete="current-password" /></label>
          <Link href="/admin" className="btn-primary w-full">Entrar</Link>
        </form>
        <p className="mt-5 text-center text-xs text-muted">Demonstração: qualquer clique em “Entrar” abre o painel.</p>
      </div>
    </div>
  );
}
