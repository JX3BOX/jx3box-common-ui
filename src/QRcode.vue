<template>
    <div class="w-qrcode" @click="togglePic" :class="{on:active}">
        <img class="u-icon" svg-inline src="../assets/img/widget/qr-code.svg" />
        <span class="u-text">二维码</span>
        <qrcode-vue class="u-pic" :value="value" :size="size" level="H"></qrcode-vue>
    </div>
</template>

<script>
import QrcodeVue from 'qrcode.vue'
export default {
    name: "QRcode",
    props: [],
    data: function() {
        return {
            value: location.href,
            size: 100,
            active : false
        };
    },
    computed: {},
    methods: {
        togglePic : function (e){
            e.stopPropagation()
            this.active = !this.active
        }
    },
    mounted: function() {
        const vm = this;
        document.addEventListener("click", function() {
            vm.active = false;
        });
    },
    components: {
        QrcodeVue,
    },
};
</script>

<style lang="less">
@import "../assets/css/qrcode.less";
</style>
