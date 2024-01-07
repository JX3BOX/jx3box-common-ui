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
const _clients = {
    std: "旗舰",
    origin: "缘起",
};
export default {
    name: "clientBy",
    props: ["type", "clients", "showWujie","showAll"],
    data: function () {
        return {
            client: this.type || "",
        };
    },
    computed: {
        computedClients: function () {
            let clients = this.clients || _clients;
            if (this.showWujie) {
                clients = Object.assign({}, clients, {
                    wujie: "无界",
                });
            }
            if (this.showAll) {
                clients = Object.assign({}, clients, {
                    all: "全端",
                });
            }
            console.log(clients)
            return clients;
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
