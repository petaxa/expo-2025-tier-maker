import type { PavilionWithTier } from "~/shared/types/pavilion";

export const createTierQueryParam = (pavilions: PavilionWithTier[]): string => {
  const { sTier, aTier, bTier, cTier, dTier } = assortTier(pavilions);
  const tiers = { s: sTier, a: aTier, b: bTier, c: cTier, d: dTier };

  const query = Object.entries(tiers)
    .map(([key, value]) => `${key}=${value.join(",")}`)
    .join("&");

  return `?${query}`;
};

const assortTier = (
  pavilions: PavilionWithTier[]
): {
  sTier: string[];
  aTier: string[];
  bTier: string[];
  cTier: string[];
  dTier: string[];
  unchoosed: string[];
} => {
  const sTier: string[] = [];
  const aTier: string[] = [];
  const bTier: string[] = [];
  const cTier: string[] = [];
  const dTier: string[] = [];
  const unchoosed: string[] = [];
  pavilions.forEach((p) => {
    switch (p.tier) {
      case "s-tier":
        sTier.push(p.title);
        break;
      case "a-tier":
        aTier.push(p.title);
        break;
      case "b-tier":
        bTier.push(p.title);
        break;
      case "c-tier":
        cTier.push(p.title);
        break;
      case "d-tier":
        dTier.push(p.title);
        break;
      case "unchoosed":
        unchoosed.push(p.title);
        break;
    }
  });

  return {
    sTier,
    aTier,
    bTier,
    cTier,
    dTier,
    unchoosed,
  };
};
