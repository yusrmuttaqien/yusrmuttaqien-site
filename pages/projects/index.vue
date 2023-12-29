<script setup lang="ts">
const sequence = useWaitSequence();

onBeforeMount(() => {
  sequence.setEnableSequence(false);
});
</script>

<template>
  <div class="projects-container">
    <header>
      <h1 class="trim-notable truncate" title="Projects">Projects</h1>
      <p class="trim-plus-jakarta-sans">0/0</p>
    </header>
  </div>
  <NavigationContainer class="custom-navigation-container-projects">
    <NuxtLink class="navigation-item item-gb" href="/">Go back</NuxtLink>
  </NavigationContainer>
</template>

<style lang="scss">
@layer base {
  .projects-container {
    flex: 1;

    header {
      margin: 43px 28px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      h1 {
        font-family: Notable;
        font-size: 32px;
        margin-right: 16px;
      }

      p {
        flex-shrink: 0;
        font-size: 24px;
        font-weight: 200;
      }
    }
  }
}

@layer custom {
  .custom-layout-main-projects {
    display: flex;
    flex-direction: column;
  }

  .custom-navigation-container-projects {
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    margin-top: 32px;
    grid-template-areas:
      'gb'
      'if';

    .item-gb {
      grid-area: gb;
      border-bottom: 1px solid var.$color-white;
    }
  }
}

@media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
  @layer base {
    .projects-container {
      header {
        margin: 67px 51px 0;

        h1 {
          font-size: 65px;
        }

        p {
          font-size: 30px;
        }
      }
    }
  }
}

@media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
  @layer base {
    .projects-container {
      header {
        margin: 54px 73px 0;
      }
    }
  }

  @layer custom {
    .custom-navigation-container-projects {
      grid-template-areas: 'gb if';
      grid-template-columns: 1fr;

      .item-gb {
        border: none;
        border-right: 1px solid var.$color-white;
      }
    }
  }
}
</style>
