<template>
    <div class="c-post-topic" v-show="topicInfo">
        <div class="c-post-topic__banner">
            <div class="c-topic-text">
                <div class="c-topic-text__year">{{ year }}</div>
                <div class="c-topic-text__text">{{ topicText }}</div>
            </div>
            <img class="c-topic-bg" src="../../assets/img/rightsidebar/topic_bg_bps.svg" alt="" />
        </div>
        <div class="c-post-topic__img">
            <img :src="topicImage" alt="" />
        </div>
    </div>
</template>

<script>
import { getSlider } from "../../service/cms";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import dayjs from "dayjs";
export default {
    name: "PostTopic",
    props: {
        type: {
            type: String,
            default: "bps",
        },
        id: {
            type: Number,
            default: 46917,
        },
        postBanner: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            topicInfo: null,
        };
    },
    computed: {
        topicText() {
            return this.topicInfo ? `${dayjs(this.topicInfo.created_at).format("MM月DD日")}荣登头条榜` : "";
        },
        year() {
            return this.topicInfo ? dayjs(this.topicInfo.created_at).format("YYYY年") : "";
        },
        topicImage() {
            const img = this.postBanner || this.topicInfo?.img;
            if (img?.indexOf(".gif") > -1 || img?.indexOf(".webp") > -1) {
                return img;
            }
            return getThumbnail(img, [260 * 2, 78 * 2]);
        },
        client() {
            return location.href.includes("origin") ? "origin" : "std";
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                if (!val) return;
                this.loadData();
            },
        },
    },
    methods: {
        loadData() {
            getSlider({
                source_type: this.type,
                source_id: this.id,
            }).then((res) => {
                this.topicInfo = res.data?.data
            });
        },
    },
};
</script>

<style lang="less" scoped>
.c-post-topic {
    margin-bottom: 10px;
}
.c-post-topic__banner {
    position: relative;
    // height: 100px;
    margin-bottom: 10px;
    .c-topic-text {
        font-size: 12px;
        font-weight: 700;
        position: absolute;
        bottom: 12px;
        right: 0;
        // left: 50%;
        // transform: translate(-50%, -50%);
        z-index: 1;
        color: #ffd28f;
        letter-spacing: 1px;
        white-space: nowrap;
        margin-right: 8px;
    }
    .c-topic-text__year {
        margin-bottom: 2px;
        text-align: right;
    }
    .c-topic-bg {
        width: 270px;
        // position: absolute;
        // top: 50%;
        // left: calc(50% + 5px);
        // transform: translate(-50%, -50%);
    }
}
.c-post-topic__img {
    .pr;
    overflow: hidden;
    .r(4px);
    min-height: 71px;
    img {
        .pa;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>
