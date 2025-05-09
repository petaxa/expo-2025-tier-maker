<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { PavilionWithTier, Tier } from '~/shared/types/pavilion';

const props = defineProps<{
  pavilions: PavilionWithTier[]
  heading: string
  tierItem: RadioGroupItem[]
  cardSize: "sm" | "md" | "lg"
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
  showTierDetail: [string, PavilionWithTier[], RadioGroupItem[]]
}>()
const changeTier = (newTier: Tier, title: string) => {
  emit("changeTier", newTier, title)
}
const showTierDetail = () => {
  emit("showTierDetail", props.heading, props.pavilions, props.tierItem)
}

const cardSizeClassName = computed(() => {
  switch (props.cardSize) {
    case "sm":
      return "h-[45px] md:h-[60px] lg:h-[55px]"
    case "md":
      return "h-[65px] md:h-[75px] lg:h-[75px]"
    case "lg":
      return "h-[85px] md:h-[125px] lg:h-[125px]"
    default:
      return ""
  }
})
</script>

<template>
  <div :class="`flex h-full w-full gap-4 ${cardSizeClassName}`">
    <div v-if="heading" class="flex-none cursor-pointer" @click="showTierDetail">
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
