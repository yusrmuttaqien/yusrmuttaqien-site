<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@layer base, custom;

@layer base {
  * {
    font-family: Urbanist;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;

    a {
      color: var.$color-white;

      &:not(.external) {
        text-decoration: none;
      }
    }

    &.lenis-smooth {
      scroll-behavior: auto;
    }

    &.lenis-smooth [data-lenis-prevent] {
      overscroll-behavior: contain;
    }

    &.lenis-stopped {
      overflow: hidden;
    }

    &.lenis-scrolling iframe {
      pointer-events: none;
    }
  }

  html {
    background-color: var.$color-black;
    color: var.$color-white;
    min-height: 320px;
    height: 100svh;

    body {
      width: 320px;
      min-width: 100%;
      height: 100%;

      #__nuxt,
      #__nuxt .layout {
        height: inherit;
      }
    }
  }

  @include var.defaultValue();
  @include var.typography();
  @include var.dimension();
}
</style>
