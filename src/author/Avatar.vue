<template>
    <a class="c-avatar" :href="authorLink(uid)">
        <img :src="showAvatar(url)" class="c-avatar-pic" :class="{ isCircle }" />
        <i class="c-avatar-frame" v-if="frameName" :class="style">
            <img :src="frameUrl" />
        </i>
        <slot></slot>
    </a>
</template>

<script>
import default_frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getFrames } from "../../service/author";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "",
    props: ["uid", "url", "size", "frame"],
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
        frameName: function() {
            return this.frame && this.frames[this.frame] ? this.frame : "";
        },
        frameUrl: function() {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files[this.style].file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function() {
            return this.frameName && this.frames[this.frameName].style == "circle";
        },
        style: function() {
            let style = ~~this.size;
            for(let [i,v] of this.styles.entries()){
                if(style < v){
                    return this.styles[i]['cls']
                }
            }
            return "s";
        },
        data: function() {
            return [this.uid, this.url, this.size, this.frame];
        },
    },
    methods: {
        loadFrames: function() {

            // 无头像框
            if(!this.frame) return

            let frames = sessionStorage.getItem("avatarFrames");

            // 本地缓存
            if(frames){
                try {
                    frames = JSON.parse(frames);
                    this.frames = frames;
                } catch (e) {
                    this.frames = default_frames
                }

            // 线上数据
            }else{
                getFrames().then((res) => {
                    if (res.data) {
                        this.frames = res.data || {};
                        sessionStorage.setItem("avatarFrames", JSON.stringify(this.frames));
                    }
                });
            }
        },
        showAvatar: function(val) {
            return showAvatar(val, this.size);
        },
        authorLink,
    },
    mounted : function (){
        this.loadFrames()
    }
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
