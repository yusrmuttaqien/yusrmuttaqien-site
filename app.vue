<script setup lang="ts">
import Lenis from '@studio-freight/lenis';
import 'unfonts.css';

function _initLenis() {
  const lenisInstance = new Lenis();

  function raf(time: number) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
}

useMeta();
onMounted(() => {
  _initLenis();
});
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
