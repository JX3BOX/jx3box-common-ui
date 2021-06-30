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
import std_nav from "../../assets/data/nav.json";
import origin_nav from "../../assets/data/nav_origin.json";
import { getNav } from "../../service/header";
export default {
    props: ['client'],
    data: function() {
        return {
            nav : this.client == 'origin' ? origin_nav : std_nav,
        };
    },
    computed: {
    },
    methods: {
        isFocus: function(type) {
            return location.pathname.includes(type);
        },
        getClientLink : function (val){
            let client = 'std'
            if(this.$store && this.$store.state && this.$store.state.client){
                client = this.$store.state.client
            }else if(this.$route && this.$route.query && this.$route.query.client){
                client = this.$route.query.client
            }else{
                client = this.client
            }
            if(val.includes('client')){
                return val
            }
            return val + '?client=' + client
        }
    },
    created: function() {
        getNav(this.client).then((res) => {
            this.nav = res.data && res.data;
        });
    },
    components: {},
};
</script>
