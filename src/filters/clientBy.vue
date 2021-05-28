<template>
    <div class="w-filter-client">
        <ul>
            <li
                class="u-client"
                :class="{ on: client == value }"
                v-for="(label, value) in clients"
                :key="value"
                @click="filter(value)"
            >{{ label }}</li>
        </ul>
    </div>
</template>

<script>
const clients = {
    all: "全部版本",
    std: "正式服",
    origin: "怀旧服",
};
export default {
    name: "clientBy",
    props: ["type"],
    data: function () {
        return {
            client: this.type || "all",
            clients,
        };
    },
    computed: {},
    methods: {
        filter: function (key) {
            this.client = key;
            this.$emit("filter", { type: "client", val: key });
        },
    },
    mounted: function () {
        let query = new URLSearchParams(location.search);
        let client =
            (this.$route && this.$route.query.client) || query.get("client");
        if (client) {
            this.client = client;
        } else {
            this.client = this.type || "all";
        }
    },
    watch: {
        "$store.state.client": {
            immediate: true,
            handler: function (val) {
                this.client = val;
            },
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/client-by.less";
</style>
