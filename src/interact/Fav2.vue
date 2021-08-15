<template>
    <div class="w-fav2" :class="{ disabled:favorited }" @click="doFav">
        <el-tooltip effect="dark" :content="favContent" placement="top-start">
            <div>
                <img class="u-icon" svg-inline src="../../assets/img/widget/star.svg" />
                <span class="u-count" v-if="total">{{ total }}</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { hasFav, addFav, delFav } from "../../service/fav";
export default {
    name: "Fav2",
    props: ["postType", "postId"],
    data: function () {
        return {
            login: User.isLogin(),
            favorited: false,
            total: 0,
        };
    },
    computed: {
        favContent() {
            return this.favorited ? "取消收藏" : "收藏";
        },
    },
    methods: {
        doFav: function () {
            if (this.login) {
                this.favorited ? this.delFav() : this.addFav();
            } else {
                User.toLogin();
            }
        },
        hasFav: function () {
            hasFav(this.postType, this.postId).then(
                (data) => {
                    data = data.data;
                    this.favorited =
                        data.code === 200 && data.data.favorited > 0;
                    this.total = data.data?.total || 0;
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        addFav: function () {
            addFav(this.postType, this.postId).then(
                (data) => {
                    if (data.data.code === 200) {
                        this.favorited = true;
                        this.total++;
                    } else {
                        this.fail(data.data.message);
                    }
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        delFav: function () {
            delFav(this.postType, this.postId).then(
                (data) => {
                    if (data.data.code === 200) {
                        this.favorited = false;
                        this.total--;
                    } else {
                        this.fail(data.data.message);
                    }
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        fail: function (err) {
            if (err.response && err.response.data && err.response.data.code) {
                this.$message.error(
                    `[${err.response.data.code}] ${err.response.data.msg}`
                );
            } else {
                this.$message.error(
                    typeof err === "string" ? err : "网络请求异常"
                );
            }
            console.log(err);
        },
    },
    watch: {
        postId: {
            immediate: true,
            handler() {
                if (this.postType && this.postId) this.hasFav();
            },
        },
    },
};
</script>

<style lang="less" scoped>
.w-fav2 {
    .pointer;
    .dbi;
    .u-icon {
        .size(32px);
        .y;
        .pr;
        top: -1px;
    }
    .u-count {
        color: #888;
        .ml(10px);
    }

    &.disabled {
        svg * {
            fill: #aaa;
        }
    }
}
</style>
