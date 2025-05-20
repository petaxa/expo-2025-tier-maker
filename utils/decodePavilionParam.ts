import type { Tier } from "~/shared/types/pavilion";
import type { LocationQuery } from "vue-router";

type TierGroup = { list: string[]; tier: Tier };
export type TierMap = Record<"s" | "a" | "b" | "c" | "d" | "e", TierGroup>;

export const decodePavilionParam = (params: LocationQuery): TierMap => {
  const tierMap: Record<"s" | "a" | "b" | "c" | "d" | "e", TierGroup> = {
    s: { list: String(params.s || "").split(","), tier: "s-tier" },
    a: { list: String(params.a || "").split(","), tier: "a-tier" },
    b: { list: String(params.b || "").split(","), tier: "b-tier" },
    c: { list: String(params.c || "").split(","), tier: "c-tier" },
    d: { list: String(params.d || "").split(","), tier: "d-tier" },
    e: { list: String(params.e || "").split(","), tier: "e-tier" },
  };
  return tierMap;
};
