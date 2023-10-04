<template>
    <div class="c-header-panel c-header-shop">
        <el-tooltip effect="dark" content="积分商城" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-present" href="/vip/mall" target="_blank">
                <i class="el-icon-present u-icon"></i>
            </a>
        </el-tooltip>
    </div>
</template>

<style lang="less">
.c-header-shop {
    .u-present {
        padding: 0 10px;
        height: 100%;
        .flex;
        align-items: center;
        &:hover {
            .tm(0.7);
        }
    }
    .u-icon {
        font-size: 15px;
        color: #fff;
    }
}
</style>
