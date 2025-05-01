<script setup lang="ts">
defineProps<{
  url: string | null
}>()

const emit = defineEmits<{ close: [boolean] }>()
</script>

<template>
  <UModal :close="{ onClick: () => emit('close', false) }" :title="`共有 URL コピー完了`">
    <template #content>
      <div class="grid place-items-center h-[10rem]">

        <p v-if="url">
          <UIcon name="i-tabler-clipboard-check" />クリップボードにコピーされました！
        </p>
        <p v-else>loading...</p>
      </div>
    </template>
  </UModal>
</template>


<style scoped></style>
