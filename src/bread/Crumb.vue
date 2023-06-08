<template>
    <div class="c-crumb" v-html="html"></div>
</template>

<script>
import { getBreadcrumb } from "../../service/breadcrumb";

export default {
    name: "Crumb",
    props: ["name"],
    data: function() {
        return {
            html: "",
        };
    },
    mounted() {
        getBreadcrumb(this.name).then((res) => {
            res = res.data;
            this.html = res.data?.html || "";
        });
    },
};
</script>

<style lang="less">
@import "../../assets/css/crumb.less";
</style>
