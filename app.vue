<script setup>
import 'unfonts.css'

useHead({
    title: 'Yusril Muttaqien',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: dark)' }
    ]
})
</script>

<template>
    <Navbar />
    <main>
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
    </main>
    <Footer />
</template>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var.$white;
    font-family: 'Plus Jakarta Sans', sans-serif;

    &::-webkit-scrollbar {
        display: none;
    }
}

html {
    background-color: var.$black;
    font-size: calc(100vw * 16 / var.$screen-min-mobile);

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
        font-size: calc(100vw * 16 / var.$screen-min-tablet);
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
        font-size: calc(100vw * 16 / var.$screen-min-desktop);
    }
}

body {
    --paddingY: 1.875rem;
    padding: var(--paddingY) 0;

    #__nuxt {
        display: flex;
        flex-direction: column;
        min-height: calc(100svh - var(--paddingY) * 2);

        main {
            flex: 1;
        }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
        --paddingY: 2.0625rem;
    }

    @include var.typography();
    @include var.utils();
}
</style>