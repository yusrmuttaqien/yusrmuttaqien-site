<script setup lang="ts">
const sequence = useWaitSequence();
const customClass = useDynamicCustomClass('custom-layout-default');
const customMainClass = useDynamicCustomClass('custom-layout-default-main');
const opacity = computed(() => (sequence.isSequenceComplete.value ? 1 : 0));
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
@layer base {
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
}
</style>
