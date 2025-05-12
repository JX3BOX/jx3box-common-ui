<template>
    <div class="c-header-search" id="c-header-search">
        <div class="c-search">
            <form class="u-form" @submit.prevent="handleSubmit">
                <input class="u-text" type="text" autocomplete="off" name="q" placeholder="搜索.." ref="searchInput" />
                <input type="hidden" name="client" :value="client" />
                <i class="u-btn" @click="handleSubmit">
                    <img svg-inline src="../../assets/img/header/search-key-slash.svg" />
                </i>
            </form>
        </div>
    </div>
</template>

<script>
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "search",
    data: function () {
        return {
            isPhone: window.innerWidth < 720 ? true : false,
            url: __Root + "search",
            client: location.href.includes("origin") ? "origin" : "std",
        };
    },
    computed: {},
    methods: {
        handleSubmit(e) {
            // 获取输入框的值
            const searchValue = this.$refs.searchInput.value;
            if (!searchValue) return;

            // 检查输入是否为纯数字
            if (/^\d+$/.test(searchValue)) {
                // 如果是纯数字，直接跳转到 /{id}
                const target = this.isPhone ? "_self" : "_blank";
                const url = __Root + `post/${searchValue}`;
                if (target === "_blank") {
                    window.open(url, "_blank");
                } else {
                    window.location.href = url;
                }
            } else {
                // 如果不是纯数字，使用原有搜索功能
                const form = document.createElement("form");
                form.method = "GET";
                form.action = this.url;
                form.target = this.isPhone ? "_self" : "_blank";

                const searchInput = document.createElement("input");
                searchInput.type = "hidden";
                searchInput.name = "q";
                searchInput.value = searchValue;

                const clientInput = document.createElement("input");
                clientInput.type = "hidden";
                clientInput.name = "client";
                clientInput.value = this.client;

                form.appendChild(searchInput);
                form.appendChild(clientInput);
                document.body.appendChild(form);
                form.submit();
                document.body.removeChild(form);
            }
        },
    },
    created: function () {},
    components: {},
};
</script>

<style lang="less">
//搜索
.c-header-search {
    width: 220px;
    // padding: 16px 0;
    margin: (@header-height - @logo-size - 2px)/2 0;

    .u-form {
        position: relative;
    }

    .u-text {
        background-color: #3a4248;
        border: 2px solid @bg-black;
        // background-color:#636872;
        // border: 0;
        box-shadow: none;
        color: #fff;
        height: @logo-size + 2px;
        line-height: @logo-size + 2px;
        box-sizing: border-box;
        border-radius: 4px;
        font-size: 14px;
        padding: 0.625em 0.4375em;
        width: 100%;

        &:focus {
            background-color: #fff;
            color: #1a1a1a;
            outline: 0;
        }
        transition: background-color 0.1s ease-in;
    }

    .u-btn {
        border: 0;
        position: absolute;
        right: 8px;
        top: 6px;
        display: block;
        width: 19px;
        height: 20px;
        padding: 0;
    }

    margin-right: 10px;
}
@media screen and (max-width: @phone) {
    .c-header-search {
        .none;
    }
}
</style>
