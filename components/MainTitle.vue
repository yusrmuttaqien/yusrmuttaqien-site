<script setup lang="ts">
import css from '~/styles/_export.module.scss';

const isTablet = useMediaQuery(`(min-width: ${css.screenMinTablet}px)`);
const TitleProps = computed(() => ({
  height: isTablet.value ? '84.991' : '86',
  width: isTablet.value ? '692' : '265',
  fontSize: isTablet.value ? '120px' : '60px',
  fontClass: isTablet.value ? 'trim-notable' : 'trim-nogap-notable',
}));
</script>

<template>
  <div class="main-title">
    <p><span>your</span> <span class="trim-plus-jakarta-sans">developer</span></p>
    <SVGWrapper :height="TitleProps.height" :width="TitleProps.width">
      <h1 :class="TitleProps.fontClass">Yusril M</h1>
    </SVGWrapper>
    <p><span>web</span> <span class="trim-plus-jakarta-sans">frontend</span></p>
  </div>
</template>

<style lang="scss">
@layer base {
  .main-title {
    width: 100%;

    h1 {
      font-family: Notable;
      font-size: v-bind('TitleProps.fontSize');
      width: min-content;
      text-align: center;
    }

    p {
      text-transform: uppercase;
      font-weight: 500;
      display: flex;
      justify-content: center;

      span {
        &:nth-child(1) {
          font-size: 13px;
          line-height: 1.3em;
        }

        &:nth-child(2) {
          font-size: 21px;
          font-weight: 700;
          margin-left: 7px;
        }
      }

      &:nth-of-type(1) {
        align-items: end;
      }

      &:nth-of-type(2) {
        span {
          &:nth-child(1) {
            line-height: 0.7em;
          }

          &:nth-child(2) {
            line-height: 0.95em;
          }
        }
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
      h1 {
        width: max-content;
      }

      p {
        width: max-content;

        span {
          &:nth-child(1) {
            font-size: 19px;
          }

          &:nth-child(2) {
            font-size: 30px;
          }
        }

        &:nth-of-type(2) {
          margin-left: auto;

          span {
            &:nth-child(1) {
              line-height: 0.8em;
            }

            &:nth-child(2) {
              line-height: 1.03em;
            }
          }
        }
      }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
      p {
        span {
          &:nth-child(1) {
            font-size: 23px;
          }

          &:nth-child(2) {
            font-size: 37px;
          }
        }
      }
    }
  }
}
</style>
