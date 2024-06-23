<template>
    <div class="c-header-panel c-header-manage" id="c-header-manage">
        <span class="u-post u-manage">
            <!-- <i class="u-icon u-icon-msg"> -->
                <i class="u-pop" style="display: none" v-show="showPop"></i>
                <img class="u-add" svg-inline src="../../assets/img/header/manage.svg" />
            <!-- </i> -->
        </span>
        <ul class="u-menu u-pop-content">
            <li v-for="item in userPanel" :key="item.label">
                <a :href="item.link" :target="item.target || '_self'" class="u-menu-item" @click="onClick(item)">
                    <img :src="resolveImg(item.icon)" svg-inline class="u-menu-icon" :alt="item.icon" />
                    {{ item.label }}
                    <span v-if="showPop" class="u-new">New!</span>
                </a>
            </li>
            <hr v-if="userPanel.length" />
            <template v-if="isTeammate">
                <li v-for="item in adminPanel" :key="item.label">
                    <a :href="item.link" :target="item.target || '_self'" class="u-menu-item">
                        <img :src="resolveImg(item.icon)" svg-inline class="u-menu-icon" :alt="item.icon" />
                        {{ item.label }}
                    </a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import panel from "../../assets/data/panel.json";
import { getMenu } from "../../service/header";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Manage",
    data() {
        return {
            panel,

            showPop: false,
        };
    },
    props: {
        isTeammate: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        userPanel: function () {
            return this.panel.filter((item) => {
                return !item.onlyAdmin;
            });
        },
        adminPanel: function () {
            return this.panel.filter((item) => {
                return item.onlyAdmin;
            });
        },
    },
    mounted() {
        this.loadPanel();
    },
    methods: {
        loadPanel: function () {
            try {
                const panel = JSON.parse(sessionStorage.getItem("panel"));
                if (panel) {
                    this.panel = panel;
                    const item = this.panel?.find(i => i.meta);
                    this.initMeta(item)
                } else {
                    getMenu("panel").then((res) => {
                        this.panel = res.data?.data?.val;
                        const item = this.panel?.find(i => i.meta);
                        this.initMeta(item)
                        sessionStorage.setItem("panel", JSON.stringify(this.panel));
                    });
                }
            } catch (e) {
                this.panel = panel;
                console.log("loadPanel error", e);
            }
        },
        resolveImg: function (img) {
            return img ? __imgPath + "image/header/panel/" + img : __imgPath + "image/header/panel/default.svg";
        },
        initMeta(item) {
            const local = localStorage.getItem("jb_panel_meta");

            if (local) {
                this.showPop = item?.meta && item?.meta != local
            } else {
                localStorage.setItem("jb_panel_meta", item?.meta);
                this.showPop = true
            }
        },
        onClick(item) {
            if (item.meta) {
                localStorage.setItem("jb_panel_meta", item.meta);
                this.showPop = false
            }
        }
    },
};
</script>

<style lang="less">
// 管理菜单
.c-header-manage {
    height: 100%;

    .u-manage {
        padding: 0 10px 0 8px;
        height: 100%;
        .flex;
        align-items: center;
    }
    .u-menu {
        .u-menu-item {
            .flex;
            align-items: center;
            gap: 4px;

            &:hover {
                .u-menu-icon {
                    filter: invert(100%) sepia(0%) saturate(5658%) hue-rotate(215deg) brightness(114%) contrast(106%);
                }
                .u-new {
                    color: #fff;
                }
            }
        }
        .u-menu-icon {
            width: 16px;
            height: 16px;
        }
    }

    .u-icon-msg {
        .pr;
    }

    .u-pop {
        width: 10px;
        height: 10px;
        color: #fff;
        background-image: linear-gradient(#54a3ff, #006eed);
        background-clip: padding-box;
        border: 2px solid #24292e;
        border-radius: 50%;
        position: absolute;
        right: 4px;
        top: 18px;
        z-index: 1;
    }

    .u-new {
        color: #f00;
        font-size: 12px;
        margin-left: 4px;
        background-color: rgba(72, 193, 15, 0.1);
        color: rgba(72, 193, 15, 1);
        padding: 0px 6px;
    }
}
</style>
