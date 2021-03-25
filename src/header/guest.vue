<template>
    <div class="c-header-login">
        <a class="u-register u-default" :href="register_url"
            >注册</a
        >
        <em>|</em>
        <a class="u-login u-default" :href="login_url">登录</a>
    </div>
</template>

<script>
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name : '',
    props:[],
    data : function(){
        return {
            login_url: function() {
                return __Links.account.login + "?redirect=" + location.href;
            },
            register_url: function() {
                return __Links.account.register + "?redirect=" + location.href;
            },
        }
    },
    computed:{},
    methods:{},
    mounted:function(){},
    components : {}
}
</script>