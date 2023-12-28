<script setup lang="ts"></script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
* {
  font-family: Plus Jakarta Sans;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

html {
  background-color: black;
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

    @include var.typography();
  }
}
</style>
