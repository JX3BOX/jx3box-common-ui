<template>
    <div
        class="c-header-origin"
        @mouseenter="openClient"
        @mouseleave="closeClient"
    >
        <a
            class="u-item"
            v-for="(item, i) in clients"
            :key="i"
            :href="item.link"
            :target="i ? '_blank' : '_self'"
            v-show="!i || clientThink"
            ><i class="el-icon-s-home"></i> {{ item.name }}</a
        >
    </div>
</template>

<script>
export default {
    name: "clientSwitch",
    props: ["client"],
    data: function() {
        return {
            clientThink: false,
            clients: [
                {
                    link: "https://www.jx3box.com",
                    name: "正式服",
                    client: "std",
                },
                {
                    link: "https://origin.jx3box.com",
                    name: "怀旧服",
                    client: "origin",
                },
            ],
        };
    },
    computed: {},
    methods: {
        openClient: function() {
            this.clientThink = true;
        },
        closeClient: function() {
            this.clientThink = false;
        },
    },
    mounted: function() {
        if (this.client) {
            for (let i = 0; i < this.clients.length; i++) {
                if (this.clients[i].client == this.client) {
                    this.clients.unshift(...this.clients.splice(i, 1));
                    break;
                }
            }
        }
    },
    components: {},
};
</script>
