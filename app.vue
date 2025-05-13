<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupValue, RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from './shared/types/pavilion';
import { LazyModalSharing, LazyModalTierDetail } from '#components'

const { data } = await useFetch('/api/pavilion')
const CONST = useConst()

const route = useRoute()
const pav: Ref<PavilionWithTier[] | undefined> = ref(undefined)
const pavilions: Ref<PavilionWithTier[] | undefined> = ref(pav)
onMounted(() => {
  const tierMapParam = route.query

  const tierMap: TierMap = decodePavilionParam(tierMapParam);

  pav.value = data.value?.map(ele => {
    const foundTier = Object.values(tierMap).find(t => t.list.includes(ele.id))
    return { ...ele, tier: foundTier?.tier || 'unchoosed' }
  })
})

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
  { label: CONST.TIER.E_TIER.JP, value: CONST.TIER.E_TIER.EN },
  { label: CONST.TIER.UNCHOOSED.JP, value: CONST.TIER.UNCHOOSED.EN },
]

const changeTier = (newTier: Tier, title: string) => {
  const target = pavilions.value?.find(p => p.title === title)
  if (target) {
    target.tier = newTier
  }
}

const { copyText } = useClipboard()
const overlay = useOverlay()
const sharingModal = overlay.create(LazyModalSharing)
const doShareing = async () => {
  await sharingModal.open()

  const origin = useRequestURL().origin
  const query = createTierQueryParam(pavilions.value ?? [])

  const url = `${origin}${query}`
  copyText(url).then(async () => {
    await sharingModal.patch({ url })
  })

  await new Promise(resolve => setTimeout(resolve, 5000))
  if (!sharingModal.isOpen) await sharingModal.close()
}

const tierDetailModal = overlay.create(LazyModalTierDetail)
const showTierDetail = async (heading: string, pavilions: PavilionWithTier[], tierGroupItem: RadioGroupItem[]) => {
  await tierDetailModal.open({
    heading, pavilions, tierGroupItem
  })
}

</script>

<template>
  <UApp>
    <div class="h-full w-full
    bg-gradient-to-b from-neutral-200 dark:from-neutral-500 end-white dark:end-black
    grid grid-rows-[auto_1fr_auto] gap-4 px-[1vw] py-[1vh]">
      <TierListHeader :reserve-filter-items :type-filter-items :reserve-filter-default-value :type-filter-default-value
        @change-reserve-filter-value="changeReserveFilterValue" @change-type-filter-value="changeTypeFilterValue"
        @do-shareing="doShareing" />
      <TierListTable :tier-group-item :pavilions="pavilions ?? []" :reserve-filter-value :type-filter-value
        @change-tier="changeTier" @show-tier-detail="showTierDetail" />
      <TierListSelectingPavilion :tier-group-item :pavilions="pavilions ?? []" :reserve-filter-value :type-filter-value
        @change-tier="changeTier" />
      <UtilBackgroundCircle />
    </div>
  </UApp>
</template>

<style scoped></style>
