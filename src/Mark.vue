<template>
    <span class="w-mark">
        <i class="w-mark-key" :style="{'background-color':BGL}"
            ><img
                svg-inline
                src="../assets/img/header/logo.svg"
            />{{mark_key}}</i
        >
        <span class="w-mark-value" :style="{'background-color':BGR}">{{mark_value}}</span>
    </span>
</template>

<script>
export default {
    name: "Mark",
    props:["label","value","BGL","BGR"],
    data: function() {
        return {
            mark_key : this.label || 'JX3BOX',
            mark_value: this.value || 'COM',
        };
    },
};
</script>

<style scoped lang="less">
.w-mark{
    .pa;;.r(3px);.clip;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.4);

    .w-mark-key,.w-mark-value{
        padding: 2px 5px;
        .fz(12px, 20px);
        .h(20px);
        .fl;.db;
        color: #fff;
    }

    .w-mark-key {
        svg {
            .size(20px);
            .fl;
            .mr(5px);
            fill: #fff;
        }
        font-style: normal;
        font-weight: normal;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        background-color: @bg-black;
    }

    .w-mark-value {
        background-color: @primary;
    }

}
</style>
