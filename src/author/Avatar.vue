<template>
    <a class="c-avatar" :href="authorLink(uid)">
        <img :src="showAvatar(avatar)" class="c-avatar-pic" :class="{ isCircle }" />
        <i class="c-avatar-frame" v-if="frameName" :class="style">
            <img :src="frameUrl" />
        </i>
        <slot></slot>
    </a>
</template>

<script>
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getFrames } from "../../service/author";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "",
    props: ["id", "url", "size", "frame"],
    components: {},
    data: function () {
        return {
            frames,
            style_map: [60, 84, 136, 224],
            style_cls: ["xs", "s", "m", "l"],
        };
    },
    computed: {
        uid: function () {
            return ~~this.id || 0;
        },
        avatar: function () {
            return this.url;
        },
        frameName: function () {
            return this.frame && this.frames[this.frame] ? this.frame : "";
        },
        frameUrl: function () {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files[this.style]
                    .file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function () {
            return (
                this.frameName && this.frames[this.frameName].style == "circle"
            );
        },
        style: function () {
            let style = ~~this.size;
            this.style_map.forEach((item, i) => {
                if (style < item) {
                    return this.style_cls[i];
                }
            });
            return "s";
        },
    },
    methods: {
        loadFrames: function () {
            getFrames().then((res) => {
                if (res.data) {
                    this.frames = res.data;
                }
            });
        },
        showAvatar: function (val) {
            return showAvatar(val, this.size);
        },
        authorLink,
    },
    created: function () {
        this.loadFrames();
    },
    mounted: function () {},
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
    .r(4px);
    &.isCircle {
        .r(100%);
    }
}
.c-avatar-frame {
    .pa;
    img {
        .db;
        .pa;
        .lt(0);
        .size(100%);
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