<template>
    <div class="w-boxcoin-records" v-loading="loading">
        <div class="w-boxcoin-records-list">

        </div>
        <el-pagination
            class="w-boxcoin-records-pages"
            small
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :page-size="per"
            :total="total"
            :current-page.sync="page"
        ></el-pagination>
    </div>
</template>

<script>
import { getPostBoxcoinRecords } from "../../service/thx";
export default {
    name: "BoxcoinRecords",
    props: ["postType", "postId"],
    components: {},
    data: function () {
        return {
            list: [],
            per: 10,
            page: 1,
            total: 1,
            loading: false,
            boxcoin : 0
        };
    },
    computed: {
        params: function () {
            return {
                pageSize: this.per,
                index: this.page,
            };
        },
    },
    watch: {
        params: {
            deep: true,
            handler: function () {
                this.loadData();
            },
        },
    },
    methods: {
        init: function () {
            this.loadData();
        },
        loadData: function () {
            getPostBoxcoinRecords(this.postType,this.postId,this.params).then((res) => {
                this.list = res.data.data.list;
                this.total = res.data.data.page.total;
                this.boxcoin = res.data.data.fromManager + res.data.data.fromUser
                this.$parent.boxcoin = this.boxcoin
            });
        },
    },
    filters: {},
    created: function () {},
    mounted: function () {
        this.init();
    },
};
</script>