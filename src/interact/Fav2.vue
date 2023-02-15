<template>
    <div class="w-fav2" :class="{ disabled: favorite }" @click="doFav">
        <el-tooltip effect="dark" :content="favContent" placement="top-start">
            <div>
                <img class="u-icon" svg-inline src="../../assets/img/widget/star.svg" />
                <span class="u-count" v-if="!hiddenNum && total">{{ total }}</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { hasFav, addFav, delFav } from "../../service/fav";
export default {
    name: "Fav2",
    props: ["postType", "postId", "postTitle", "hiddenNum"],
    data: function () {
        return {
            login: User.isLogin(),
            favorite: false,
            total: 0,
        };
    },
    computed: {
        favContent() {
            return this.favorite ? "取消收藏" : "收藏";
        },
    },
    methods: {
        doFav: function () {
            if (this.login) {
                this.favorite ? this.delFav() : this.addFav();
            } else {
                User.toLogin();
            }
        },
        hasFav: function () {
            hasFav(this.postType, this.postId).then((res) => {
                this.favorite = res.id || false;
                this.total = res.totalFavorites || 0;
            });
        },
        addFav: function () {
            addFav(this.postType, this.postId, this.postTitle).then((res) => {
                this.favorite = res.id;
                this.total++;
            });
        },
        delFav: function () {
            delFav(this.favorite).then(() => {
                this.favorite = false;
                this.total && this.total--;
            });
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
}
</style>
