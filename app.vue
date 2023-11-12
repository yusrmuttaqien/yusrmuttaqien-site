<script setup lang="ts">
import { useWindowSize, watchDebounced } from '@vueuse/core';
import { initLenis } from '~/utils';
import { LenisInstance } from '~/types/lenis';
import 'unfonts.css';

let lenisInstance: LenisInstance;
const resizeEvent = useWindowSize();

useMeta();
onMounted(() => {
  lenisInstance = initLenis();
});
watchDebounced(
  () => resizeEvent,
  () => {
    lenisInstance.resize();
  },
  { deep: true, debounce: 100 }
);
</script>

<template>
  <main>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </main>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: var.$blue-text;
  font-family: 'Nohemi', serif;

  &::-webkit-scrollbar {
    display: none;
  }

  &::selection {
    color: var.$blue-base;
    background: rgba(var.$blue-light, 0.8);
  }
}

html {
  background-color: var.$blue-base;
}

body {
  width: 320px;
  min-width: 100vw;

  @include var.typography();
  @include var.utils();
}
</style>
