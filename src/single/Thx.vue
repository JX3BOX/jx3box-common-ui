<template>
    <div class="w-thx">
        <div class="w-thx-panel">
            <boxcoin-admin :postId="postId" :postType="postType" v-if="hasRight && adminBoxcoinEnable && boxcoin_enable" :userId="userId" :own="admin_left" :points="admin_points" :authors="authors" @updateRecord="updateRecord" />
            <Like :postId="postId" :postType="postType"></Like>
            <fav :postId="postId" :postType="postType"></fav>
            <boxcoin-user :postId="postId" :postType="postType" :boxcoin="boxcoin" :userId="userId" :own="user_left" :points="user_points" :authors="authors" v-if="userBoxcoinEnable && boxcoin_enable" @updateRecord="updateRecord" />
            <Share :postId="postId" :postType="postType" />
        </div>
        <div class="w-thx-records">
            <boxcoin-records :postId="postId" :postType="postType" :cacheRecord="cacheRecord" :mode="mode"/>
        </div>
        <div class="w-thx-copyright">
            &copy; 所有原创作品，著作权归作者所有，所有未经授权的非署名转载或抄袭将有权追究法律责任，所有法律事务由专聘律师代理。<br>
            签约作者独家特约稿件，及所有魔盒官方评分作品用户一经兑现则视为有偿付费稿件，所有商业稿件的转载引用需同时征得魔盒平台授权。
        </div>
    </div>
</template>

<script>
import Like from "../interact/Like2.vue";
import Share from "../interact/Share2.vue";
import Fav from "../interact/Fav2.vue";
import BoxcoinRecords from '../interact/boxcoin_records.vue';
import BoxcoinAdmin from '../interact/boxcoin_admin.vue';
import BoxcoinUser from '../interact/boxcoin_user.vue';
import User from '@jx3box/jx3box-common/js/user'
import {getPostBoxcoinConfig,getBoxcoinStatus} from '../../service/thx'
export default {
    name: "Thx",
    props: ["postId", "postType","userId","adminBoxcoinEnable","userBoxcoinEnable",'mode', 'authors'],
    components: {
        Like,
        Share,
        Fav,
        'boxcoin-records':BoxcoinRecords,
        'boxcoin-admin':BoxcoinAdmin,
        'boxcoin-user':BoxcoinUser,
    },
    data: function () {
        return {
            boxcoin : 0,
            hasRight : User.getInfo().group >= 32,
            user: User.getInfo(),

            admin_left : 0,
            admin_points : [100],
            user_left : 0,
            user_points : [100],

            cacheRecord: null,
            boxcoin_enable : 0
        };
    },
    computed: {
        post_keys : function (){
            return [this.postId,this.postType]
        }
    },
    watch: {
        post_keys : {
            immediate : true,
            deep:true,
            handler : function (){
                this.postType && this.postId && this.loadBoxcoinConfig()
            }
        }
    },
    methods: {
        loadBoxcoinConfig : function (){
            User.isLogin() && getPostBoxcoinConfig(this.postType).then((res) => {
                this.admin_points = res.data.data.limit.admin_points || [10, 1000];
                this.admin_left = res.data.data.asManagerBoxCoinRemain || 0;
                this.user_points = res.data.data.limit.user_points || [10, 1000];
                this.user_left = res.data.data.asUserBoxCoinRemain || 0;
            });
            getBoxcoinStatus().then((res) => {
                this.boxcoin_enable = !!~~res.data.data.val
            })
        },
        // 用户打赏
        updateRecord: function (data){
            this.cacheRecord = data
        },
    },
    created: function () {},
};
</script>

<style lang="less">
@import "../../assets/css/thx.less";
</style>