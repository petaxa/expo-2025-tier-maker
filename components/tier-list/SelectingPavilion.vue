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
        <UButton class="w-[2rem] aspect-2/1 justify-center" color="secondary" variant="solid"
          trailing-icon="i-lucide-chevron-up" />
        <template #content>
          <div class="grid grid-cols-[repeat(auto-fit,110px)] gap-2 p-2 overflow-y-scroll justify-center">
            <div v-for="p in unchoosed" :key="p.title" class="text-center">
              <UtilTierCard :title="p.title" :img="p.img" :tier-item="tierGroupItem" :default-tier="p.tier"
                class="place-self-center" card-size="lg" @change-tier="changeTier" />
              <p>{{ useLightTitle(p.title) }}</p>
            </div>
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
