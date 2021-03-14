<template>
    <div class="w-filter-tag" :class="{ on: visible }">
        <span class="u-label" @click="toggleFilter">
            <span class="u-current-filter"
                ><i class="el-icon-collection-tag"></i>
                {{ current || "全部" }}</span
            >
            <span class="u-toggle">
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-up"></i>
            </span>
        </span>
        <span class="u-options">
            <span
                class="u-mode u-all"
                :class="{ on: value === '' }"
                @click="filter('', '')"
                ><i class="el-icon-collection-tag"></i> 全部</span
            >
            <span
                v-for="(item, key) in data"
                :key="key"
                class="u-mode"
                :class="{ on: item == current }"
                @click="filter(key)"
                ><i class="el-icon-collection-tag"></i> {{ item }}</span
            >
            <slot></slot>
        </span>
    </div>
</template>

<script>
export default {
    name: "tagBy",
    props: ["data", "type"],
    data: function() {
        return {
            visible: false,
            value: "",
        };
    },
    computed: {
        current: function() {
            return this.data[this.value];
        },
    },
    methods: {
        toggleFilter: function() {
            this.visible = !this.visible;
        },
        filter: function(key) {
            this.value = key;
            this.$emit("filter", { type: this.type, val: key });
            this.visible = false;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
    @import '../assets/css/tag-by.less';
</style>
