<script setup lang="ts">
const props = defineProps<{
  height: string;
  width: string;
  svgWidth?: string;
}>();
const viewBox = computed(() => `0 0 ${props.width} ${props.height}`);
</script>

<template>
  <svg :viewBox="viewBox" :width="props.svgWidth">
    <foreignObject width="100%" height="100%">
      <slot />
    </foreignObject>
  </svg>
</template>
