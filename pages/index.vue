<script setup lang="ts">
import Project from '~/fragments/Home/Project.vue';
// import ContentList from '~/fragments/Home/ContentList.vue';
</script>

<template>
  <section>
    <img
      src="~/assets/svgs/backdrop.svg"
      alt="backdrop"
      loading="lazy"
      class="backdrop"
      draggable="false"
    />
    <div class="contents">
      <div class="content">
        <p class="description">
          <span>A <span>software engineer</span>, mainly dealing with Frontend in web.</span>
        </p>
        <Project />
      </div>
      <!-- <ContentList /> -->
    </div>
    <h1 class="-hero">Yusril Muttaqien</h1>
  </section>
</template>

<style scoped lang="scss">
section {
  display: flex;
  position: relative;
  flex-direction: column;
  height: max-content;
  min-height: 100svh;
  padding: 1rem;
  overflow: hidden;

  .backdrop {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    user-select: none;
    pointer-events: none;
    width: 29.125rem;
    width: clamp(29.125rem, 125vw + 4.125rem, 62.25rem);
  }

  .contents {
    flex: 1;
    display: inherit;
    align-items: center;
    justify-content: space-between;

    .content {
      --_gap: 1.5rem;

      flex: 1;
      display: inherit;
      flex-direction: column;
      margin: 1.5rem 0;
      margin: clamp(1.5rem, 2vw + 1.123rem, 2rem) 0;
      margin-left: 0;
      margin-left: clamp(0rem, 8vw + -1.509rem, 2rem);
      margin-right: 1.5rem;

      .description {
        display: inherit;
        flex-direction: column;
        margin-bottom: var(--_gap);
        width: 11.125rem;
        width: clamp(11.125rem, 18vw + 7.493rem, 15.938rem);

        > span {
          color: rgba(var.$blue-text, 0.5);

          span {
            color: rgba(var.$blue-text, 0.8);
          }
        }

        &::after {
          content: '';
          height: 1px;
          margin-top: var(--_gap);
          background-color: rgba(var.$blue-text, 0.2);
          width: 100%;
        }
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
    padding: 1.5rem;

    .backdrop {
      width: 62.25rem;
      width: clamp(62.25rem, 59vw + 35.009rem, 81.875rem);
    }

    .contents .content {
      --_gap: 1.5rem;

      margin: 2rem;
      margin: clamp(2rem, 3vw + 0.699rem, 2.938rem) clamp(2rem, 18vw + -6.328rem, 8rem);

      .description {
        margin-bottom: var(--_gap);
        margin-bottom: clamp(1.5rem, 1vw + 0.806rem, 2rem);
        width: 15.938rem;

        &::after {
          margin-top: var(--_gap);
          margin-top: clamp(1.5rem, 1vw + 0.806rem, 2rem);
        }
      }
    }
  }

  @media screen and (min-width: var.withPx(calc(((var.$screen-min-desktop - var.$screen-min-tablet) / 2) + var.$screen-min-tablet))) {
    .contents .content {
      --_gap: 2rem;

      flex-direction: row;

      .description {
        flex-direction: row;
        align-items: center;
        margin-bottom: 0;
        margin-right: var(--_gap);

        > span {
          width: 15.9375rem;
        }

        &::after {
          height: 100%;
          width: 1px;
          margin-top: 0;
          margin-left: var(--_gap);
        }
      }
    }
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
    padding: 2rem;

    .backdrop {
      width: 81.875rem;
    }

    .contents .content {
      margin: 2.938rem 8rem;
    }
  }
}
</style>
