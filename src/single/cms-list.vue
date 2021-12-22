<template>
    <div class="m-archive-box">
        <!-- 搜索靠前 -->
        <slot name="search-before"></slot>
        <!-- 筛选 -->
        <div class="m-archive-filter" v-if="$slots.filter">
            <slot name="filter"></slot>
        </div>
        <!-- 搜索靠后 -->
        <slot name="search-after"></slot>
        <!-- 列表 -->
        <slot></slot>
        <!-- 空 -->
        <el-alert v-if="!list.length" class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
        <!-- 下一页 -->
        <el-button class="m-archive-more" :class="{ show: hasNextPage }" type="primary" @click="appendPage">加载更多</el-button>
        <!-- 分页 -->
        <el-pagination
            class="m-archive-pages"
            background
            layout="total, prev, pager, next,jumper"
            :hide-on-single-page="true"
            :page-size="perPage"
            :total="totalRecords"
            :current-page.sync="currentPage"
            @current-change="changePage"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    name: "cms-list",
    props: ["data", "total", "per", "pages", "page"],
    data: function() {
        return {
            currentPage: this.page || 1,
        };
    },
    computed: {
        list: function() {
            return this.data;
        },
        totalRecords: function() {
            return this.total;
        },
        totalPages: function() {
            return this.pages;
        },
        perPage: function() {
            return this.per;
        },
        hasNextPage: function() {
            return this.totalRecords > 1 && this.currentPage < this.totalPages;
        },
    },
    methods: {
        appendPage: function() {
            this.$emit("appendPage", ++this.currentPage);
        },
        changePage: function(i) {
            this.$emit("changePage", i);
            this.$route.query.page = i;
        },
    },
    watch: {
        page: function(page) {
            this.currentPage = page;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
@import "../../assets/css/cms-list.less";
</style>
