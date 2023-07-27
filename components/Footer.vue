<template>
    <footer>
        <img alt="yusrmuttaqien-logo-full" draggable="false" src="/svgs/yusr-full.svg" />
        <div class="line" />
        <p class="paragraph-normal">2023</p>
    </footer>
</template>

<style scoped lang="scss">
footer {
    --paddingTop: 1.5rem;
    text-align: center;
    border-top: 0.125rem solid var.$white;

    img {
        height: 3.75rem;

        @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
            height: 5.375rem;
        }
    }

    .line {
        width: 5.375rem;
        border-top: 0.0625rem solid var.$white;
        margin: 1rem auto;
    }

    @media screen and (min-width: var.withPx(var.$screen-min-tablet)) {
        --paddingTop: 2rem;
        display: grid;
        grid-template-columns: repeat(3, max-content);
        grid-template-rows: max-content;
        align-items: center;
        justify-content: center;

        .line {
            margin: 0 2rem;
            width: 0;
            height: 100%;
            border-top: none;
            border-left: 0.0625rem solid var.$white;

            @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
                margin: 0 2.5rem;
            }
        }
    }


    @include var.padding(var(--paddingTop), 0);
}
</style>