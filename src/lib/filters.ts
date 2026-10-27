import type { Property } from "./types";

export type Sort = "relevancia" | "preco-asc" | "preco-desc" | "area-desc";

export interface Filters {
  q: string;
  status: string;
  category: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  parking: number;
  minPrice: number;
  maxPrice: number;
  minArea: number;
  maxArea: number;
  sort: Sort;
  page: number;
}

type Params = { get(key: string): string | null };

export function parseFilters(sp: Params): Filters {
  const s = (k: string) => sp.get(k) ?? "";
  const n = (k: string) => Number(sp.get(k)) || 0;
  return {
    q: s("q"), status: s("status"), category: s("category"), city: s("city"),
    bedrooms: n("bedrooms"), bathrooms: n("bathrooms"), parking: n("parking"),
    minPrice: n("minPrice"), maxPrice: n("maxPrice"), minArea: n("minArea"), maxArea: n("maxArea"),
    sort: (s("sort") as Sort) || "relevancia", page: Math.max(1, n("page")),
  };
}

const norm = (v: string) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function applyFilters(list: Property[], f: Filters, ignore?: keyof Filters): Property[] {
  const q = norm(f.q.trim());
  return list.filter((p) => {
    if (q && !norm(`${p.code} ${p.title} ${p.neighborhood} ${p.city}`).includes(q)) return false;
    if (f.status && p.status !== f.status) return false;
    if (ignore !== "category" && f.category && p.category !== f.category) return false;
    if (f.city && p.city !== f.city) return false;
    if (f.bedrooms && p.bedrooms < f.bedrooms) return false;
    if (f.bathrooms && p.bathrooms < f.bathrooms) return false;
    if (f.parking && p.parking < f.parking) return false;
    // "A Consultar" (price null) só some quando há filtro de preço
    if ((f.minPrice || f.maxPrice) && p.price == null) return false;
    if (f.minPrice && (p.price as number) < f.minPrice) return false;
    if (f.maxPrice && (p.price as number) > f.maxPrice) return false;
    if (f.minArea && p.area < f.minArea) return false;
    if (f.maxArea && p.area > f.maxArea) return false;
    return true;
  });
}

export function sortProperties(list: Property[], sort: Sort): Property[] {
  const l = [...list];
  const priceAsc = (a: Property, b: Property) => (a.price ?? Infinity) - (b.price ?? Infinity);
  if (sort === "preco-asc") return l.sort(priceAsc);
  if (sort === "preco-desc") return l.sort((a, b) => (b.price ?? -1) - (a.price ?? -1)); // "A Consultar" por último
  if (sort === "area-desc") return l.sort((a, b) => b.area - a.area);
  return l.sort((a, b) => Number(b.featured) - Number(a.featured));
}
