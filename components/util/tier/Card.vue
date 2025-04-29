<script setup lang="ts">
import type { RadioGroupItem } from '@nuxt/ui';
import type { Tier } from '~/shared/types/pavilion';

const props = defineProps<{
  title: string
  img: string
  tierItem: RadioGroupItem[]
  defaultTier: Tier
}>()
const emit = defineEmits<{
  changeTier: [Tier, string]
}>()

const items = ref<RadioGroupItem[]>(props.tierItem)
const tier = ref<Tier>(props.defaultTier)

watch(tier, () => {
  emit("changeTier", tier.value, props.title)
})
</script>

<template>
  <div class="h-full w-full aspect-[1/1] border rounded-[10%] max-h-30">
    <div class="h-full w-full">
      <UPopover>
        <div class="grid grid-rows-[1fr,auto] h-full w-full border rounded-[10%]">
          <div class="h-full aspect-[1/1] rounded-[10%] overflow-hidden relative">
            <NuxtImg :src="img" :alt="`パビリオン「${title}」の写真`" width="100%" height="100%"
              class="w-full h-full object-cover object-center" />
          </div>
        </div>
        <template #content>
          <URadioGroup v-model="tier" :items="items" variant="table" :legend="title" color="secondary" class="m-2 w-48" />
        </template>
      </UPopover>
    </div>
  </div>
</template>

<style scoped></style>
