<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    id: string;
    class: string;
    as?: string;
    others?: object;
  }>(),
  {
    class: '',
    as: 'div',
  }
);
</script>

<template>
  <component :is="props.as" :class="{ 'navigation-item': true, [props.class]: !!props.class }">
    <slot />
  </component>
</template>

<style lang="scss">
.navigation-item {
  font-weight: 200;
  text-transform: uppercase;
  font-size: 14px;
  grid-area: v-bind('props.id');

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    font-size: 20px;
  }
}
</style>
