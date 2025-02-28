<template>
    <div class="c-right-affix" :class="{ 'is-close': !isOpen }">
        <div class="item">
            <fav :postId="postId" :postType="postType" :postTitle="postTitle" :hiddenNum="true" :isOld="true"></fav>
        </div>
        <el-tooltip v-if="showCommentBtn && showComment" effect="dark" content="去评论" placement="left">
            <div class="u-item" @click="toComment">
                <i class="el-icon-chat-dot-square"></i>
            </div>
        </el-tooltip>
        <el-tooltip effect="dark" content="回到顶部" placement="bottom">
            <div class="u-item" v-show="scrollBtnShow" @click="goTop">
                <div class="u-to-top"></div>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import Fav from "../interact/Fav2.vue";
import Bus from "../../service/bus";
export default {
    name: "RightAffix",
    props: ["postId", "postType", "postTitle", "showComment"],
    data() {
        return {
            scrollToptimer: null,
            scrollBtnShow: false,
            showCommentBtn: false, // 等待img等元素加载完毕再显示评论按钮

            isOpen: true,
        };
    },
    components: {
        Fav,
    },
    methods: {
        goTop() {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
        toComment() {
            this.$emit("toComment");
        },
    },
    mounted() {
        //获取页面可视区高度
        var clientHeight = document.documentElement.clientHeight;
        const self = this;
        window.addEventListener("scroll", function () {
            //显示回到顶部按钮
            var osTop = document.documentElement.scrollTop || document.body.scrollTop;
            if (osTop >= clientHeight) {
                self.scrollBtnShow = true;
            } else {
                self.scrollBtnShow = false;
            }
        });

        setTimeout(() => {
            this.showCommentBtn = true;
        }, 1000);

        Bus.$on("toggleRightSide", (data) => {
            this.isOpen = data;
        });
    },
};
</script>

<style lang="less">
.closeLeftSidebar() {
    transition: 0.2s ease-in-out;
    transform: translateX(100%);
}

.openLeftSidebar() {
    transition: 0.2s ease-in-out;
    transform: translateX(0);
}

.c-right-affix {
    .openLeftSidebar();
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: @aside-right;
    top: @header-height + @bread-height + 100px;
    background-color: #fafbfc;
    padding: 8px 5px;
    z-index: 200;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    .u-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        &:hover {
            background-color: #f6fcff;
        }
        .el-icon-chat-dot-square {
            font-size: 20px;
            font-weight: bold;
            color: #3871e0;
        }
        .w-fav2 svg {
            .size(26px);
        }
    }
    .u-to-top {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 16px solid #87ceeb;
    }

    &.is-close {
        .closeLeftSidebar();
        right: 42px;
    }
}
@media screen and (max-width: @smallpc) {
    .c-right-affix {
        right: 0;
    }
}
@media screen and (max-width: @phone) {
    .c-right-affix {
        .none;
    }
}
</style>
