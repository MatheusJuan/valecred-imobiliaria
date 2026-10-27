import type { Property } from "./types";

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export function formatPrice(p: Property): string {
  if (p.price == null) return "A Consultar";
  return brl.format(p.price) + (p.status === "Aluguel" ? "/mês" : "");
}

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`;

// "T12:00" evita o deslocamento de fuso (data ISO pura é lida como UTC)
const toDate = (iso: string) => new Date(`${iso}T12:00:00`);

export function formatDate(iso: string): string {
  return toDate(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export const formatShortDate = (iso: string) => toDate(iso).toLocaleDateString("pt-BR");
