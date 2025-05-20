import type { PavilionWithTier } from "~/shared/types/pavilion";

export type OmissionTierGroups = Record<"s" | "a" | "b" | "c" | "d" | "e", string[]>;
export const createTierQueryParam = (pavilions: PavilionWithTier[]): string => {
  const omissionTier: OmissionTierGroups = assortTier(pavilions);

  const query = Object.entries(omissionTier)
    .map(([key, value]) => `${key}=${value.join(",")}`)
    .join("&");

  return `?${query}`;
};

const assortTier = (pavilions: PavilionWithTier[]): OmissionTierGroups => {
  const s: string[] = [];
  const a: string[] = [];
  const b: string[] = [];
  const c: string[] = [];
  const d: string[] = [];
  const e: string[] = [];

  pavilions.forEach((p) => {
    switch (p.tier) {
      case "s-tier":
        s.push(p.id);
        break;
      case "a-tier":
        a.push(p.id);
        break;
      case "b-tier":
        b.push(p.id);
        break;
      case "c-tier":
        c.push(p.id);
        break;
      case "d-tier":
        d.push(p.id);
        break;
      case "e-tier":
        e.push(p.id);
        break;
    }
  });

  return {
    s,
    a,
    b,
    c,
    d,
    e
  };
};
