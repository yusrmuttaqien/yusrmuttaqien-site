<script setup lang="ts">
import type { ExposeNavigationContainer } from '~/types/components-navigation-container';

const nav = ref<HTMLElement | null>(null);
const customInfoClass = useDynamicCustomClass('custom-navigation-info');
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
    <slot />
    <div :class="{ info: true, [customInfoClass]: true }">
      <p class="identifier trim-libre-barcode-128">@Mazing_123</p>
      <p class="credit">
        <span class="trim-plus-jakarta-sans">Personal Website</span>
        <span class="trim-plus-jakarta-sans">Designed by Yusril</span>
      </p>
    </div>
  </nav>
</template>

<style lang="scss">
@layer base {
  .navigation-container {
    background-color: rgba(var.$color-white, 0.01);
    border-top: 2px solid rgba(var.$color-white, 0.8);
    backdrop-filter: blur(10px);
    display: grid;
    grid-auto-flow: column;

    .info,
    .navigation-item {
      padding: 16px 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .info {
      grid-area: if;

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

    .navigation-item {
      font-weight: 200;
      text-transform: uppercase;
      font-size: 14px;
      cursor: pointer;
      user-select: none;
      transition-property: color, background-color;
      transition-duration: 0.2s;
      transition-timing-function: ease-in-out;

      &:hover {
        background-color: var.$color-white;
        color: black;
      }

      &:active {
        background-color: rgba(var.$color-white, 0.8);
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
      .info,
      .navigation-item {
        padding: 26px 0;
      }

      .info {
        padding-left: 32px;
        padding-right: 32px;

        .identifier {
          font-size: 42px;
        }

        .credit span {
          font-size: 16px;
        }
      }

      .navigation-item {
        font-size: 20px;
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
      .info {
        width: max-content;
      }
    }
  }
}
</style>
