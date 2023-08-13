<script setup lang="ts">
import Lenis from '@studio-freight/lenis'
import { AppEmitLenis } from '@/types';
import 'unfonts.css'

const lenisInstance = ref<InstanceType<typeof Lenis> | null>(null);

function _initLenis() {
    lenisInstance.value = new Lenis()
    lenisInstance.value.stop()

    function raf(time: number) {
        lenisInstance.value?.raf(time)
        requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
}
function _handleLenis(e: AppEmitLenis) {
    if (e === AppEmitLenis.start) {
        lenisInstance.value?.start()
    } else if (e === AppEmitLenis.stop) {
        lenisInstance.value?.stop()
    }
}

useHead({
    title: 'YUSRIL MUTTAQIEN',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    ]
})
onMounted(() => {
    _initLenis()
})
</script>

<template>
    <main>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </main>
    <Splash @setLenis="_handleLenis" />
</template>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var.$blue-text;
    font-family: 'Nohemi', sans-serif;

    &::-webkit-scrollbar {
        display: none;
    }
}

html {
    background-color: var.$blue-base;
    font-size: calc(100vw * 16 / var.$screen-min-mobile);

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
        font-size: calc(100vw * 16 / var.$screen-min-tablet);
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
        font-size: calc(100vw * 16 / var.$screen-min-desktop);
    }
}

body {
    #__nuxt {
        display: flex;
        flex-direction: column;
        min-height: 100svh;
    }

    @include var.typography();
    @include var.utils();
}
</style>