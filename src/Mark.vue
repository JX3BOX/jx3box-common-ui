<template>
    <span class="w-mark">
        <i class="w-mark-key" :style="{ 'background-color': BGL }">
            <img
                v-if="!$slots.default"
                svg-inline
                src="../assets/img/header/logo.svg"
            />
            <slot></slot>
            {{ mark_key }}
        </i>
        <span
            v-if="mark_value"
            class="w-mark-value"
            :style="{ 'background-color': BGR }"
            >{{ mark_value }}</span
        >
    </span>
</template>

<script>
export default {
    name: "Mark",
    props: ["label", "value", "BGL", "BGR"],
    data: function() {
        return {
            mark_key: this.label || "JX3BOX",
            mark_value: this.value,
        };
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/mark.less";
</style>
