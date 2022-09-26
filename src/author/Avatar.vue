<template>
    <a class="c-avatar" :href="authorLink(uid)">
        <img :src="showAvatar(url)" class="c-avatar-pic"/>
        <i class="c-avatar-frame" v-if="frame">
            <img :src="frameUrl" />
        </i>
        <slot></slot>
    </a>
</template>

<script>
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Avatar",
    props: {
        uid: {
            type: Number,
            default: 0,
        },
        url: {
            type: String,
            default: "",
        },
        frame: {
            type: Boolean,
            default: false,
        },
        size : {
            type : Number,
            default : 88
        }
    },
    components: {},
    data: function() {
        return {
            frames: [],
            styles : [
                {cls:'xs',size:60},
                {cls:'s',size:84},
                {cls:'m',size:136},
                {cls:'l',size:224},
            ]
        };
    },
    computed: {
        frameUrl: function() {
            return __imgPath + `avatar/images/${this.frame}/${this.frame}.svg`;
        },
    },
    methods: {
        showAvatar: function(val) {
            return showAvatar(val, this.size*3);
        },
        authorLink,
    },
};
</script>

<style scoped lang="less">
.c-avatar {
    .pr;
    .dbi;
}
.c-avatar-pic {
    .db;
    .full;
    .r(100%);
}
.c-avatar-frame {
    .pa;
    .lt(-10px);
    .size(100%);
    padding: 10px;
    box-sizing: content-box;
    img {
        .db;
        .pa;
        .size(100%);
        .lt(0);
    }

    &.xs {
        left: -6px;
        top: -6px;
        width: 60px;
        height: 60px;
    }

    &.s {
        left: -8px;
        top: -8px;
        width: 84px;
        height: 84px;
    }
    &.m {
        left: -8px;
        top: -8px;
        width: 136px;
        height: 136px;
    }
    &.l {
        width: 224px;
        height: 224px;
        left: -22px;
        top: -22px;
    }
}
</style>
