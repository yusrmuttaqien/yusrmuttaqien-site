<script setup lang="ts">
import ProjectList from './ProjectList.vue';
import { PROJECTS } from '~/constants/projects';
</script>

<template>
  <div class="container-project">
    <p class="title -available" v-if="PROJECTS.length > 0">projects.</p>
    <p class="title" v-else>no project listed.</p>
    <ProjectList v-if="PROJECTS.length > 0" />
  </div>
</template>

<style scoped lang="scss">
.container-project {
  width: 100%;
  max-width: max-content;
  display: inherit;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;

  p {
    font-size: 1rem;
  }

  .title {
    color: rgba(var.$blue-text, 0.3);

    &.-available {
      margin-bottom: 0.625rem;
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
  }
}
</style>
