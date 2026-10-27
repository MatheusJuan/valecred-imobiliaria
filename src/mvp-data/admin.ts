// MVP: dados fictícios do painel. Apagar na fase B2.
import type { AdRequest, HeroBanner, Lead } from "@/lib/types";

export const leads: Lead[] = [
  { id: "l1", name: "Mariana Souza", phone: "(15) 90000-0001", type: "Visita", propertyCode: "VD0001", propertyTitle: "Casa em condomínio com piscina", date: "2026-10-24", status: "Novo" },
  { id: "l2", name: "Carlos Almeida", phone: "(15) 90000-0002", type: "Interesse", propertyCode: "LC0001", propertyTitle: "Casa térrea para locação", date: "2026-10-23", status: "Novo" },
  { id: "l3", name: "Fernanda Lima", phone: "(15) 90000-0003", type: "Contato", date: "2026-10-22", status: "Contatado" },
  { id: "l4", name: "Rafael Costa", phone: "(15) 90000-0004", type: "Interesse", propertyCode: "LN0001", propertyTitle: "Residencial Vale Verde", date: "2026-10-20", status: "Contatado" },
  { id: "l5", name: "Juliana Prado", phone: "(15) 90000-0005", type: "Visita", propertyCode: "VD0002", propertyTitle: "Apartamento com varanda gourmet", date: "2026-10-18", status: "Convertido" },
  { id: "l6", name: "Bruno Martins", phone: "(15) 90000-0006", type: "Contato", date: "2026-10-12", status: "Arquivado" },
];

export const requests: AdRequest[] = [
  { id: "r1", name: "Paulo Ribeiro", phone: "(15) 90000-0011", email: "paulo@exemplo.com", status: "Venda", category: "Casa", city: "Tatuí", neighborhood: "Jardim Lírio", price: 520000, date: "2026-10-25", state: "Pendente" },
  { id: "r2", name: "Letícia Gomes", phone: "(15) 90000-0012", email: "leticia@exemplo.com", status: "Aluguel", category: "Apartamento", city: "Sorocaba", neighborhood: "Centro", price: 1700, date: "2026-10-24", state: "Pendente" },
  { id: "r3", name: "Eduardo Nunes", phone: "(15) 90000-0013", email: "eduardo@exemplo.com", status: "Venda", category: "Terreno", city: "Boituva", neighborhood: "Vila Nova", price: null, date: "2026-10-19", state: "Aprovada" },
  { id: "r4", name: "Sandra Rocha", phone: "(15) 90000-0014", email: "sandra@exemplo.com", status: "Aluguel", category: "Comercial", city: "Tatuí", neighborhood: "Centro", price: 2600, date: "2026-10-15", state: "Rejeitada" },
];

export const banners: HeroBanner[] = [
  { id: "b1", title: "Que tal encontrar o seu lugar?", subtitle: "Compre, alugue ou conheça nossos lançamentos.", buttonLabel: "Ver imóveis", link: "/imoveis", image: "/mvp/hero.jpg", active: true },
  { id: "b2", title: "Residencial Vale Verde", subtitle: "Lançamento em Tatuí com lazer completo.", buttonLabel: "Conhecer", link: "/imovel/4", image: "/mvp/imovel-5.jpg", active: true },
  { id: "b3", title: "Anuncie com a ValeCred", subtitle: "Cuidamos de tudo para você vender ou alugar.", buttonLabel: "Anunciar", link: "/anuncie", image: "/mvp/imovel-3.jpg", active: false },
];

export const homeSections = [
  { key: "featured", label: "Imóveis em destaque", on: true },
  { key: "launches", label: "Lançamentos e empreendimentos", on: true },
  { key: "saleRent", label: "Venda e Locação (abas)", on: true },
  { key: "cities", label: "Imóveis por cidade", on: true },
  { key: "why", label: "Por que a ValeCred?", on: true },
  { key: "blog", label: "Blog", on: true },
];
