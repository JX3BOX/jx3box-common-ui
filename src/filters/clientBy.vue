<template>
    <div class="w-filter-client">
        <ul>
            <li class="u-client" :class="{on: client == ''}" @click="filter('')">
                全部
            </li>
            <li
                class="u-client"
                :class="{ on: client == value }"
                v-for="(label, value) in computedClients"
                :key="value"
                @click="filter(value)"
            >{{ label }}</li>
        </ul>
    </div>
</template>

<script>
const clients = {
    all: "全部版本",
    std: "重制",
    origin: "缘起",
};
export default {
    name: "clientBy",
    props: ["type", "clients"],
    data: function () {
        return {
            client: this.type || "",
        };
    },
    computed: {
        computedClients: function () {
            return this.clients || clients;
        },
    },
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
