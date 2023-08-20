<script setup lang="ts">
const { error } = defineProps({
  error: Object,
});

useHead({
  title: error?.statusCode + ' | YUSRIL MUTTAQIEN',
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
});

const _handleClear = () => clearError({ redirect: '/' });
</script>

<template>
  <main>
    <img src="/favicon.svg" alt="yusrmuttaqien's logo" />
    <div>
      <h1>{{ error?.statusCode || '000' }}</h1>
      <p @click="_handleClear">go home</p>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: max-content;
  min-height: 100svh;
  gap: 1rem;

  img {
    width: 5.125rem;
  }

  div {
    text-align: center;

    h1,
    p {
      color: var.$blue-light;
    }

    h1 {
      font-size: 3.0625rem;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1rem;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    img {
      width: 6.125rem;
    }

    div {
      h1 {
        font-size: 3.5rem;
      }

      p {
        font-size: 1.125rem;
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    div {
      h1 {
        font-size: 3.75rem;
      }

      p {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
