import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = { title: "Termos de Uso | ValeCred Empreendimentos Imobiliários" };

export default function Page() {
  return (
    <LegalPage
      title="Termos de Uso"
      sections={[
        { title: "1. Aceitação", body: ["Ao usar este site, você concorda com estes termos. Se não concordar, recomendamos não utilizá-lo."] },
        { title: "2. Informações dos imóveis", body: ["Preços, metragens, fotos e demais informações são apresentados de boa-fé e podem ser alterados sem aviso. Imagens podem ser ilustrativas. A disponibilidade deve ser confirmada com a ValeCred."] },
        { title: "3. Uso do site", body: ["É proibido usar o site para fins ilícitos, enviar informações falsas ou tentar prejudicar seu funcionamento."] },
        { title: "4. Anúncio de imóveis", body: ["Ao enviar um imóvel, você declara ter autorização para anunciá-lo e que as informações são verdadeiras. A publicação depende de análise da ValeCred."] },
        { title: "5. Alterações", body: ["Estes termos podem ser atualizados a qualquer momento. A versão vigente é a publicada nesta página."] },
      ]}
    />
  );
}
