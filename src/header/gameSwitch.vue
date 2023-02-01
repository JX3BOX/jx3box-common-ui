<template>
    <div class="c-game-switch">
        <div class="u-current on" @click.stop="onShow">
            <span>{{ currentGame.name }}</span>
        </div>

        <div class="c-game-list" v-show="showMore">
            <span
                class="u-game-item"
                v-for="item in games"
                :key="item.key"
                :class="{ active: current === item.key, disabled: item.disabled }"
                @click.stop="handleClick(item)"
            >
                <img class="u-img" :src="item.img" alt="" />
                <span>{{ item.name }}</span>
            </span>
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
                    path: "www.jx3box.com",
                    disabled: false,
                },
                {
                    name: "剑网3缘起",
                    img: __imgPath + "image/xsj/jx3yq.png",
                    key: "jx3origin",
                    path: "origin.jx3box.com",
                    disabled: false,
                },
                {
                    name: "指尖江湖",
                    img: __imgPath + "image/xsj/zjjh.png",
                    key: "zjjh",
                    path: "https://zjjh.jx3box.com",
                    disabled: true,
                },
                {
                    name: "指尖对弈",
                    img: __imgPath + "image/xsj/zjdy.png",
                    key: "zjdy",
                    path: "https://zjdy.jx3box.com",
                    disabled: true,
                },
                {
                    name: "剑侠世界3",
                    img: __imgPath + "image/xsj/jxsj3.png",
                    key: "jxsj3",
                    path: "https://jxsj3.jx3box.com",
                    disabled: true,
                },
                {
                    name: "剑侠世界",
                    img: __imgPath + "image/xsj/jxsj.png",
                    key: "jxsj",
                    path: "https://jxsj.jx3box.com",
                    disabled: true,
                },
                {
                    name: "剑网1:归来",
                    img: __imgPath + "image/xsj/jx1gl.png",
                    key: "jx1",
                    path: "https://jx1.jx3box.com",
                    disabled: true,
                },
                {
                    name: "双生视界",
                    img: __imgPath + "image/xsj/sssj.png",
                    key: "sssj",
                    path: "https://sssj.jx3box.com",
                    disabled: true,
                },
            ],
            current: "jx3",

            showMore: false,
        };
    },
    computed: {
        currentGame() {
            return this.games.find((item) => item.key == this.current);
        },
    },
    mounted() {
        const _host = window.location.host;
        const _game = this.games.find((item) => item.path.indexOf(_host) > -1);
        if (_game) {
            this.current = _game.key;
        }
        this.close();
    },
    methods: {
        handleClick(item) {
            if (item.disabled) {
                return;
            }
            if (['jx3', 'jx3origin'].includes(this.current) && ['jx3', 'jx3origin'].includes(item.key)) {
                const _current = this.games.find((game) => game.key == this.current);
                const _next = this.games.find((game) => game.key == item.key);

                location.href = location.href.replace(
                    _current.path,
                    _next.path
                );
            } else {
                location.href = item.path;
            }
            this.current = item.key;
        },
        // itemHref(item) {
        //     if (item.disabled) {
        //         return "javascript:;";
        //     }
        //     return item.path;
        // },
        onShow() {
            this.showMore = !this.showMore;
        },
        close() {
            document.addEventListener("click", () => {
                this.showMore = false;
            });
        },
    },
};
</script>

<style lang="less">
.arrow(t,@width,@color,@x:50%) {
    &:before {
        bottom: 100%;
        left: @x;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-style: solid;
        border-color: transparent;
        border-bottom-color: @color;
        border-width: unit(@width, px);
        @margin: -@width;
        margin-left: unit(@margin, px);
    }
}
.c-game-switch {
    .fl;
    margin: 15px 0;
    .mr(10px);
    .pr;
    .u-current {
        .flex;
        align-items: center;
        .pointer;
        .dbi;
        .y(top);
        font-size: 14px;
        color: #fff;
        padding: 5px 10px;
        background-color: #7d7d7d;
        border: 2px solid #303133;
        border-radius: 4px;
        .pr;
        .z(1);
        .u-img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }

        &.on {
            background-color: @primary;
            .pointer;
        }

        transition: 0.05s ease-in;
        &:hover{
            background-color: lighten(@primary,2%);
            color:#eee;
        }
    }
}
@media screen and (max-width: @phone) {
    .c-game-switch {
        margin-left: 15px;
    }
}
.c-game-list {
    .arrow(t,5px,@bg-black,12%);
    position: absolute;
    top: calc(100% + 14px);
    left: -10px;
    width: 300px;
    background-color: #24292e;
    padding: 10px;
    border: 1px solid rgba(27, 31, 35, 0.15);
    border-radius: 4px;
    box-shadow: 0 3px 12px rgba(27, 31, 35, 0.15);
    margin-top: 6px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // gap:10px;
    grid-row-gap: 8px;
    grid-column-gap: 10px;
    .u-game-item {
        .flex;
        align-items: center;
        padding: 6px;
        .pointer;
        border-radius: 4px;
        color: #fff;
        font-size: 14px;
        .u-img {
            width: 24px;
            height: 24px;
            margin-right: 5px;
            border-radius: 4px;
        }
        &.active {
            background-color: @primary;
            color: #fff;
        }
        &:not(.disabled) {
            &:hover {
                background-color: @primary;
                color: #fff;
            }
        }
        &.disabled {
            filter: grayscale(100%);
            color: #c0c4cc;
            cursor: not-allowed;
        }
    }
}
</style>
