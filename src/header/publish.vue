<template>
    <div class="c-header-panel" id="c-header-panel">
        <el-tooltip effect="dark" content="创作中心" placement="bottom" popper-class="c-header-tooltip">
            <a class="u-post" :href="url">
                <img class="u-add" svg-inline src="../../assets/img/header/edit.svg" />
            </a>
        </el-tooltip>
    </div>
</template>

<script>
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "publish",
    data: function () {
        return {
            url: __Links.dashboard.publish,
        };
    },
};
</script>
