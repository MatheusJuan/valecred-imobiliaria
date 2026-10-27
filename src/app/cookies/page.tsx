import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de Cookies | ValeCred Empreendimentos Imobiliários" };

export default function Page() {
  return (
    <LegalPage
      title="Política de Cookies"
      sections={[
        { title: "1. O que são cookies", body: ["Cookies são pequenos arquivos guardados no seu navegador para o site funcionar e, quando você permite, para medir o uso."] },
        { title: "2. Quais usamos", body: ["Essenciais: necessários ao funcionamento do site, sempre ativos.", "Análise e marketing (Google Analytics, Meta Pixel, Microsoft Clarity): só são carregados após o seu aceite no aviso de cookies."] },
        { title: "3. Como gerenciar", body: ["Você pode mudar ou revogar sua escolha a qualquer momento por esta página e também pelas configurações do navegador."] },
      ]}
    />
  );
}
