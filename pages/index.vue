<script setup lang="ts">
import type { ExposeNavigationContainer } from '~/types/components-navigation-container';

const ID_INDEX_PAGE = 'index-page';
const sequence = useWaitSequence(ID_INDEX_PAGE);
const nav = ref<ExposeNavigationContainer | null>(null);
const marginTop = computed(() => {
  let height = nav.value?.ref?.offsetHeight || null;

  if (!height || !sequence.currentID.value) return '0px';
  const style = window.getComputedStyle(nav.value?.ref as HTMLElement);
  height += parseInt(style.marginTop);
  sequence.updateSequence(sequence.currentID.value, true);
  return `${height}px`;
});

onUnmounted(() => {
  sequence.cleanupSequence();
});
</script>

<template>
  <div class="index-container">
    <MainTitle />
    <p class="description">
      dealing with frontend in the web. attracted to brutalist design. would love to share and chat
      anything about technology
    </p>
  </div>
  <NavigationContainer class="custom-navigation-container-" ref="nav" />
</template>

<style lang="scss">
.index-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-top: v-bind(marginTop);

  .description {
    text-transform: uppercase;
    text-align: justify;
    margin: 44px 28px 0;
  }
}

.custom-layout-main- {
  display: flex;
  flex-direction: column;
}

.custom-navigation-container- {
  position: sticky;
  left: 0;
  right: 0;
  bottom: 0;
  margin-top: 32px;
}

@media screen and (min-width: var.withPx(var.$screen-min-mobile-1)) {
  .index-container {
    padding: 0 28px;

    .description {
      margin: 44px auto 0;
      width: 358px;
    }
  }
}

@media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
  .index-container {
    padding: 0 51px;

    .description {
      margin: 60px auto 0;
      width: 601px;
      font-size: 18px;
    }
  }
}

@media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
  .index-container {
    padding: 0 73px;

    .description {
      margin: 71px auto 0;
      width: 635px;
    }
  }
}
</style>
