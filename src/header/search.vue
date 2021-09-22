<template>
    <div class="c-header-search" id="c-header-search">
        <div class="c-search">
            <form class="u-form" :action="url" :target="isPhone ? '_self' : '_blank'">
                <input class="u-text" type="text" autocomplete="off" name="q" placeholder="搜索.." />
                <input type="hidden" name="client" :value="client" />
                <i class="u-btn">
                    <img svg-inline src="../../assets/img/header/search-key-slash.svg" />
                </i>
            </form>
        </div>
    </div>
</template>

<script>
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "search",
    data: function () {
        return {
            isPhone: window.innerWidth < 720 ? true : false,
            url: __Root + "search",
            client: location.href.includes("origin") ? "origin" : "std",
        };
    },
    computed: {},
    methods: {},
    created: function () {},
    components: {},
};
</script>