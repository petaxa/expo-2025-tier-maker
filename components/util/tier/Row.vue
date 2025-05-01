<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

defineProps<{
  pavilions: PavilionWithTier[]
  heading: string
  tierItem: RadioGroupItem[]
  cardSize: "sm" | "md" | "lg"
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()
const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}
</script>

<template>
  <div class="flex h-full w-full gap-4">
    <div v-if="heading" class="flex-none">
      <p class="text-2xl font-bold">{{ heading }}</p>
    </div>

    <div class="flex max-w-[98vw] w-full overflow-x-auto scroll-bar">
      <div v-for="pavilion in pavilions" :key="pavilion.title">
        <UtilTierCard :title="pavilion.title" :img="pavilion.img" :tier-item :card-size :default-tier="pavilion.tier"
          @change-tier="changeTier" />
      </div>
    </div>
  </div>
</template>


<style scoped></style>
