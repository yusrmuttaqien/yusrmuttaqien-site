<script setup lang="ts">
</script>

<template>
    <header>
        <div class="titles">
            <NuxtLink class="display-nav title hide-mobile" to="/">yusrmuttaqien</NuxtLink>
            <NuxtLink class="display-nav title hide-next show-mobile" to="/">yusr</NuxtLink>
            <p class="paragraph-location subtitle hide-next show-desktop">
                <NuxtLink to="/">indonesia</NuxtLink>-<NuxtLink to="/">malang</NuxtLink>
            </p>
            <p class="paragraph-location subtitle hide-desktop">
                <NuxtLink to="/">id</NuxtLink>-<NuxtLink to="/">mlg</NuxtLink>
            </p>
        </div>
        <nav>
            <NuxtLink activeClass="link-active" class="paragraph-nav link" to="/">Introduction</NuxtLink>
            <NuxtLink activeClass="link-active" class="paragraph-nav link" to="/about-me">About Me</NuxtLink>
            <NuxtLink activeClass="link-active" class="paragraph-nav link" to="/projects">Projects</NuxtLink>
            <NuxtLink activeClass="link-active" class="paragraph-nav link" data-disabled="true" to="#">Blogs (Soon)
            </NuxtLink>
            <NuxtLink activeClass="link-active" class="paragraph-nav link" data-disabled="true" to="#">Coming Soon...
            </NuxtLink>
        </nav>
    </header>
</template>

<style scoped lang="scss">
header {
    position: sticky;
    inset: 0;
    top: -3.625rem; // .titles + .titles's margin + 2px
    background: url('@/assets/images/noise.png') rgba(var.$black, .8);
    backdrop-filter: blur(10px);
    background-blend-mode: color-dodge;

    .titles {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        margin-bottom: 1rem;

        .title,
        .subtitle a {
            text-decoration: none;
        }

        @include var.padding(0);
    }

    nav {
        display: flex;
        overflow: auto;
        border-color: var.$white;
        border-top: 0.0625rem solid;
        border-bottom: 0.125rem solid;
        gap: 2.5rem;

        .link {
            flex-shrink: 0;
            text-transform: uppercase;
            text-decoration: none;

            &-active:not([data-disabled="true"]) {
                text-decoration: underline;
            }

            &[data-disabled="true"] {
                color: rgba(var.$white, 0.5);
                cursor: no-drop;
            }
        }



        @include var.padding(1rem);
    }

    @media screen and (min-width: var.withPx(var.$screen-min-desktop)) {
        top: -4.75rem; // .titles + .titles's margin + 2px

        nav {
            justify-content: space-between;
            gap: unset;
        }
    }
}
</style>