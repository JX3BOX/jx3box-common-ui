<template>
    <section class="m-contributor">
        <div class="m-author">
            <el-radio
                v-for="(item, i) in authors"
                v-model="value"
                :label="String(item.user_id)"
                :key="i"
                @change="handleAuthorChange"
            >
                <img
                    class="u-pic"
                    :src="showAvatar(item.user_avatar)"
                    :alt="item.display_name"
                />
                <span class="u-txt" :title="item.display_name">
                    {{ item.display_name }}
                </span>
            </el-radio>
        </div>
    </section>
</template>

<script>
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Contributors",
    props: {
        authors: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            value: "",
        };
    },
    watch: {
        authors: {
            deep: true,
            immediate: true,
            handler(val) {
                if (val && val.length) this.value = String(val[0]?.user_id)
            }
        },
        value: {
            immediate: true,
            handler(val) {
                val && this.$emit('chosen', this.value)
            }
        }
    },
    methods: {
        handleAuthorChange() {},
        showAvatar,
    },
};
</script>

<style lang="less">
.m-contributor {
    padding: 10px 10px 0 10px;
    .m-author {
        .u-pic {
            .db;
            .size(48px);
            background-color: @bg-black;
            .r(4px);
            transition: 0.1s ease-in;
            .tm(0.4);
            box-sizing: border-box;

            &:hover {
                .tm(1);
            }
        }
        .u-txt {
            .db;
            .x;
            .fz(14px, 2);
            white-space: nowrap;
            overflow: hidden;
            .w(48px);
        }

        .el-radio {
            .ml(0);
            .mr(15px);
        }
        .el-radio__input {
            .none;
        }
        .el-radio__label {
            .db;
            padding-left: 0;
        }

        .is-checked {
            .u-pic {
                border: 3px solid @primary;
                .tm(1);
            }
            .u-txt {
                .bold;
            }
        }
    }
}
</style>