<template>
    <div class="c-post-topic" v-show="topicInfo">
        <div class="c-post-topic__banner">
            <span class="c-topic-text">{{ topicText }}</span>
            <img class="c-topic-bg" src="../../assets/img/rightsidebar/topic_bg.svg" alt="">
        </div>
        <div class="c-post-topic__img">
            <img :src="topicImage" alt="">
        </div>
    </div>
</template>

<script>
import { getSliders } from "../../service/cms";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import dayjs from "dayjs";
export default {
    name: "PostTopic",
    props: {
        type: {
            type: String,
            default: "face",
        },
        id: {
            type: Number,
            default: 1546, // TODO: 临时写死，后期改为动态获取
        },
    },
    data() {
        return {
            topicInfo: null
        }
    },
    computed: {
        topicText() {
            return this.topicInfo ? `${dayjs(this.topicInfo.created_at).format('YYYY年MM月DD日')}荣登头条榜` : ''
        },
        topicImage() {
            return this.topicInfo ? getThumbnail(this.topicInfo.img, [260*2, 78*2]) : ''
        },
    },
    watch: {
        id: {
            immediate: true,
            handler(val) {
                if (!val) return;
                this.loadData();
            }
        }
    },
    methods: {
        loadData() {
            getSliders(this.type, this.id).then((res) => {
                if (res.data.data?.list) {
                    // 取创建时间最新的一条
                    const list = res.data.data.list.sort((a, b) => dayjs(b.created_at).isAfter(dayjs(a.created_at)) ? 1 : -1);
                    this.topicInfo = list[0];
                }
            });
        },
    }
}
</script>

<style lang="less" scoped>
.c-post-topic {
    }
.c-post-topic__banner {
    position: relative;
    height: 100px;
    margin-top: 10px;
    .c-topic-text {
        font-size: 12px;
        font-weight: 600;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1;
        color: #fff;
        letter-spacing: 1px;
        white-space: nowrap;
    }
    .c-topic-bg {
        width: 300px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
.c-post-topic__img {
    display: flex;
    justify-content: center;
    img{
        .r(3px);
        .size(260px,78px);
    }
}
</style>
