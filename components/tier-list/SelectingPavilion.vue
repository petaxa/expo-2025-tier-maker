<script setup lang="ts">
import type { RadioGroupItem, CheckboxGroupValue } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

const CONST = useConst()
const props = defineProps<{
  tierGroupItem: RadioGroupItem[]
  pavilions: PavilionWithTier[]
  reserveFilterValue: CheckboxGroupValue[]
  typeFilterValue: CheckboxGroupValue[]
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()

const unchoosed = computed(() => filterPavilion(props.pavilions, CONST.TIER.UNCHOOSED.EN, props.reserveFilterValue, props.typeFilterValue))

const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}
</script>

<template>
  <div class="h-full w-full grid gap-1 grid-rows-[auto_1fr]">
    <div>
      <UDrawer>
        <UButton class="w-[3%] aspect-2/1 justify-center" color="secondary" variant="solid"
          trailing-icon="i-lucide-chevron-up" />
        <template #content>
          <div class="grid grid-cols-[repeat(auto-fit,7.5rem)] gap-8 overflow-y-scroll p-2">
            <UtilTierCard v-for="p in unchoosed" :key="p.title" :title="p.title" :img="p.img" :tier-item="tierGroupItem"
              :default-tier="p.tier" card-size="md" @change-tier="changeTier" />
          </div>
        </template>
      </UDrawer>
    </div>

    <div class="h-full w-full">
      <UtilTierRow :pavilions="unchoosed" heading="" :tier-item="tierGroupItem" card-size="md"
        @change-tier="changeTier" />
    </div>
  </div>
</template>

<style scoped></style>
