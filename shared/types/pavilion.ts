import type pavilions from "~/assets/pavilions.json";

type ConstType = ReturnType<typeof useConst>;

export type Pavilion = (typeof pavilions)[number];

export type Tier = ConstType["TIER"][keyof ConstType["TIER"]]["EN"];
export type PavilionWithTier = {
  [K in keyof Pavilion | "tier"]: K extends keyof Pavilion ? Pavilion[K] : Tier;
};

export type PavilionType =
  ConstType["PAVILION_TYPE"][keyof ConstType["PAVILION_TYPE"]]["EN"];
