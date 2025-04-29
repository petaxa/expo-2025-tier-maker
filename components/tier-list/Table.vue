<script setup lang="ts">
import type { CheckboxGroupValue, RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

const CONST = useConst()
defineProps<{
  tierGroupItem: RadioGroupItem[]
  pavilions: PavilionWithTier[]
  reserveFilterValue: CheckboxGroupValue[]
  typeFilterValue: CheckboxGroupValue[]
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()

const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}

const tiers = [
  { en: CONST.TIER.S_TIER.EN, jp: CONST.TIER.S_TIER.JP },
  { en: CONST.TIER.A_TIER.EN, jp: CONST.TIER.A_TIER.JP },
  { en: CONST.TIER.B_TIER.EN, jp: CONST.TIER.B_TIER.JP },
  { en: CONST.TIER.C_TIER.EN, jp: CONST.TIER.C_TIER.JP },
  { en: CONST.TIER.D_TIER.EN, jp: CONST.TIER.D_TIER.JP },
]
</script>

<template>
  <div class="h-full grid grid-rows-5 gap-[1%]">
    <div v-for="tier in tiers" :key="tier.en" class="min-h-0 overflow-y-auto">
      <UtilTierRow :pavilions="filterPavilion(pavilions, tier.en, reserveFilterValue, typeFilterValue)"
        :heading="tier.jp" :tier-item="tierGroupItem" @change-tier="changeTier" />
    </div>
  </div>
</template>

<style scoped></style>
