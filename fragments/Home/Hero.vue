<script setup lang="ts"></script>

<template>
  <section>
    <img src="~/assets/svgs/logo.svg" alt="yusrmuttaqien's logo" />
    <h1>Yusril Muttaqien</h1>
  </section>
</template>

<style scoped lang="scss">
section {
  padding: 1.4375rem;
  height: max-content;
  min-height: calc(100svh - 10svh);
  display: flex;
  flex-direction: column;
  justify-content: center;

  img,
  h1 {
    margin-bottom: 1rem;
  }

  img {
    width: 5.625rem;
  }

  h1 {
    color: var.$blue-light;
    text-transform: uppercase;
    font-size: 2.9375rem;
    font-weight: 900;
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    padding: 3.5rem;

    img,
    h1 {
      margin-bottom: 1.25rem;
    }

    img {
      width: 6.25rem;
    }

    h1 {
      font-size: 4.0807rem;
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
    padding: 5.5rem;
    align-items: center;

    img,
    h1 {
      margin-bottom: 2rem;
    }

    img {
      width: 7.1875rem;
    }

    h1 {
      font-size: 7.1452rem;
    }
  }
}
</style>
