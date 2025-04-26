<script setup lang="ts">
import type { RadioGroupItem, RadioGroupValue } from '@nuxt/ui';
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
  <UPopover>
    <div>
      <div class="square">
        <NuxtImg :src="img" :alt="`パビリオン「${title}」の写真`" />
      </div>
      <p>{{ title }}</p>
    </div>
    <template #content>
      <URadioGroup v-model="tier" :items="items" variant="table" class="popover" />
    </template>
  </UPopover>
</template>

<style scoped>
.square {
  margin-bottom: 16px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
}

.square :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.popover {
  width: 12rem;
}
</style>
