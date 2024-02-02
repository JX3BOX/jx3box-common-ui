<template>
    <a class="c-author-honor" :style="{ backgroundImage: `url(${imgUrl()})` }" v-if="honor" :href="url" target="_blank">
        <span v-if="!isJdt" :style="{ color: honor.color }">{{ honor.honor }}</span>
    </a>
</template>
<script>
import { __imgPath, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { getUserHonor } from "../../service/author";
import { inRange } from "lodash";
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
            return this.honor?.honor_info?.img?.toLowerCase()?.includes("jdt");
        },
        url() {
            return this.honor?.honor_info?.url ? __Root + this.honor?.honor_info?.url : "";
        }
    },
    methods: {
        imgUrl: function () {
            let item = this.honor?.honor_info;
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
                getUserHonor(user_id).then((res) => {
                    this.honor = res.data.data;
                    if (!this.honor) {
                        //空 则为无主题，不再加载接口，界面设No
                        sessionStorage.setItem(HONOR_IMG_KEY + user_id, "no");
                        return;
                    }
                    this.getHonorStyle(this.honor);
                });
            }
        },
        //有称号后，获取样式配置
        getHonorStyle(honor) {
            const data = honor
            let honorConfig = honor?.honor_info;
            let only = honorConfig.only;
            let prefix = honorConfig.prefix;
            let regPrefix = honorConfig.prefix.match(/\{([^{}]+?)\}/g);
            let ranking = honorConfig.ranking;
            let honorStr = honorConfig.year || "";

            if (!only) {
                if (regPrefix) {
                    honorStr = honorStr + (data[regPrefix[0].slice(1, -1)] || "");
                } else {
                    honorStr = honorStr + prefix;
                }
            } else {
                honorStr = prefix;
            }
            if (ranking?.length > 0) {
                data.imgIndex = 0;
                for (let i = 0; i < ranking.length; i++) {
                    if (
                        honor.ranking !== undefined &&
                        inRange(Number(honor.ranking), ranking[i][0], ranking[i][1])
                    ) {
                        data.imgIndex = i;
                        let str = ranking[i][2];
                        let regStr = str.match(/\{([^{}]+?)\}/g);
                        if (regStr) {
                            honorStr =
                                honorStr +
                                str.replace(/\{([^{}]+?)\}/g, function (match, p1) {
                                    return data[p1] || "";
                                });
                        } else {
                            honorStr = honorStr + str;
                        }
                        break;
                    }
                }
            }
            data.honor = honorStr + honorConfig.suffix;
            data.color = honorConfig.color;
            data.img = honorConfig.img;
            data.img_ext = honorConfig.img_ext;
            data.isHave = true;
            data.isImgIndex = ranking?.length > 0;
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
