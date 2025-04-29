<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

defineProps<{
  pavilions: PavilionWithTier[]
  heading: string
  tierItem: RadioGroupItem[]
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()
const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}
</script>

<template>
  <div class="flex h-full gap-[5%]">
    <div v-if="heading" class="flex-none">
      <p class="text-2xl font-bold">{{ heading }}</p>
    </div>
    <div class="flex h-full overflow-x-scroll">
      <div v-for="pavilion in pavilions" :key="pavilion.title">
        <UtilTierCard :title="pavilion.title" :img="pavilion.img" :tier-item :default-tier="pavilion.tier"
          @change-tier="changeTier" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
