<script setup lang="ts">
import ProjectsCard from './ProjectsCard.vue';

const DUMMY_CARD = (index: number) => ({
  title: 'DUMMYs',
  index,
  imageSrc:
    'https://images.unsplash.com/photo-1692005104293-8a319ce41665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
});
const DUMMY_ARRAY = [DUMMY_CARD];
</script>

<template>
  <section>
    <div>
      <h2>PROJECTS</h2>
    </div>
    <div>
      <ProjectsCard />
      <ProjectsCard />
      <ProjectsCard />
      <ProjectsCard />
      <ProjectsCard />
    </div>
  </section>
</template>

<style scoped lang="scss">
section {
  $padding: 1rem;

  display: flex;
  padding: $padding;
  height: max-content;
  min-height: 100svh;
  position: relative;

  > div {
    display: flex;

    &:nth-of-type(1) {
      position: relative;

      h2 {
        height: 100svh;
        max-height: max-content;
        position: sticky;
        top: 0;
        left: 0;
        transform: rotate(180deg);
        writing-mode: vertical-lr;
        text-orientation: mixed;
        font-weight: 300;
        font-size: 4.1975rem;
        text-transform: uppercase;
        color: rgba(var.$blue-light, 0.1);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &:nth-of-type(2) {
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(1, 1fr);
      flex: 1;
      padding: 1rem 1rem 0 0;
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    $padding: 1.125rem;

    > div {
      &:nth-of-type(1) {
        h2 {
          font-size: 6.9675rem;
        }
      }

      &:nth-of-type(2) {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
        padding: 1.125rem 1.125rem 0 0;
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
    $padding: 2rem;

    > div {
      &:nth-of-type(2) {
        grid-template-columns: repeat(3, 1fr);
        row-gap: 2.25rem;
        column-gap: 2rem;
        padding: 2rem 2rem 0 0;
      }
    }
  }
}
</style>
