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
  <div class="flex">
    <p>{{ heading }}</p>
    <div v-for="pavilion in pavilions" :key="pavilion.title" class="card">
      <TierCard :title="pavilion.title" :img="pavilion.img" :tier-item :default-tier="pavilion.tier" @change-tier="changeTier" />
    </div>
  </div>
</template>

<style scoped></style>
