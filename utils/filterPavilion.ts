import type { AcceptableValue, CheckboxGroupValue } from "@nuxt/ui";
import type { PavilionWithTier, Tier } from "~/shared/types/pavilion";

const isMatchesFilters = (
  p: PavilionWithTier,
  reserveValues: AcceptableValue[],
  typeValues: AcceptableValue[]
): boolean => {
  const reserveMatch = reserveValues.includes(String(p.isReservable));
  const typeMatch = typeValues.includes(p.type);

  return reserveMatch && typeMatch;
};

export default (
  pavilions: PavilionWithTier[],
  tier: Tier,
  reserveFilterValue: CheckboxGroupValue[],
  typeFilterValue: CheckboxGroupValue[]
): PavilionWithTier[] => {
  return (
    pavilions.filter(
      (p) =>
        p.tier === tier &&
        isMatchesFilters(p, reserveFilterValue, typeFilterValue)
    ) ?? []
  );
};
