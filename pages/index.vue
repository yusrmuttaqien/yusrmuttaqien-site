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

function _goToProjects() {
  console.log('redirect to projects page');
}

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
  <NavigationContainer class="custom-navigation-container-" ref="nav">
    <NavigationItem class="item" id="pj" @click="_goToProjects" target="_blank"
      >Projects</NavigationItem
    >
    <NavigationItem
      as="a"
      class="item item-ln"
      id="ln"
      href="https://www.linkedin.com/in/ydhm/"
      target="_blank"
      >LinkedIn</NavigationItem
    >
    <NavigationItem
      as="a"
      class="item item-gh"
      id="gh"
      href="https://github.com/yusrmuttaqien"
      target="_blank"
      >Github</NavigationItem
    >
  </NavigationContainer>
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
  grid-template-areas:
    'pj pj'
    'ln gh'
    'if if';
  grid-template-columns: repeat(2, 1fr);

  .item {
    cursor: pointer;
    user-select: none;
    transition-property: color, background-color;
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;

    &-ln,
    &-gh {
      border-top: 1px solid var.$color-white;
      border-bottom: 1px solid var.$color-white;
    }

    &-gh {
      border-left: 1px solid var.$color-white;
    }

    &:hover {
      background-color: var.$color-white;
      color: black;
    }

    &:active {
      background-color: rgba(var.$color-white, 0.8);
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
    grid-template-areas: 'pj ln gh if';
    grid-template-columns: repeat(3, 1fr);

    .item {
      &-ln {
        border: none;
        border-left: 1px solid var.$color-white;
        border-right: 1px solid var.$color-white;
      }

      &-gh {
        border: none;
        border-right: 1px solid var.$color-white;
      }
    }
  }
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
