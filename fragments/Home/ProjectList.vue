<script setup lang="ts">
import { vElementSize } from '@vueuse/components';
import { useOnScroll } from 'vue-composable';
import { CSSBindings } from '~/types/ProjectList';
import { PROJECTS } from '~/constants/projects';

const listEl = ref<HTMLElement | null>(null);
const listScroll = useOnScroll(listEl);
const cssBindings: CSSBindings = reactive({
  listHeight: '0px',
});
const projectListClassBindings = reactive({
  'container-projectlist': true,
  '-unscope-scrolling': PROJECTS.length <= 5,
  '-over-top': false,
  '-over-bottom': PROJECTS.length > 5,
});

function getListDimension({ height }: { height: number }) {
  cssBindings.listHeight = height.toString() + 'px';
}
function focusList(idx: number, isLeaving: boolean, id: string) {
  const getAllList = listEl.value?.querySelectorAll('p');

  const getListByAttribute = (value: number) => {
    return listEl.value?.querySelectorAll(`[data-id="${value}"]`);
  };
  const setOpacityTo = (opacity = 1, idx?: number) => {
    if (idx) {
      getListByAttribute(idx - 1)?.forEach((el) => {
        el.setAttribute('style', `opacity: ${opacity}`);
      });
    } else {
      getAllList?.forEach((el) => {
        el.style.opacity = opacity.toString();
      });
    }
  };

  if (isLeaving) {
    getAllList?.forEach((el) => {
      el.removeAttribute('style');
    });
    // TODO: call handler hide preview here
    console.log('hide preview project', id);
  } else {
    setOpacityTo(0.5);
    setOpacityTo(1, idx + 1);
    // TODO: call handler show preview here
    console.log('show preview project', id);
  }
}
function previewProject(id: string) {
  // TODO: create component for preview (slide halfway from bottom)
  // TODO: create handler function to trigger the component (show preview and show fully) remotely by passing project id
  // TODO: call handler show fully here
  console.log('show fully project', id);
}

watch(
  () => listScroll.scrollTop,
  () => {
    const { scrollTop, clientHeight, scrollHeight } = listEl.value as HTMLElement;

    if (scrollTop >= 1) {
      projectListClassBindings['-over-top'] = true;
    } else {
      projectListClassBindings['-over-top'] = false;
    }

    if (scrollTop + clientHeight >= scrollHeight) {
      projectListClassBindings['-over-bottom'] = false;
    } else {
      projectListClassBindings['-over-bottom'] = true;
    }
  },
  { deep: true }
);
</script>

<template>
  <div :class="projectListClassBindings" data-lenis-prevent>
    <nav class="list" ref="listEl">
      <template :key="`projectlist-${project.title}`" v-for="(project, idx) in PROJECTS">
        <p class="number" :data-id="idx" v-if="idx === 0" v-element-size="getListDimension" />
        <p class="number" :data-id="idx" v-else />
        <p
          class="title"
          :data-id="idx"
          @click="previewProject(project.id)"
          @mouseover="focusList(idx, false, project.id)"
          @mouseleave="focusList(idx, true, project.id)"
        >
          {{ project.title }}
        </p>
        <p class="year" :data-id="idx">
          {{ project.year }}
        </p>
      </template>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.container-projectlist {
  --_shadow-height: 20px;

  position: relative;
  overflow: hidden;

  &::before,
  &::after {
    pointer-events: none;
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
    height: var(--_shadow-height);
    transition: top 0.1s ease-in-out, bottom 0.1s ease-in-out;
    z-index: 10;
  }
  &::before {
    top: calc((var(--_shadow-height) + 1px) * -1);
    background: linear-gradient(to bottom, rgba(var.$blue-base, 1), rgba(var.$blue-base, 0));
  }
  &::after {
    bottom: calc((var(--_shadow-height) + 1px) * -1);
    background: linear-gradient(to top, rgba(var.$blue-base, 1), rgba(var.$blue-base, 0));
  }

  &.-over-top::before {
    top: -1px;
  }
  &.-over-bottom::after {
    bottom: -1px;
  }

  .list {
    --_row-gap: 0.5rem;

    display: grid;
    height: max-content;
    max-height: calc((v-bind('cssBindings.listHeight') * 5) + (var(--_row-gap) * 5));
    grid-template-columns: max-content minmax(0, 1fr) max-content;
    height: 100%;
    overflow: auto;
    overscroll-behavior: none;
    counter-set: number;

    p {
      color: rgba(var.$blue-text, 0.5);
      height: max-content;
      opacity: 1;
      transition: opacity 0.2s ease-in-out;

      &.number {
        counter-increment: number;
        text-align: right;

        &::before {
          content: counter(number);
        }
      }

      &.title {
        cursor: pointer;
        color: rgba(var.$blue-text, 0.7);
        text-transform: uppercase;
        padding: calc(var(--_row-gap) / 2) 1rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &.number,
      &.year {
        padding: calc(var(--_row-gap) / 2) 0;
      }
    }
  }
  &.-unscope-scrolling .list {
    overscroll-behavior: unset;
  }

  @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
  }

  @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
  }
}
</style>
