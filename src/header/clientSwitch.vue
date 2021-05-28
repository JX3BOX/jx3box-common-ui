<template>
    <div class="c-header-origin" @mouseenter="openClient" @mouseleave="closeClient">
        <div
            class="u-item"
            v-for="(item, i) in clients"
            :key="i"
            :href="item.link"
            v-show="!i || clientThink"
            @click="changeClient(item.client)"
        >
            <i class="el-icon-s-home"></i>
            {{ item.name }}
        </div>
    </div>
</template>

<script>
export default {
    name: "clientSwitch",
    props: ["defaultValue"],
    data: function () {
        return {
            clientThink: false,
            clients: [
                {
                    name: "正式服",
                    client: "std",
                },
                {
                    name: "怀旧服",
                    client: "origin",
                },
            ],
            client: this.defaultValue || "std",
        };
    },
    computed: {
        isIndex: function () {
            return (
                location.pathname.startsWith("/index") ||
                location.pathname.startsWith("/origin")
            );
        },
    },
    methods: {
        openClient: function () {
            this.clientThink = true;
        },
        closeClient: function () {
            this.clientThink = false;
        },
        init: function () {
            this.client = location.href.includes("origin") ? "origin" : "std";
            for (let i = 0; i < this.clients.length; i++) {
                if (this.clients[i].client == this.client) {
                    this.clients.unshift(...this.clients.splice(i, 1));
                    break;
                }
            }
        },
        changeClient: function (client) {
            this.clientThink = false;
            if (this.client != client) {
                if (this.isIndex) {
                    if (client == "origin") {
                        location.href = "/origin";
                    } else {
                        location.href = "/index";
                    }
                } else {
                    // 修改ui
                    this.client = client;
                    this.clients.unshift(...this.clients.splice(1, 1));

                    // 修改store
                    if (this.$store && this.$store.state) {
                        this.$store.state.client = client;
                    }

                    // 修改route
                    if (this.$route) {
                        this.$router.push({
                            query: {
                                client,
                            },
                        });
                    }
                }
            }
        },
    },
    mounted: function () {
        this.init();
    },
    components: {},
};
</script>

<style scoped lang="less">
.c-header-origin {
    .u-item {
        .pointer;
    }
}
</style>