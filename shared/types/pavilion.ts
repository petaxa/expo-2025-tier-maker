import type pavilions from "~/assets/pavilions.json";

export type Pavilion = (typeof pavilions)[number];

export type Tier = "unchoosed" | "s-tier" | "a-tier" | "b-tier" | "c-tier" | "d-tier";
export type PavilionWithTier = {
  [K in keyof Pavilion | "tier"]: K extends keyof Pavilion ? Pavilion[K] : Tier;
};

export type PavilionType =
  | "International"
  | "Signature"
  | "GovAndMunicipal"
  | "PrivateSectors"
  | "Others";
