<template>
    <div class="c-header-panel c-header-vip" id="c-header-vip">
        <el-tooltip effect="dark" content="会员中心" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-post u-vip" href="/vip/premium">
                <img class="u-add" svg-inline src="../../assets/img/header/vip.svg" />
            </a>
        </el-tooltip>
    </div>
</template>

<style lang="less" scoped>
.c-header-vip {
    height: 100%;
    .u-vip {
        padding: 0 10px;
        height: 100%;
        .flex;
        align-items: center;
    }
}
</style>
