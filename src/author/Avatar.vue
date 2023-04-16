<template>
    <a class="c-avatar" :href="authorLink(uid)" :class="size" :style="style">
        <img :src="showAvatar(url)" class="c-avatar-pic" />
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
            type: [Number, String],
            default: 0,
        },
        url: {
            type: String,
            default: "",
        },
        frame: {
            type: String,
            default: "",
        },
        size: {
            type: [Number, String],
            default: "m",
        },
    },
    components: {},
    data: function () {
        return {
            frames: [],
            styles: {
                xxs: 36,
                xs: 48,
                s: 68,
                m: 88,
                l: 120,
                xl: 150,
            },
        };
    },
    computed: {
        isNumberSize:function (){
            return !isNaN(Number(this.size))
        },
        frameUrl: function () {
            return __imgPath + `avatar/images/${this.frame}/${this.frame}.svg`;
        },
        style:function (){
            if(this.isNumberSize){
                return {
                    width:this.size+'px',
                    height:this.size+'px'
                }
            }
            return {}
        }
    },
    methods: {
        showAvatar: function (val) {
            return showAvatar(val, this.isNumberSize ? this.size*3 : this.styles[this.size] * 3);
        },
        authorLink,
    },
};
</script>

<style lang="less">
.c-avatar {
    .pr;
    .dbi;
    background-color: #ffffff;
    .r(100%);
    &.xl {
        @pic: 150px;
        @frame: 210px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }
    &.l {
        @pic: 120px;
        @frame: 168px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }

    &.m {
        @pic: 88px;
        @frame: 123px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }

    &.s {
        @pic: 68px;
        @frame: 88px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }
    &.xs {
        @pic: 48px;
        @frame: 68px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }
    &.xxs {
        @pic: 36px;
        @frame: 48px;
        .c-avatar-pic {
            .size(@pic);
        }
        .c-avatar-frame {
            .size(@frame);
            .lt(@pic / 2);
            margin-left: -@frame / 2;
            margin-top: -@frame / 2;
        }
    }
}
.c-avatar-pic {
    .db;
    .full;
    .r(100%);
    object-fit: cover;
}
.c-avatar-frame {
    .pa;
    box-sizing: content-box;
    img {
        .db;
        .pa;
        .size(100%);
        .lt(0);
    }
}
</style>
