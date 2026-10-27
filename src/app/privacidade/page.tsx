import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Política de Privacidade | ValeCred Empreendimentos Imobiliários" };

export default function Page() {
  return (
    <LegalPage
      title="Política de Privacidade"
      sections={[
        { title: "1. Quem somos", body: ["A ValeCred Empreendimentos Imobiliários é a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018)."] },
        { title: "2. Dados que coletamos", body: ["Coletamos apenas os dados que você informa nos formulários do site: nome, telefone, e-mail, mensagem e, no caso de anúncio de imóvel, os dados e fotos do imóvel.", "Também podemos coletar dados de navegação (como páginas visitadas) por meio de cookies de análise, somente após o seu consentimento."] },
        { title: "3. Para que usamos", body: ["Usamos os dados para responder ao seu contato, agendar visitas, avaliar anúncios de imóveis e melhorar o site. Não vendemos seus dados."] },
        { title: "4. Seus direitos", body: ["Você pode solicitar acesso, correção, anonimização ou exclusão dos seus dados e revogar consentimentos a qualquer momento, pelos canais de contato do site."] },
        { title: "5. Retenção e segurança", body: ["Mantemos os dados pelo tempo necessário para as finalidades acima e adotamos medidas técnicas para protegê-los. O prazo de retenção será definido antes do lançamento."] },
      ]}
    />
  );
}
