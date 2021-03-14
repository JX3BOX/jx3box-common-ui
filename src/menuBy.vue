<template>
    <span class="w-filter-menu" v-if="data">
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="u-menu-label"
                    ><i class="el-icon-s-operation"></i
                    >{{ current ? current : deftext }}</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="filter('')">{{
                    "全部"
                }}</el-dropdown-item>
                <el-dropdown-item
                    v-for="(item, key) in data"
                    :key="key"
                    @click.native="filter(key)"
                    >{{ item }}</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</template>

<script>
export default {
    name: "menuBy",
    props: ["data", "type", "placeholder"],
    data: function() {
        return {
            value: "",
        };
    },
    computed: {
        current: function() {
            return this.data[this.value];
        },
        deftext: function() {
            return this.placeholder || "筛选";
        },
    },
    methods: {
        filter: function(key) {
            this.value = key;
            this.$emit("filter", { type: this.type, val: key });
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
    @import '../assets/css/menu-by.less';
</style>
