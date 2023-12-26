<script setup lang="ts">
const sequence = useWaitSequence();
const route = useRoute();
const opacity = computed(() => (sequence.isSequenceComplete.value ? 1 : 0));
const customClass = computed(() => `custom-layout${route.fullPath.replace('/', '-')}`);
const customMainClass = computed(() => `custom-layout-main${route.fullPath.replace('/', '-')}`);
</script>

<template>
  <div
    :class="{
      layout: true,
      'layout-default': true,
      [customClass]: true,
    }"
  >
    <!-- Add canvas noise & gradient animation here -->
    <main :class="{ [customMainClass]: true }">
      <slot />
    </main>
  </div>
</template>

<style lang="scss">
.layout-default {
  position: relative;
  opacity: v-bind(opacity);
  transition: opacity 0.2s ease-in-out;

  > main {
    position: relative;
    z-index: 2;
    height: inherit;
  }
}
</style>
