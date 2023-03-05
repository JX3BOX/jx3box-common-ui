<template>
    <div class="c-author-honor" :style="{ backgroundImage: `url(${imgUrl()})` }" v-if="honor">
        <span :style="{ color: honor.color }">{{ honor.honor }}</span>
    </div>
</template>
<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getDecoration, getHonorJson } from "../../service/cms";
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
    methods: {
        imgUrl: function () {
            let item = this.honor;
            if (!item) return;
            if (item.isImgIndex) {
                return __imgPath + `decoration/honor/${item.val}/${item.val}_${item.imgIndex}.${item.ext}`;
            }
            return __imgPath + `decoration/honor/${item.val}/${item.val}.${item.ext}`;
        },
        getHonor() {
            let user_id = this.uid;
            if (!user_id) return;
            let honor_local = sessionStorage.getItem(HONOR_IMG_KEY + user_id);
            if (honor_local) {
                //解析本地缓存
                let honor_parse = JSON.parse(honor_local);
                if (!honor_parse == "no") return;
                this.honor = honor_parse;
                return;
            }
            getDecoration({ using: 1, user_id: user_id, type: "honor" }).then((data) => {
                let res = data.data.data;
                if (res.length == 0) {
                    //空 则为无主题，不再加载接口，界面设No
                    sessionStorage.setItem(HONOR_IMG_KEY + user_id, "no");
                    return;
                }
                let honor = res[0];
                this.getHonorStyle(honor);
            });
        },
        //有称号后，获取样式配置
        getHonorStyle(data) {
            getHonorJson().then((res) => {
                let honorList = res.data;
                let honorConfig = honorList[data.val];
                let prefix = honorConfig.prefix;
                let regPrefix = honorConfig.prefix.match(/\{([^{}]+?)\}/g);
                let ranking = honorConfig.ranking;
                let honorStr = honorConfig.year || "";
                if (regPrefix) {
                    honorStr = honorStr + (data[regPrefix[0].slice(1, -1)] || "");
                } else {
                    honorStr = honorStr + prefix;
                }
                if (ranking.length > 0) {
                    data.imgIndex = 0;
                    for (let i = 0; i < ranking.length; i++) {
                        if (data.ranking !== undefined && inRange(Number(data.ranking), ranking[i][0], ranking[i][1])) {
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
                data.ext = honorConfig.ext;
                data.isHave = true;
                data.isImgIndex = ranking.length > 0;
                sessionStorage.setItem(HONOR_IMG_KEY + this.uid, JSON.stringify(data));
                this.honor = data;
            });
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
