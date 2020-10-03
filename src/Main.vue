<template>
    <main
        class="c-main"
        :class="{ 'without-right': withoutRight, 'without-left': expanding }"
    >
        <slot></slot>
    </main>
</template>

<script>
import Bus from "../service/bus";
export default {
    name: "Main",
    props: ["withoutRight","withoutLeft"],
    data: function() {
        return {
        };
    },
    computed: {
        expanding : function (){
            return this.withoutLeft == undefined ? false : this.withoutLeft
        }
    },
    methods: {},
    mounted: function() {
        Bus.$on("toggleLeftSide", (data) => {
            this.expanding = !data;
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/main.less";
</style>
