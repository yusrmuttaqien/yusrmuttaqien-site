<script setup lang="ts">
import type { ExposeNavigationContainer } from '~/types/components-navigation-container';

const nav = ref<HTMLElement | null>(null);
const props = withDefaults(
  defineProps<{
    class: string;
  }>(),
  {
    class: '',
  }
);

defineExpose<ExposeNavigationContainer>({ ref: nav });
</script>

<template>
  <nav :class="{ [props.class]: !!props.class, 'navigation-container': true }" ref="nav">
    <!-- <slot /> -->
    <div class="info">
      <p class="identifier trim-libre-barcode-128">@Mazing_123</p>
      <p class="credit">
        <span class="trim-plus-jakarta-sans">Personal Website</span>
        <span class="trim-plus-jakarta-sans">Designed by Yusril</span>
      </p>
    </div>
  </nav>
</template>

<style lang="scss">
.navigation-container {
  background-color: rgba(var.$color-white, 0.01);
  border-top: 2px solid rgba(var.$color-white, 0.8);
  backdrop-filter: blur(10px);

  .info {
    display: flex;
    align-items: center;
    padding: 16px 0;
    justify-content: center;

    .identifier {
      font-family: 'Libre Barcode 128';
      font-size: 35px;
    }

    .credit {
      text-transform: uppercase;
      display: flex;
      flex-direction: column;
      margin-left: 10px;
      overflow: hidden;

      span {
        font-size: 14px;

        &:first-child {
          font-weight: 200;
        }

        &:last-child {
          font-weight: 700;
        }
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    .info {
      padding: 26px 0;

      .identifier {
        font-size: 42px;
      }

      .credit span {
        font-size: 16px;
      }
    }
  }
}
</style>
