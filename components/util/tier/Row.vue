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

    <div class="flex max-w-[95vw] w-full overflow-x-auto scroll-bar">
      <div v-for="pavilion in pavilions" :key="pavilion.title">
        <UtilTierCard :title="pavilion.title" :img="pavilion.img" :tier-item :card-size :default-tier="pavilion.tier"
          @change-tier="changeTier" />
      </div>
    </div>
  </div>
</template>


<style scoped>
/* スクロールバー全体の幅 */
.scroll-bar::-webkit-scrollbar {
  height: 0.8rem;
}

/* スクロールバーのトラック（背景部分） */
.scroll-bar::-webkit-scrollbar-track {
  background: #ffffff;
  border-radius: 1vmin;
}

/* スクロールバーのサム（つまみ部分） */
.scroll-bar::-webkit-scrollbar-thumb {
  background-color: var(--ui-color-neutral-400);
  border-radius: 20vmin;
  border: 2px solid #ffffff;
  /* トラックと同色の“余白”を作る */
}

/* ホバー時に色を濃く */
.scroll-bar::-webkit-scrollbar-thumb:active {
  background-color: var(--ui-color-neutral-500);
}
</style>
