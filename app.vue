<script setup lang="ts">
import type { AcceptableValue, CheckboxGroupItem, CheckboxGroupValue, RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from './shared/types/pavilion';

const { data } = await useFetch('/api/pavilion')

// NOTE: /api/pavilion の変更にリアクティブにならないが、基本的に変更されることはないので許容する
const pav: PavilionWithTier[] | undefined = data.value?.map(d => ({ ...d, tier: "unchoosed" }))
const pavilions: Ref<PavilionWithTier[] | undefined> = ref(pav)

const reserveFilterItems = ref<CheckboxGroupItem[]>([
  { "label": "可能", value: 'true' },
  { "label": "不可", value: 'false' }
])
const typeFilterItems = ref<CheckboxGroupItem[]>([
  { "label": "海外", value: 'International' },
  { "label": "シグネチャー", value: 'Signature' },
  { "label": "企業", value: 'PrivateSectors' },
  { "label": "自治体/日本政府", value: 'GovAndMunicipal' },
  { "label": "その他", value: 'Others' },
])
const reserveFilterValue = ref<CheckboxGroupValue[]>(["true", "false"])
const typeFilterValue = ref<CheckboxGroupValue[]>(["International", "Signature", "PrivateSectors", "GovAndMunicipal", "Others"])

const isMatchesFilters = (
  p: PavilionWithTier,
  reserveValues: AcceptableValue[],
  typeValues: AcceptableValue[]
): boolean => {
  const reserveMatch = reserveValues.includes(String(p.isReservable))
  const typeMatch = typeValues.includes(p.type)

  return reserveMatch && typeMatch
}

const filterPavilion = (tier: Tier): PavilionWithTier[] => {
  return pavilions.value?.filter(p => p.tier === tier && isMatchesFilters(p, reserveFilterValue.value, typeFilterValue.value)) ?? []
}

const tierGroupItem: RadioGroupItem[] = [
  { label: "S ティア", value: "s-tier" },
  { label: "A ティア", value: "a-tier" },
  { label: "B ティア", value: "b-tier" },
  { label: "C ティア", value: "c-tier" },
  { label: "D ティア", value: "d-tier" },
  { label: "未選択", value: "unchoosed" },
]

const changeTier = (newTier: Tier, title: string) => {
  console.log("changeTier")
  const target = pavilions.value?.find(p => p.title === title)
  if (target) {
    target.tier = newTier
    console.log(newTier)
    console.log(JSON.stringify(pavilions.value))
  }
}

// ------------------------------
const pavViewDebug = () => {
  pavilions.value[0].tier = "s-tier"
  pavilions.value[1].tier = "a-tier"
  pavilions.value[2].tier = "b-tier"
  pavilions.value[3].tier = "c-tier"
  pavilions.value[4].tier = "d-tier"
}
pavViewDebug()
</script>

<template>
  <div>
    <div>
      <div>
        <p>予約可否</p>
        <UCheckboxGroup v-model="reserveFilterValue" :items="reserveFilterItems" />
      </div>
      <div>
        <p>パビリオンの種類</p>
        <UCheckboxGroup v-model="typeFilterValue" :items="typeFilterItems" />
      </div>
    </div>
    <div>
      <TierRow :pavilions="filterPavilion('s-tier')" heading="S" :tier-item="tierGroupItem" @change-tier="changeTier" />
      <TierRow :pavilions="filterPavilion('a-tier')" heading="A" :tier-item="tierGroupItem" @change-tier="changeTier" />
      <TierRow :pavilions="filterPavilion('b-tier')" heading="B" :tier-item="tierGroupItem" @change-tier="changeTier" />
      <TierRow :pavilions="filterPavilion('c-tier')" heading="C" :tier-item="tierGroupItem" @change-tier="changeTier" />
      <TierRow :pavilions="filterPavilion('d-tier')" heading="D" :tier-item="tierGroupItem" @change-tier="changeTier" />
      <TierRow :pavilions="filterPavilion('unchoosed')" heading="" :tier-item="tierGroupItem"
        @change-tier="changeTier" />
    </div>
  </div>
</template>

<style scoped></style>
