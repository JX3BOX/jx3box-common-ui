<template>
    <div
        class="c-side-toggle"
        @click.stop="toggleLeftSide"
        :class="{ mobileOnly: isMobileOnly, on: isOpen }"
    >
        <img class="u-toggle" svg-inline src="../assets/img/bread/menu.svg" />
    </div>
</template>

<script>
import Bus from "../service/bus";
export default {
    name : "LeftSideToggle",
    props: ["mobileOnly"],
    data: function() {
        return {
            isOpen: true,
        };
    },
    computed: {
        isMobileOnly: function() {
            return this.mobileOnly;
        },
    },
    methods: {
        toggleLeftSide: function() {
            let status = !this.isOpen;
            Bus.$emit("toggleLeftSide", status);
        },
    },
    mounted: function() {
        Bus.$on("toggleLeftSide", (data) => {
            this.isOpen = data;
        });

        if (window.innerWidth < 1024) {
            this.isOpen = false;
        }
    },
    components: {},
};
</script>

<style lang="less">
.c-side-toggle {
    .pointer;
    .size(20px,28px);
    padding:0 5px;
    .u-toggle {
        .h(29px);
        fill: @color;
    }
    &.mobileOnly {
        .none;
    }
    &.on {
        svg {
            fill: @primary;
        }
    }
}
@media screen and (max-width: @ipad) {
    .c-side-toggle {
        .db !important;
    }
}
</style>
