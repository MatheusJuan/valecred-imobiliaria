// Formato espelha o futuro modelo Prisma (ver CLAUDE.md). Mock vive em src/mvp-data.
export type Status = "Venda" | "Aluguel" | "Lançamento";
export type Category = "Casa" | "Apartamento" | "Terreno" | "Comercial" | "Casa em Condomínio";

export interface Property {
  id: string;
  code: string; // VD0001 / LC0001 / LN0001
  title: string;
  description: string;
  price: number | null; // null = "A Consultar"
  condoFee?: number;
  insurance?: number;
  status: Status;
  category: Category;
  area: number;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  city: string;
  state: string;
  neighborhood: string;
  images: string[];
  features: string[];
  featured: boolean;
  rooms?: number;
  floors?: number;
  videoUrl?: string;
  floorPlans?: FloorPlan[];
}

export interface FloorPlan {
  name: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  image: string;
  description?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string[]; // parágrafos em texto puro (sem markdown)
  date: string;
  image: string;
}

export type LeadStatus = "Novo" | "Contatado" | "Convertido" | "Arquivado";
export type RequestState = "Pendente" | "Aprovada" | "Rejeitada";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  type: "Contato" | "Visita" | "Interesse";
  propertyCode?: string;
  propertyTitle?: string;
  date: string;
  status: LeadStatus;
}

export interface AdRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  status: "Venda" | "Aluguel";
  category: Category;
  city: string;
  neighborhood: string;
  price: number | null;
  date: string;
  state: RequestState;
}

export interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  link: string;
  image: string;
  active: boolean;
}

export interface City {
  name: string;
  image: string;
}
