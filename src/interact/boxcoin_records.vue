<template>
    <div class="w-boxcoin-records" v-loading="loading">
        <div class="w-boxcoin-records-list" v-if="list && list.length">
            <ul class="u-list">
                <li class="u-item u-head">
                    <span class="u-meta u-action">
                        <i class="el-icon-trophy"></i>
                    </span>
                    <span class="u-meta u-user">参与打赏</span>
                    <span class="u-meta u-count">盒币</span>
                    <span class="u-meta u-remark">寄语</span>
                    <time class="u-meta u-time"></time>
                </li>
                <li v-for="(item,i) in list" :key="i" class="u-item u-body">
                    <span class="u-meta u-action">
                        <template v-if="item.is_user_gift">
                            <i title="打赏"><img class svg-inline src="../../assets/img/widget/gift.svg"/></i>
                        </template>
                        <template v-else>
                            <i title="品鉴"><img class svg-inline src="../../assets/img/widget/admin_gift.svg"/></i>
                        </template>
                    </span>
                    <a
                        class="u-meta u-user"
                        :href="item.operate_user_id | authorLink"
                        target="_blank"
                    >
                        <img class="u-user-avatar" :src="item.ext_operate_user_info.avatar | showAvatar" alt />
                        <span>{{item.ext_operate_user_info.display_name}}</span>
                    </a>
                    <span class="u-meta u-count">
                        +
                        <b>{{item.count}}</b>
                    </span>
                    <span class="u-meta u-remark">{{item.remark}}</span>
                    <time class="u-meta u-time">{{item.created_at | showTime}}</time>
                    <span class="u-delete" v-if="isSuperAdmin && !item.is_user_gift" @click="recovery(item,i)">
                        <i class="el-icon-delete"></i>撤销
                    </span>
                </li>
            </ul>
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
import { getPostBoxcoinRecords, recoveryBoxcoin } from "../../service/thx";
import User from "@jx3box/jx3box-common/js/user";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "BoxcoinRecords",
    props: ["postType", "postId"],
    components: {},
    data: function () {
        return {
            list: [],
            per: 12,
            page: 1,
            total: 1,
            loading: false,
            boxcoin: 0,
            isSuperAdmin: User.isSuperAdmin(),
        };
    },
    computed: {
        params: function () {
            return {
                pageSize: this.per,
                pageIndex: this.page,
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
            getPostBoxcoinRecords(this.postType, this.postId, this.params).then(
                (res) => {
                    this.list = res.data.data.list;
                    this.total = res.data.data.page.total;
                    this.boxcoin =
                        res.data.data.fromManager + res.data.data.fromUser;
                    this.$parent.boxcoin = this.boxcoin;
                }
            );
        },
        recovery: function (item,i) {
            this.$alert("是否确定撤销该评分？", "确认", {
                confirmButtonText: "确定",
                callback: (action) => {
                    if (action == "confirm") {
                        recoveryBoxcoin(item.id).then((res) => {
                            this.$message({
                                message: "撤销成功",
                                type: "success",
                            });
                            this.list.splice(i,1)
                        })
                        
                    }
                },
            });
        },
    },
    filters: {
        authorLink,
        showTime,
        showAvatar: function (val) {
            return showAvatar(val, 24);
        },
    },
    created: function () {},
    mounted: function () {
        this.init();
    },
};
</script>