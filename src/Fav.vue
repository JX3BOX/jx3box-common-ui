<template>
    <el-button class="w-fav" size="mini" type="primary" @click="doFav">
        <i v-if="!favorited" class="el-icon-star-off"></i>
        <i v-else class="el-icon-star-on"></i>
        <span v-if="!favorited">收藏</span>
        <span v-else>取消收藏</span>
    </el-button>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { hasFav, addFav, delFav } from "../service/fav";
export default {
    name: "Fav",
    props: ["postType", "postId"],
    data: function() {
        return {
            login: User.isLogin(),
            favorited: false,
        };
    },
    methods: {
        doFav: function() {
            if (this.login) {
                this.favorited ? this.delFav() : this.addFav();
            } else {
                User.toLogin();
            }
        },
        hasFav: function() {
            hasFav(this.postType, this.postId).then(
                (data) => {
                    data = data.data;
                    this.favorited = data.code === 200 && data.data.favorited > 0;
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        addFav: function() {
            addFav(this.postType, this.postId).then(
                (data) => {
                    if (data.data.code === 200) {
                        this.favorited = true;
                    } else this.fail(data.data.message);
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        delFav: function() {
            delFav(this.postType, this.postId).then(
                (data) => {
                    if (data.data.code === 200) {
                        this.favorited = false;
                    } else this.fail(data.data.message);
                },
                (err) => {
                    this.fail(err);
                }
            );
        },
        fail: function(err) {
            if (err.response && err.response.data && err.response.data.code) {
                this.$message.error(
                    `[${err.response.data.code}] ${err.response.data.msg}`
                );
            } else {
                this.$message.error(typeof err === 'string' ? err : "网络请求异常");
            }
            console.log(err);
        },
    },
    mounted: function() {
        if (this.login) this.hasFav();
    },
};
</script>

<style lang="less"></style>
