<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { Tier } from '~/shared/types/pavilion';

const props = defineProps<{
  title: string
  img: string
  tierItem: RadioGroupItem[]
  defaultTier: Tier
  cardSize: "sm" | "md" | "lg"
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()

const items = ref<RadioGroupItem[]>(props.tierItem)
const tier = ref<Tier>(props.defaultTier)

watch(tier, () => {
  emit("changeTier", tier.value, props.title)
})

const cardSizeClassName = computed(() => {
  switch (props.cardSize) {
    case "sm":
      return "w-[30px] md:w-[45px] lg:w-[40px]"
    case "md":
      return "w-[50px] md:w-[60px] lg:w-[60px]"
    case "lg":
      return "w-[70px] md:w-[110px] lg:w-[110px]"
    default:
      return ""
  }
})
</script>

<template>
  <div :class="`aspect-[1/1] border border-secondary-500 rounded-[10%] max-h-30 ${cardSizeClassName}`">
    <UPopover>
      <div class="grid grid-rows-[1fr,auto] h-full w-full rounded-[10%]">
        <div class="h-full aspect-[1/1] rounded-[10%] overflow-hidden relative">
          <NuxtImg :src="img" :alt="`パビリオン「${title}」の写真`" loading="lazy" class="w-full h-full object-cover object-center" />
        </div>
      </div>
      <template #content>
        <URadioGroup v-model="tier" :items="items" variant="table" :legend="title" color="secondary" class="m-2 w-48" />
      </template>
    </UPopover>
  </div>
</template>

<style scoped></style>
