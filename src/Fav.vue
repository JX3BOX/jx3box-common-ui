<template>
    <el-button class="w-fav" size="mini" type="primary" @click="doFav">
        <i v-if="!status" class="el-icon-star-off"></i>
        <i v-else class="el-icon-star-on"></i>
        <span v-if="!status">收藏</span>
        <span v-else>取消收藏</span>
    </el-button>
</template>

<script>
import axios from "axios";
import User from "@jx3box/jx3box-common/js/user";
import { __Links, __server } from "@jx3box/jx3box-common/js/jx3box.json";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Fav",
    data: function() {
        return {
            login: User.isLogin(),
            pid: getRewrite("pid"),
            favs : []
        };
    },
    computed : {
        status: function (){
            return this.favs.includes(this.pid)
        }
    },
    methods: {
        doFav: function() {
            if(this.login){
                this.status ? this.delFav() : this.addFav()
            }else{
                User.toLogin()
            }
        },
        getUserFav: function() {
            axios
            .get(__server + "user/meta", {
                withCredentials: true,
                params: {
                    key: "favs",
                },
            })
            .then((res) => {
                let favs = res.data.data.value
                this.favs = favs && favs.split(',') || []
            })
            .catch((err) => {
                this.fail(err)
            });
        },
        addFav : function (){
            axios
            .post(__server + "post/fav",{pid : this.pid,action : 1}, {
                withCredentials: true,
            })
            .then((res) => {
                this.favs.push(this.pid)
            })
            .catch((err) => {
                this.fail(err)
            });
        },
        delFav : function (){
            axios
            .post(__server + "post/fav",{pid : this.pid,action : 0}, {
                withCredentials: true,
            })
            .then((res) => {
                this.favs.splice(this.favs.indexOf(this.pid),1)
            })
            .catch((err) => {
                this.fail(err)
            });
        },
        fail : function (err){
            if (
                err.response &&
                err.response.data &&
                err.response.data.code
            ) {
                this.$message.error(
                    `[${err.response.data.code}] ${err.response.data.msg}`
                );
            } else {
                this.$message.error("网络请求异常");
            }
            console.log(err)
        }
    },
    mounted: function() {
        if(this.login) this.getUserFav()
    },
};
</script>

<style lang="less">
</style>
