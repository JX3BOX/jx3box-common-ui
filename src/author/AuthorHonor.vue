<template>
    <div class="c-author-honor" :style="{ backgroundImage: `url(${imgUrl()})` }" v-if="honor">
        <span v-if="!isJdt" :style="{ color: honor.color }">{{ honorName }}</span>
    </div>
</template>
<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getUserHonors } from "../../service/author";
const HONOR_IMG_KEY = "honor_img";
export default {
    props: ["uid"],
    data: function () {
        return {
            honor: "",
        };
    },
    watch: {
        uid: {
            immediate: true,
            handler: function (val) {
                val && this.getHonor();
            },
        },
    },
    computed: {
        isJdt() {
            return this.honor?.val?.toLowerCase()?.includes('jdt')
        },
        honorName({ honor }) {
            return `${honor.year}${honor.prefix}${honor.suffix}`
        }
    },
    methods: {
        imgUrl: function () {
            let item = this.honor;
            if (!item) return;
            return __imgPath + `decoration/honor/${item.img}/${item.img}.${item.img_ext}`;
        },
        getHonor() {
            let user_id = this.uid;
            if (!user_id) return;
            let honor_local = sessionStorage.getItem(HONOR_IMG_KEY + user_id) || "";
            //解析本地缓存
            if (honor_local == "no") return;
            try {
                this.honor = JSON.parse(honor_local);
            } catch (err) {
                getUserHonors(user_id).then((data) => {
                    let res = data?.filter(item => item.using);
                    if (res.length == 0) {
                        //空 则为无主题，不再加载接口，界面设No
                        sessionStorage.setItem(HONOR_IMG_KEY + user_id, "no");
                        return;
                    }
                    let honor = res[0];
                    this.getHonorStyle(honor);
                });
            }
        },
        //有称号后，获取样式配置
        getHonorStyle(data) {
            data = data.honor;
            sessionStorage.setItem(HONOR_IMG_KEY + this.uid, JSON.stringify(data));
            this.honor = data;
        },
    },
};
</script>
<style lang="less">
.c-author-honor {
    .dbi;
    text-align: center;
    .mb(10px);
    .size(220px,45px);
    color: #ffffff;
    .fz(10px,45px);
    .r(2px);
    background-size: 100% 100%;
}
</style>
