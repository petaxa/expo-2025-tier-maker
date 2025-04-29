<script setup lang="ts">
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui';

const props = defineProps<{
  reserveFilterItems: CheckboxGroupItem[]
  reserveFilterDefaultValue: CheckboxGroupValue[]
  typeFilterItems: CheckboxGroupItem[]
  typeFilterDefaultValue: CheckboxGroupValue[]
  isPause: boolean
}>()

const emit = defineEmits<{
  changeReserveFilterValue: [CheckboxGroupValue[]]
  changeTypeFilterValue: [CheckboxGroupValue[]]
  changeIsPause: [boolean]
}>()

const reserveFilterValue = ref(props.reserveFilterDefaultValue)
const typeFilterValue = ref(props.typeFilterDefaultValue)

watch(reserveFilterValue, () => {
  emit("changeReserveFilterValue", reserveFilterValue.value)
})
watch(typeFilterValue, () => {
  emit("changeTypeFilterValue", typeFilterValue.value)
})

const isPauseValue = ref(props.isPause)
const clickPlayer = () => {
  isPauseValue.value = !isPauseValue.value
  emit("changeIsPause", isPauseValue.value)
}
</script>

<template>
  <div class="grid gap-3">
    <div class="flex justify-between">
      <div>
        <div class="flex justify-between items-end">
          <NuxtImg src="group_join_1.png" class="w-[4rem]" />
          <NuxtImg src="id_growth_1.png" class="w-[2rem]" />
        </div>
        <h1 class="text-3xl font-bold leading-none">ばんぱく！ Tier メーカー！</h1>
      </div>
      <div>
        <UButton icon="i-tabler-share" size="xl" color="neutral" variant="outline" />
        <UButton :icon="isPauseValue ? 'tabler-player-play' : 'i-tabler-player-pause'" size="xl" color="neutral"
          variant="outline" @click="clickPlayer" />
      </div>
    </div>
    <div class="flex justify-around">
      <div>
        <p class="text-2xl font-bold">予約可否</p>
        <UCheckboxGroup v-model="reserveFilterValue" size="xl" :items="reserveFilterItems" orientation="horizontal" />
      </div>

      <div>
        <p class="text-2xl font-bold">パビリオンの種類</p>
        <UCheckboxGroup v-model="typeFilterValue" size="xl" :items="typeFilterItems" orientation="horizontal" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
