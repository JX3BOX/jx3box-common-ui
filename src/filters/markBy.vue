<template>
    <span class="w-filter-menu" v-if="mode == 'menu'">
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="u-menu-label"
                    ><i class="el-icon-medal-1"></i
                    >{{ current ? current : deftext }}</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="filter('')">{{
                    "全部"
                }}</el-dropdown-item>
                <el-dropdown-item
                    v-for="(item, key) in marks"
                    :key="key"
                    @click.native="filter(key)"
                    >{{ item }}</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </span>
    <div class="w-filter-mark" :class="{ on: visible }" v-else>
        <span class="u-label" @click="toggleFilter">
            <span class="u-current-filter">筛选 : {{ current || "全部" }}</span>
            <span class="u-toggle">
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-up"></i>
            </span>
        </span>
        <span class="u-options">
            <span
                class="u-mode u-all"
                :class="{ on: mark == '' }"
                @click="filter('')"
                ><i class="el-icon-s-operation"></i> 全部</span
            >
            <span
                class="u-mode"
                :class="{ on: mark == key }"
                v-for="(label, key) in marks"
                :key="key"
                @click="filter(key)"
                ><i class="el-icon-user"></i> {{ label }}</span
            >
            <slot></slot>
        </span>
    </div>
</template>

<script>
const marks = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
export default {
    name: "markBy",
    props: ["mode", "placeholder"],
    data: function() {
        return {
            visible: false,
            mark: "",
            marks,
        };
    },
    computed: {
        current: function() {
            return marks[this.mark];
        },
        deftext: function() {
            return this.placeholder || "难度";
        },
    },
    methods: {
        toggleFilter: function() {
            this.visible = !this.visible;
        },
        filter: function(key) {
            this.mark = key;
            this.$emit("filter", { type: "mark", val: key });
            this.visible = false;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
    @import '../../assets/css/mark-by.less';
</style>
