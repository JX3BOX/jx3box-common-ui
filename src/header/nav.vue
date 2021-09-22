<template>
    <nav class="c-header-nav" v-if="nav">
        <div class="u-item-box" v-for="item in nav" :key="item.key">
            <template v-if="item.status && item.children && item.children.length">
                <el-dropdown
                    class="u-menu"
                    :show-timeout="0"
                    trigger="hover"
                >
                    <a
                        class="u-item el-dropdown-link"
                        :class="{ on: isFocus(item.link) }"
                        :href="item.link"
                        :target="item.target || '_self'"
                        >{{ item.label
                        }}<i class="el-icon-arrow-down el-icon--right"></i
                    ></a>
                    <el-dropdown-menu
                        slot="dropdown"
                        class="c-header-menu"
                    >
                        <el-dropdown-item
                            v-for="subitem in item.children"
                            :key="subitem.key"
                            class="u-menu-item"
                        >
                            <a :href="subitem.link" v-if="subitem.status"
                                >{{ subitem.label }}
                                <span v-if="subitem.desc">{{
                                    subitem.desc
                                }}</span></a
                            ></el-dropdown-item
                        >
                    </el-dropdown-menu>
                </el-dropdown>
            </template>
            <template v-else>
                <a
                    class="u-item"
                    :class="{ on: isFocus(item.link) }"
                    :href="item.link"
                    v-if="item.status"
                    >{{ item.label }}</a
                >
            </template>
        </div>
    </nav>
</template>

<script>
import std_nav from "@jx3box/jx3box-data/data/box/header_nav.json";
import origin_nav from "@jx3box/jx3box-data/data/box/header_nav_origin.json";
import { getNav } from "../../service/header";
const client = location.href.includes('origin') ? 'origin' : 'std'
export default {
    props: [],
    data: function() {
        return {
            nav : client == 'origin' ? origin_nav : std_nav
        };
    },
    computed: {
    },
    methods: {
        isFocus: function(type) {
            return location.pathname.includes(type);
        },
    },
    created: function() {
        getNav(this.client).then((res) => {
            if(res.data){
                this.nav = res.data
            }
        });
    },
    components: {},
};
</script>
