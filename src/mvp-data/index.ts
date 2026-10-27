// MVP: dados ilustrativos. Apagar na fase B2 (trocar por Prisma).
import type { BlogPost, City, Property } from "@/lib/types";

const img = (n: number) => `/mvp/imovel-${n}.jpg`;
const features = ["Churrasqueira", "Área de serviço", "Portaria 24h", "Piscina", "Varanda gourmet", "Armários planejados"];

const base: Property[] = [
  { id: "1", code: "VD0001", title: "Casa em condomínio com piscina", description: "Casa ampla em condomínio fechado, com lazer completo e acabamento de alto padrão. Imagem e dados ilustrativos.", price: 890000, status: "Venda", category: "Casa em Condomínio", area: 240, bedrooms: 4, bathrooms: 3, parking: 4, city: "Tatuí", state: "SP", neighborhood: "Jardim Esplanada", images: [img(1), img(2), img(3), img(4)], features, featured: true },
  { id: "2", code: "VD0002", title: "Apartamento com varanda gourmet", description: "Apartamento moderno próximo ao centro, com varanda gourmet e vaga coberta. Dados ilustrativos.", price: 420000, condoFee: 650, status: "Venda", category: "Apartamento", area: 82, bedrooms: 3, bathrooms: 2, parking: 2, city: "Tatuí", state: "SP", neighborhood: "Centro", images: [img(2), img(3), img(1)], features, featured: true },
  { id: "3", code: "LC0001", title: "Casa térrea para locação", description: "Casa térrea com quintal, ideal para família. Dados ilustrativos.", price: 2400, status: "Aluguel", category: "Casa", area: 130, bedrooms: 3, bathrooms: 2, parking: 2, city: "Sorocaba", state: "SP", neighborhood: "Jardim Paulistano", images: [img(3), img(4)], features, featured: true },
  { id: "4", code: "LN0001", title: "Residencial Vale Verde", description: "Lançamento com apartamentos de 2 e 3 dormitórios e lazer completo. Imagens ilustrativas.", price: null, status: "Lançamento", category: "Apartamento", area: 68, bedrooms: 2, bathrooms: 2, parking: 1, city: "Tatuí", state: "SP", neighborhood: "Vila Doutor Laurindo", images: [img(5), img(6), img(1)], features, featured: true },
  { id: "5", code: "VD0003", title: "Terreno em loteamento fechado", description: "Terreno plano em loteamento com infraestrutura completa. Dados ilustrativos.", price: 185000, status: "Venda", category: "Terreno", area: 300, bedrooms: 0, bathrooms: 0, parking: 0, city: "Boituva", state: "SP", neighborhood: "Residencial Aurora", images: [img(6), img(5)], features: [], featured: false },
  { id: "6", code: "LC0002", title: "Sala comercial no centro", description: "Sala comercial bem localizada, pronta para uso. Dados ilustrativos.", price: 1800, status: "Aluguel", category: "Comercial", area: 45, bedrooms: 0, bathrooms: 1, parking: 1, city: "Tatuí", state: "SP", neighborhood: "Centro", images: [img(4), img(2)], features: [], featured: false },
  { id: "7", code: "VD0004", title: "Casa com edícula e quintal", description: "Casa com edícula, quintal amplo e ótima localização. Dados ilustrativos.", price: 560000, status: "Venda", category: "Casa", area: 190, bedrooms: 3, bathrooms: 2, parking: 3, city: "Porto Feliz", state: "SP", neighborhood: "Jardim Primavera", images: [img(1), img(3)], features, featured: false },
  { id: "8", code: "LC0003", title: "Apartamento mobiliado", description: "Apartamento mobiliado, pronto para morar. Dados ilustrativos.", price: 1950, condoFee: 420, status: "Aluguel", category: "Apartamento", area: 55, bedrooms: 2, bathrooms: 1, parking: 1, city: "Sorocaba", state: "SP", neighborhood: "Campolim", images: [img(2), img(5)], features, featured: false },
  { id: "9", code: "VD0005", title: "Casa nova a poucos minutos do centro", description: "Casa nova, nunca habitada, com acabamento diferenciado. Dados ilustrativos.", price: null, status: "Venda", category: "Casa", area: 150, bedrooms: 3, bathrooms: 3, parking: 2, city: "Tatuí", state: "SP", neighborhood: "Jardim Maria Helena", images: [img(3), img(6)], features, featured: false },
];

const plan = "/mvp/planta-1.svg";
const extras: Record<string, Partial<Property>> = {
  "1": {
    rooms: 8, floors: 2, insurance: 180, videoUrl: "placeholder", // MVP: bloco ilustrativo; na fase B vira URL de embed (YouTube/Vimeo)
    floorPlans: [
      { name: "Térreo", area: 120, bedrooms: 1, bathrooms: 1, image: plan, description: "Sala de estar e jantar integradas, cozinha, lavabo e área gourmet." },
      { name: "Pavimento superior", area: 120, bedrooms: 3, bathrooms: 2, image: plan, description: "Suíte master com closet e mais dois dormitórios." },
    ],
  },
  "4": {
    rooms: 5, floors: 1,
    floorPlans: [
      { name: "Apartamento 2 dormitórios", area: 68, bedrooms: 2, bathrooms: 2, image: plan },
      { name: "Apartamento 3 dormitórios", area: 82, bedrooms: 3, bathrooms: 2, image: plan },
    ],
  },
  "2": { rooms: 5, floors: 1, insurance: 95 },
};

export const properties: Property[] = base.map((p) => ({ ...p, ...extras[p.id] }));

export const agent = {
  name: "Corretor ValeCred (exemplo)",
  creci: "CRECI a definir",
  phone: "(15) 0000-0000",
  photo: "/mvp/corretor.jpg",
};

export const cities: City[] = [
  { name: "Tatuí", image: img(1) },
  { name: "Sorocaba", image: img(3) },
  { name: "Boituva", image: img(5) },
  { name: "Porto Feliz", image: img(2) },
];

export const posts: BlogPost[] = [
  { slug: "como-comprar-seu-primeiro-imovel", title: "Como comprar o seu primeiro imóvel com segurança", excerpt: "Passo a passo para organizar documentos, financiamento e escolher bem.", content: [
    "Comprar o primeiro imóvel é uma das decisões mais importantes da vida financeira. Com organização, o processo fica mais simples e seguro.",
    "Comece definindo quanto você pode investir, considerando entrada, parcelas e custos extras como documentação, escritura e registro.",
    "Depois, liste o que é essencial: localização, número de quartos, vagas e proximidade de serviços. Visite mais de um imóvel antes de decidir.",
    "Antes de fechar negócio, confira toda a documentação do imóvel e do vendedor. Conte com um time de confiança para acompanhar cada etapa. Texto ilustrativo do MVP.",
  ], date: "2026-10-10", image: img(1) },
  { slug: "alugar-ou-comprar", title: "Alugar ou comprar: o que vale mais a pena?", excerpt: "Entenda os custos de cada caminho e como decidir para o seu momento.", content: [
    "Alugar ou comprar? A resposta depende do seu momento de vida, da sua reserva financeira e dos seus planos para os próximos anos.",
    "Comprar costuma exigir entrada e traz custos de documentação, mas forma patrimônio. Alugar oferece flexibilidade e menor desembolso inicial.",
    "Compare o valor da parcela de um financiamento com o aluguel de um imóvel parecido e leve em conta condomínio, IPTU e manutenção. Texto ilustrativo do MVP.",
  ], date: "2026-10-03", image: img(4) },
  { slug: "documentos-para-vender-imovel", title: "Documentos necessários para vender um imóvel", excerpt: "Checklist para anunciar sem dor de cabeça e fechar negócio mais rápido.", content: [
    "Ter a documentação em dia é o que separa uma venda tranquila de uma negociação cheia de imprevistos.",
    "Separe a matrícula atualizada do imóvel, certidões negativas, comprovantes de IPTU e, quando houver, declaração de quitação do condomínio.",
    "Reunir tudo antes de anunciar passa confiança ao comprador e acelera o fechamento. Texto ilustrativo do MVP.",
  ], date: "2026-09-25", image: img(6) },
];

export const siteSettings = {
  name: "ValeCred Empreendimentos Imobiliários",
  phone: "(15) 0000-0000", // placeholder: contatos oficiais ainda não existem
  whatsapp: "5515000000000",
  email: "contato@exemplo.com.br",
  address: "Tatuí - SP",
  hours: "Seg a Sex, 8h às 18h",
};

export const filterOptions = {
  statuses: ["Venda", "Aluguel", "Lançamento"] as const,
  categories: ["Casa", "Apartamento", "Terreno", "Comercial", "Casa em Condomínio"] as const,
};
