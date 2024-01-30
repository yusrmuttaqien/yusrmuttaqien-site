<script setup lang="ts">
import css from '~/styles/_export.module.scss';

const isTablet = useMediaQuery(`(min-width: ${css.screenMinTablet}px)`);
const isDesktop = useMediaQuery(`(min-width: ${css.screenMinDesktop}px)`);
const YMHeight = computed(() => (isTablet() ? '413.99' : isDesktop() ? '458.5' : '148.72'));
</script>

<template>
  <div class="under-construction-container">
    <div class="info">
      <h1>Sorry!</h1>
      <p>The site is under<br />construction.</p>
    </div>
    <SVGYM class="custom-svg-ym" />
  </div>
</template>

<style lang="scss">
@layer custom {
  .custom-layout-default-main- {
    padding: var(--space-x) var(--space-y);
    transition-property: padding;
    display: grid;
    place-content: center;
    overflow: auto;

    .under-construction-container {
      position: relative;
      display: flex;
      align-items: center;

      .info {
        font-size: clamp(1rem, 0.2453rem + 3.7736vw, 2rem);
        text-transform: uppercase;
        margin-right: calc(clamp(5.9375rem, -1.0908rem + 35.1415vw, 15.25rem) * -1);
        z-index: 1;

        h1 {
          font-weight: 900;
          font-style: italic;
        }
      }

      .custom-svg-ym {
        height: clamp(9.295rem, -3.2178rem + 62.5638vw, 25.8744rem);
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
      .under-construction-container {
        .info {
          font-size: 2rem;
          margin-right: -15.25rem;
          transition-property: font-size, margin-right;
        }

        .custom-svg-ym {
          transition-property: height;
          height: 25.8744rem;
        }
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
      .under-construction-container {
        .info {
          margin-right: -10rem;
          font-size: 3.375rem;
        }

        .custom-svg-ym {
          height: 28.6563rem;
        }
      }
    }
  }
}
</style>
