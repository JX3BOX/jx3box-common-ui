<template>
    <div class="c-header-panel c-lang-switcher" id="c-header-lang-switcher">
        <span class="u-translator" href="/dashboard/boxcoin">
            <img class="u-icon" src="../../assets/img/header/translator.svg" alt="" />
        </span>
        <ul class="u-menu u-pop-content">
            <li
                v-for="item in langs"
                :key="item.key"
                @click="onLangChange(item)"
                :class="{ 'is-active': item.key === currentLang, 'is-disabled': item.disabled }"
            >
                <a>{{ item.name }}</a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "langSwitch",
    data() {
        return {
            langs: [
                {
                    name: "简体中文",
                    key: "zh-cn",
                    disabled: false,
                },
                {
                    name: "繁体中文",
                    key: "zh-tw",
                    disabled: true,
                },
                {
                    name: "Tiếng Việt",
                    key: "vi",
                    disabled: true,
                },
                {
                    name: "English",
                    key: "en-us",
                    disabled: true,
                },
            ], // 语言列表 简体中文、繁体中文、英文、越南语
            currentLang: "zh-cn", // 当前语言
        };
    },
    mounted() {
        const lang = localStorage.getItem("lang") || "zh-cn";
        this.currentLang = lang;
    },
    methods: {
        onLangChange({disabled, key}) {
            if (disabled) return;
            localStorage.setItem("lang", key);
            location.reload();
        },
    },
};
</script>

<style lang="less">
.c-lang-switcher {
    .u-translator {
        padding: 0 10px;
        width: 14;
        height: 100%;
        .flex;
        align-items: center;
        .pointer;
        &:hover {
            .tm(0.7);
        }
    }
    .u-icon {
        .size(19px);
    }
    li {
        &.is-active {
            a {
                color: @primary;
                font-weight: 600;
            }
        }
        &.is-disabled {
            a {
                color: #999;
                cursor: not-allowed;
            }
            &:hover a {
                // .tm(0);
                background-color: #fff;
                color: #999;
            }
        }
    }
}
@media screen and (max-width: @phone) {
    .c-lang-switcher {
        display: none;
    }
}
</style>
