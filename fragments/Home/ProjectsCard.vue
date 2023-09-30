<script setup lang="ts">
const props = defineProps<{
  content?: {
    title: string;
    imageSrc: string;
  };
}>();
</script>

<template>
  <figure>
    <img
      src="https://images.unsplash.com/photo-1693310134679-88ffee7c0b98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=800&q=60"
    />
    <p>laporkeun</p>
  </figure>
</template>

<style scoped lang="scss">
figure {
  background-color: var.$blue-light;
  padding: 0.75rem;
  height: max-content;

  img {
    width: 100%;
    height: 16.125rem;
    object-fit: cover;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 2.25rem;
    color: var.$blue-base;
    text-transform: uppercase;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 13.5rem;
    font-weight: 500;
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    padding: 0.8275rem;

    img {
      height: 19.25rem;
    }

    p {
      font-size: 2.6738rem;
      width: 16rem;
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
    padding: 1rem;

    img {
      height: 24.0625rem;
    }

    p {
      font-size: 3.3401rem;
      width: 20rem;
    }
  }
}
</style>
