<script setup lang="ts">
const { error } = defineProps({
    error: Object
})

useHead({
    title: error?.statusCode + ' | Yusril Muttaqien',
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon-dark.svg', media: '(prefers-color-scheme: light)' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon-light.svg', media: '(prefers-color-scheme: dark)' }
    ]
})

const _handleClear = () => clearError({ redirect: '/' })
const message = error?.message.substring(0, error?.message.indexOf(':') + 1).replace(':', '') || ''
</script>

<template>
    <main>
        <div class="info">
            <img alt="yusrmuttaqien-logo" draggable="false" src="/svgs/yusr.svg" />
            <div class="description">
                <p class="header-normal title">{{ error?.statusCode }}</p>
                <p class="caption-pill">{{ message }}</p>
            </div>
        </div>
        <div class="line" />
        <p @click="_handleClear" class="paragraph-normal action">go back home</p>
    </main>
</template>

<style scoped lang="scss">
main {
    text-align: center;

    .info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;

        img {
            height: 3.75rem;

            @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
                height: 5.375rem;
            }
        }

        .description {
            text-align: center;

            .title {
                margin-bottom: 0.5rem;
            }
        }
    }

    .line {
        width: 5.375rem;
        border-top: 0.0625rem solid var.$white;
        margin: 2rem auto;
    }

    .action {
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
        display: grid;
        grid-template-columns: repeat(3, max-content);
        grid-template-rows: max-content;
        align-items: center;
        justify-content: center;

        .line {
            margin: 0 2rem;
            width: 0;
            align-self: stretch;
            border-top: none;
            border-left: 0.0625rem solid var.$white;

            @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
                margin: 0 2.5rem;
            }
        }
    }

    @include var.padding(0);
}
</style>