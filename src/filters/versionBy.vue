<template>
    <div class="w-filter-client">
        <ul>
            <li class="u-client" :class="{on: version == ''}" @click="filter('')">
                双端
            </li>
            <li
                class="u-client"
                :class="{ on: version == value }"
                v-for="(label, value) in versions"
                :key="value"
                @click="filter(value)"
            >{{ label }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "versionBy",
    props: ["value"],
    data: function () {
        return {
            version: this.value || "",
        };
    },
    computed: {
        versions: function () {
            const versions = {
                0: "旗舰",
                1: "无界"
            }
            return versions;
        },
    },
    methods: {
        filter: function (val) {
            this.version = val;
            this.$emit("filter", { type: "version", val: val });
            this.$forceUpdate();
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/client-by.less";
</style>
