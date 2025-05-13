<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

defineProps<{
  heading: string
  pavilions: PavilionWithTier[]
  tierGroupItem: RadioGroupItem[]
}>()

const emit = defineEmits<{ close: [boolean], changeTier: [Tier, string] }>()

const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}
</script>

<template>
  <UModal fullscreen :close="{ onClick: () => emit('close', false) }" :title="`${heading}に設定したパビリオン一覧`">
    <template #body>
      <div class="grid grid-cols-[repeat(auto-fit,110px)] grid-rows-[repead(auto-fit,110px)] gap-2 p-2 overflow-y-auto">
        <div v-for="p in pavilions" :key="p.title" class="text-center">
          <UtilTierCard :title="p.title" :img="p.img" :tier-item="tierGroupItem" :default-tier="p.tier"
            class="place-self-center" card-size="lg" @change-tier="changeTier" />
          <p>{{ useLightTitle(p.title) }}</p>
        </div>
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
