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
        filter: function (val) {
            this.client = val;
            this.$emit("filter", { type: "client", val: val });
            this.$forceUpdate();
        },
    },
    mounted : function (){
        if(this.$store && this.$store.state && this.$store.state.client){
            this.client = this.$store.state.client
            this.filter(this.client)
        }
    },
    watch : {
        '$store.state.client' : function (val){
            this.client = val
            this.filter(val)
        }
    }
};
</script>

<style lang="less">
@import "../../assets/css/client-by.less";
</style>
