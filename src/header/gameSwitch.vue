<template>
    <div class="c-header-origin c-game-switch">
        <div class="u-current u-item on">
            <!-- <img class="u-img" :src="currentGame.img" alt=""> -->
            <span class="on">{{currentGame.name}}</span>
        </div>
    </div>
</template>

<script>
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "gameSwitch",
    data() {
        return {
            games: [
                {
                    name: "剑网3",
                    img: __imgPath + "image/xsj/jx3czb.png",
                    key: "jx3",
                    path: "https://www.jx3box.com"
                },
                {
                    name: "缘起",
                    img: __imgPath + "image/xsj/jx3yq.png",
                    key: "jx3origin",
                    path: "https://origin.jx3box.com"
                },
                {
                    name: '剑网1:归来',
                    img: __imgPath + "image/xsj/jx1gl.png",
                    key: "jx1",
                    path: "https://jx1.jx3box.com"
                },
                {
                    name: "指尖江湖",
                    img: __imgPath + "image/xsj/zjjh.png",
                    key: "zjjh",
                    path: "https://zjjh.jx3box.com"
                },
                {
                    name: "指尖对弈",
                    img: __imgPath + "image/xsj/zjdy.png",
                    key: "zjdy",
                    path: "https://zjdy.jx3box.com"
                },
                {
                    name: '剑侠世界3',
                    img: __imgPath + "image/xsj/jxsj3.png",
                    key: "jxsj3",
                    path: "https://jxsj3.jx3box.com"
                },
                {
                    name: "双生视界",
                    img: __imgPath + "image/xsj/sssj.png",
                    key: "sssj",
                    path: "https://sssj.jx3box.com"
                },
                {
                    name: "剑侠世界",
                    img: __imgPath + "image/xsj/jxsj.png",
                    key: "jxsj",
                    path: "https://jxsj.jx3box.com"
                }
            ],
            current: 'jx3'
        }
    },
    computed: {
        currentGame() {
            return this.games.find((item) => item.key == this.current);
        }
    }
}
</script>

<style lang="less">
.c-game-switch {
    .fl;
    margin: 20px 0;
    .mr(10px);
    .pr;
    .u-current {
        .flex;
        align-items: center;
        .pointer;
        .u-img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
    }
}
</style>
