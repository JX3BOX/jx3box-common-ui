<template>
    <div class="c-header-panel c-header-manage" id="c-header-manage">
        <span class="u-post u-manage">
            <img class="u-add" svg-inline src="../../assets/img/header/manage.svg" />
        </span>
        <ul class="u-menu u-pop-content">
            <li v-for="item in finalPanel" :key="item.label">
                <a :href="item.link" target="_blank"
                    ><i :class="item.icon || 'el-icon-present'"></i> {{ item.label }}</a
                >
            </li>
            <hr v-if="finalPanel.length" />
            <li v-if="isEditor">
                <a href="https://os.jx3box.com/admin" target="_blank"><i class="el-icon-receiving"></i> 管理平台</a>
            </li>
            <li v-if="isAdmin">
                <a href="/admin"><i class="el-icon-setting"></i> 站点配置</a>
            </li>
            <li v-if="isTeamMember">
                <a href="/dashboard/feedback?tab=pending"><i class="el-icon-message"></i> 反馈处理</a>
            </li>
        </ul>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import panel from "../../assets/data/panel.json";
import { getMenu } from "../../service/header";
import { checkTeamMember } from "../../service/cms";
export default {
    name: "Manage",
    data() {
        return {
            panel,

            isTeamMember: false
        }
    },
    computed: {
        finalPanel: function () {
            // 只返回前两个
            return this.panel
                .filter((item) => {
                    // 只返回有权限的
                    if (item.onlyAdmin) {
                        return this.isAdmin;
                    }
                    return true;
                })
                .slice(0, 2);
        },
        isAdmin() {
            return User.isAdmin()
        },
        isEditor() {
            return User.isEditor()
        },
    },
    mounted() {
        this.loadPanel();
        this.check()
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
        check: function() {
            try {
                const isTeamMember = JSON.parse(localStorage.getItem("BoxTeam3"));

                if (isTeamMember) {
                    this.isTeamMember = isTeamMember === "true"
                } else {
                    checkTeamMember().then(res => {
                        this.isTeamMember = res.data.data
                        localStorage.setItem("BoxTeam3", this.isTeamMember)
                    })
                }
            } catch (e) {
                console.log("check error", e);
            }
        }
    }
}
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
}
</style>
