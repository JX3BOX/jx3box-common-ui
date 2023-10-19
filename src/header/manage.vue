<template>
    <div class="c-header-panel c-header-manage" id="c-header-manage">
        <span class="u-post u-manage">
            <img class="u-add" svg-inline src="../../assets/img/header/manage.svg" />
        </span>
        <ul class="u-menu u-pop-content">
            <li v-for="item in userPanel" :key="item.label">
                <a :href="item.link" :target="item.target || '_self'" class="u-menu-item">
                    <img :src="resolveImg(item.icon)" svg-inline class="u-menu-icon" :alt="item.icon">
                    {{ item.label }}
                </a>
            </li>
            <hr v-if="userPanel.length" />
            <template v-if="isEditor">
                <li v-for="item in adminPanel" :key="item.label">
                    <a :href="item.link" :target="item.target || '_self'" class="u-menu-item">
                        <img :src="resolveImg(item.icon)" svg-inline class="u-menu-icon" :alt="item.icon">
                        {{ item.label }}
                    </a>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import panel from "../../assets/data/panel.json";
import { getMenu } from "../../service/header";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Manage",
    data() {
        return {
            panel,
        };
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
        isEditor() {
            return User.isEditor();
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
                } else {
                    getMenu("panel").then((res) => {
                        this.panel = res.data?.data?.val;
                        sessionStorage.setItem("panel", JSON.stringify(this.panel));
                    });
                }
            } catch (e) {
                this.panel = panel;
                console.log("loadPanel error", e);
            }
        },
        resolveImg: function (img) {
            // return __imgPath + "image/header/panel/" + img;
            return 'https://img.jx3box.com/image/box/pvp.svg'
        },
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

        svg {
            .size(19px);
        }

    }
    .u-menu {
        .u-menu-item {
            .flex;
            align-items: center;
            gap: 4px;
        }
        .u-menu-icon {
            width: 16px;
            height: 16px;
    }
    }
}
</style>
