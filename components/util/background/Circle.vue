<script setup lang="ts"></script>

<template>
  <div class="fixed inset-0 z-[-99] blur-[7vmin] opacity-50">
    <div class="w-[60vmin] top-[3vmin] left-[5vmin] bg-primary-500 circle" />
    <div class="w-[25vmin] top-[75vmin] left-[3vmin] bg-secondary-500 circle" />
    <div class="w-[30vmin] top-[45vmin] left-[80vmin] bg-secondary-500 circle" />
    <div class="w-[35vmin] top-[73vmin] left-[60vmin] bg-primary-500 circle" />
    <div class="w-[40vmin] top-[-3vmin] left-[130vmin] bg-primary-500 circle" />
    <div class="w-[30vmin] top-[30vmin] left-[150vmin] bg-secondary-500 circle" />
  </div>
</template>

<style scoped>
.circle {
  position: absolute;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
