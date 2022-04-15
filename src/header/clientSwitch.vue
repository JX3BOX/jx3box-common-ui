<template>
    <div class="c-header-origin">
        <i class="u-active" :class="{isOffset}"></i>
        <i class="u-div"></i>
        <span class="u-item" v-for="(item, i) in clients" :key="i" :class="[clientCls(item),isActive(item)]" @click="go(item)" @mouseenter="changeClient(item)" @mouseleave="resetClient">
            {{ item.name }}
        </span>
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
                    name: "重制",
                    client: "std",
                    from : 'origin.jx3box.com',
                    to : 'www.jx3box.com'
                },
                {
                    name: "缘起",
                    client: "origin",
                    to : 'origin.jx3box.com',
                    from : 'www.jx3box.com'
                },
            ],
            client: this.defaultValue,
            tempClient : this.defaultValue
        };
    },
    computed: {
        isOffset : function (){
            return this.tempClient == 'origin'
        }
    },
    methods: {
        isActive : function (item){
            return this.client == item.client ? 'on' : ''
        },
        clientCls : function (item){
            return 'u-' + item.client
        },
        changeClient : function (item){
            this.tempClient = item.client
        },
        resetClient : function (){
            this.tempClient = this.defaultValue
        },
        go : function (item){
            // if(location.pathname.startsWith('/index') || location.pathname.startsWith('/origin')){
            //     location.href = 'https://' + item.to
            // }else{
                location.href = location.href.replace(item.from,item.to)
            // }
        },
    },
    mounted: function () {
    },
    components: {},
};
</script>

<style scoped lang="less">
</style>
