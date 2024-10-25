<template>
    <div class="w-thx">
        <template v-if="type === 'batchReward'">
            <!-- 批量打赏 -->
            <batch-reward
                v-if="hasRight && adminBoxcoinEnable && boxcoin_enable"
                :postType="postType"
                :items="postId"
                :boxcoin="boxcoin"
                :userId="userId"
                :own="admin_left"
                :points="admin_points"
                :authors="authors"
                :client="finalClient"
                :max="admin_max"
                :min="admin_min"
                :total="admin_total"
                :category="category"
                @updateRecord="updateRecord"
            />
        </template>
        <template v-else>
            <div class="w-thx-panel">
                <boxcoin-admin
                    v-if="hasRight && adminBoxcoinEnable && boxcoin_enable"
                    :postId="postId"
                    :postType="postType"
                    :userId="userId"
                    :max="admin_max"
                    :min="admin_min"
                    :own="admin_left"
                    :total="admin_total"
                    :points="admin_points"
                    :authors="authors"
                    :client="finalClient"
                    :category="category"
                    @updateRecord="updateRecord"
                />
                <Like :postId="postId" :postType="postType"></Like>
                <fav :postId="postId" :postType="postType" :postTitle="postTitle"></fav>
                <boxcoin-user
                    v-if="userBoxcoinEnable && boxcoin_enable && allowGift"
                    :postId="postId"
                    :postType="postType"
                    :boxcoin="boxcoin"
                    :userId="userId"
                    :own="user_left"
                    :points="user_points"
                    :authors="authors"
                    :client="finalClient"
                    :category="category"
                    @updateRecord="updateRecord"
                />
                <Share :postId="postId" :postType="postType" :client="client" />
                <watch-later :category="postType" :title="postTitle"></watch-later>
            </div>
            <div class="w-thx-records">
                <boxcoin-records
                    :postId="postId"
                    :postType="postType"
                    :postClient="finalClient"
                    :cacheRecord="cacheRecord"
                    :mode="mode"
                />
            </div>
            <div class="w-thx-copyright">
                &copy;
                所有原创作品，著作权归作者所有，所有未经授权的非署名转载或抄袭将有权追究法律责任，所有法律事务由专聘律师代理。<br />
                签约作者独家特约稿件，及所有魔盒官方评分作品用户一经兑现则视为有偿付费稿件，所有商业稿件的转载引用需同时征得魔盒平台授权。
            </div>
        </template>
    </div>
</template>

<script>
import Like from "../interact/Like2.vue";
import Share from "../interact/Share2.vue";
import Fav from "../interact/Fav2.vue";
import BatchReward from "../interact/batchReward.vue";
import BoxcoinRecords from "../interact/boxcoin_records.vue";
import BoxcoinAdmin from "../interact/boxcoin_admin.vue";
import BoxcoinUser from "../interact/boxcoin_user.vue";
import WatchLater from "../interact/watchLater.vue";

import User from "@jx3box/jx3box-common/js/user";
import { getPostBoxcoinConfig, getBoxcoinStatus } from "../../service/thx";
export default {
    name: "Thx",
    props: {
        type: {
            type: String,
            default: "normal",
        },
        postId: {
            type: [Number, Array, String],
            default: 0,
        },
        postType: {
            type: String,
            default: "",
        },
        postTitle: {
            type: String,
            default: "",
        },
        userId: {
            type: [Number, String],
            default: 0,
        },
        authors: {
            type: Array,
            default: () => [],
        },
        mode: {
            type: String,
            default: "normal",
        },
        client: {
            type: String,
            default: "std",
        },
        allowGift: {
            type: Number,
            default: 1,
        },
        adminBoxcoinEnable: {
            type: Boolean,
            default: false,
        },
        userBoxcoinEnable: {
            type: Boolean,
            default: false,
        },
        category: {
            default: undefined,
        },
    },
    components: {
        Like,
        Share,
        Fav,
        "batch-reward": BatchReward,
        "boxcoin-records": BoxcoinRecords,
        "boxcoin-admin": BoxcoinAdmin,
        "boxcoin-user": BoxcoinUser,
        WatchLater,
    },
    data: function () {
        return {
            boxcoin: 0,
            hasRight: User.getInfo().group >= 32,
            user: User.getInfo(),

            admin_max: 0,
            admin_min: 0,
            admin_left: 0,
            admin_total: 0,
            admin_points: [100],

            user_left: 0,
            user_points: [100],

            cacheRecord: null,
            boxcoin_enable: 0,
        };
    },
    computed: {
        post_keys: function () {
            return [this.postId, this.postType];
        },
        finalClient: function() {
            if (this.client == 'wujie') {
                return "std"
            }
            return this.client
        }
    },
    watch: {
        post_keys: {
            immediate: true,
            deep: true,
            handler: function () {
                this.postType && this.postId && this.loadBoxcoinConfig();
            },
        },
    },
    methods: {
        loadBoxcoinConfig: function () {
            User.isLogin() &&
                getPostBoxcoinConfig(this.postType).then((res) => {
                    this.admin_max = res.data.data.limit.admin_max || 0;
                    this.admin_min = res.data.data.limit.admin_min || 0;
                    this.admin_points = res.data.data.limit.admin_points || [10, 1000];
                    this.admin_left = res.data.data.asManagerBoxCoinRemain || 0;
                    this.admin_total = res.data.data.asManagerBoxCoinTotal || 0;

                    this.user_points = res.data.data.limit.user_points || [10, 1000];
                    // 根据多端展示剩余币
                    // 作品是n端，接受n端币+all币
                    if (this.finalClient == "origin") {
                        this.user_left = res.data.data.asUserBoxCoinRemainOrigin + res.data.data.asUserBoxCoinRemainAll;
                    } else if (this.finalClient == "std") {
                        this.user_left = res.data.data.asUserBoxCoinRemainStd + res.data.data.asUserBoxCoinRemainAll;
                    } else {
                        this.user_left =
                            res.data.data.asUserBoxCoinRemainAll +
                            res.data.data.asUserBoxCoinRemainStd +
                            res.data.data.asUserBoxCoinRemainOrigin;
                    }
                });
            getBoxcoinStatus().then((res) => {
                this.boxcoin_enable = !!~~res.data?.data?.val;
            });
        },
        // 用户打赏
        updateRecord: function (data) {
            this.cacheRecord = data;
        },
    },
    created: function () {},
};
</script>

<style lang="less">
@import "../../assets/css/thx.less";
</style>
