<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupValue, RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from './shared/types/pavilion';

const { data } = await useFetch('/api/pavilion')
const CONST = useConst()

// NOTE: /api/pavilion の変更にリアクティブにならないが、基本的に変更されることはないので許容する
const pav: PavilionWithTier[] | undefined = data.value?.map(d => ({ ...d, tier: "unchoosed" }))
const pavilions: Ref<PavilionWithTier[] | undefined> = ref(pav)


const reserveFilterItems = ref<CheckboxGroupItem[]>([
  { "label": CONST.RESERVABLE.CAN, value: String(true) },
  { "label": CONST.RESERVABLE.CANNNOT, value: String(false) }
])
const typeFilterItems = ref<CheckboxGroupItem[]>([
  { "label": CONST.PAVILION_TYPE.INTERNATIONAL.JP, value: CONST.PAVILION_TYPE.INTERNATIONAL.EN },
  { "label": CONST.PAVILION_TYPE.SIGNATURE.JP, value: CONST.PAVILION_TYPE.SIGNATURE.EN },
  { "label": CONST.PAVILION_TYPE.PRIVATESECTORS.JP, value: CONST.PAVILION_TYPE.PRIVATESECTORS.EN },
  { "label": CONST.PAVILION_TYPE.GOVANDMUNICIPAL.JP, value: CONST.PAVILION_TYPE.GOVANDMUNICIPAL.EN },
  { "label": CONST.PAVILION_TYPE.OTHERS.JP, value: CONST.PAVILION_TYPE.OTHERS.EN },
])
const reserveFilterDefaultValue = [String(true), String(false)]
const typeFilterDefaultValue = [
  CONST.PAVILION_TYPE.INTERNATIONAL.EN,
  CONST.PAVILION_TYPE.SIGNATURE.EN,
  CONST.PAVILION_TYPE.PRIVATESECTORS.EN,
  CONST.PAVILION_TYPE.GOVANDMUNICIPAL.EN,
  CONST.PAVILION_TYPE.OTHERS.EN,
]
const reserveFilterValue = ref<CheckboxGroupValue[]>(reserveFilterDefaultValue)
const typeFilterValue = ref<CheckboxGroupValue[]>(typeFilterDefaultValue)

const changeReserveFilterValue = (newAry: CheckboxGroupValue[]) => {
  reserveFilterValue.value = newAry
}
const changeTypeFilterValue = (newAry: CheckboxGroupValue[]) => {
  typeFilterValue.value = newAry
}

const tierGroupItem: RadioGroupItem[] = [
  { label: CONST.TIER.S_TIER.JP, value: CONST.TIER.S_TIER.EN },
  { label: CONST.TIER.A_TIER.JP, value: CONST.TIER.A_TIER.EN },
  { label: CONST.TIER.B_TIER.JP, value: CONST.TIER.B_TIER.EN },
  { label: CONST.TIER.C_TIER.JP, value: CONST.TIER.C_TIER.EN },
  { label: CONST.TIER.D_TIER.JP, value: CONST.TIER.D_TIER.EN },
  { label: CONST.TIER.UNCHOOSED.JP, value: CONST.TIER.UNCHOOSED.EN },
]

const changeTier = (newTier: Tier, title: string) => {
  const target = pavilions.value?.find(p => p.title === title)
  if (target) {
    target.tier = newTier
    console.log(newTier)
    console.log(JSON.stringify(pavilions.value))
  }
}

const isPause = ref(false)
const changeIsPause = (bool: boolean) => {
  isPause.value = bool
}
</script>

<template>
  <div class="h-full w-full bg-gradient-to-b from-neutral-200 end-white grid grid-rows-[auto_1fr_0.2fr] gap-4 px-[2%] py-[1%]">
    <TierListHeader :reserve-filter-items :type-filter-items :reserve-filter-default-value :type-filter-default-value
      :is-pause="isPause" @change-reserve-filter-value="changeReserveFilterValue"
      @change-type-filter-value="changeTypeFilterValue" @change-is-pause="changeIsPause" />
    <TierListTable :tier-group-item :pavilions="pavilions ?? []" :reserve-filter-value :type-filter-value
      @change-tier="changeTier" />
    <TierListSelectingPavilion :tier-group-item :pavilions="pavilions ?? []" :reserve-filter-value
      :type-filter-value @change-tier="changeTier" />
    <UtilBackgroundCircle />
  </div>
</template>

<style scoped>

</style>
