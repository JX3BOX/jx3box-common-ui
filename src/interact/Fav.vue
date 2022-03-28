<template>
    <el-button class="w-fav" size="mini" type="primary" @click="doFav">
        <i :class="favorite ? 'el-icon-star-on' : 'el-icon-star-off'"></i>
        <span>{{ favorite ? "取消收藏" : "收藏" }}</span>
    </el-button>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { hasFav, addFav, delFav } from "../../service/fav";
export default {
    name: "Fav",
    props: ["postType", "postId", "postTitle"],
    data: function () {
        return {
            login: User.isLogin(),
            favorite: false,
        };
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
            });
        },
        addFav: function () {
            addFav(this.postType, this.postId, this.postTitle).then((res) => {
                this.favorite = res.id;
            });
        },
        delFav: function () {
            delFav(this.favorite).then(() => {
                this.favorite = false;
            });
        },
        fail: function (err) {
            if (err.response && err.response.data && err.response.data.code) {
                this.$message.error(`[${err.response.data.code}] ${err.response.data.msg}`);
            } else {
                this.$message.error(typeof err === "string" ? err : "网络请求异常");
            }
            console.log(err);
        },
    },
    watch: {
        postId: {
            immediate: true,
            handler() {
                if (this.login && this.postType && this.postId) this.hasFav();
            },
        },
    },
};
</script>

<style lang="less"></style>
