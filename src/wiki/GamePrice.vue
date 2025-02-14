<template>
    <span class="c-game-price" :class="{ 'is-align': align }">
        <span class="u-neg" v-if="price < 0">- </span>
        <span class="u-zhuan" v-if="formatPrice(price, 'zhuan') || align">
            <span class="u-value">{{ formatPrice(price, "zhuan") }}</span>
            <img src="../../assets/img/price/zhuan.png" alt="砖" />
        </span>
        <span class="u-jin" v-if="formatPrice(price, 'jin') || align">
            <span class="u-value">{{ formatPrice(price, "jin") }}</span>
            <img src="../../assets/img/price/jin.png" alt="金" />
        </span>
        <span class="u-yin" v-if="formatPrice(price, 'yin') || align">
            <span class="u-value">{{ formatPrice(price, "yin") }}</span>
            <img src="../../assets/img/price/yin.png" alt="银" />
        </span>
        <span class="u-tong" v-if="formatPrice(price, 'tong') || align">
            <span class="u-value">{{ formatPrice(price, "tong") }}</span>
            <img src="../../assets/img/price/tong.png" alt="铜" />
        </span>
    </span>
</template>

<script>
export default {
    name: "GamePrice",
    props: ["price", "align", "align-price"],
    methods: {
        formatPrice(price = 0, unit) {
            if (price < 0) price = -price;
            let result = {
                zhuan: Math.floor(price * 0.01 * 0.01 * 0.0001) || 0,
                jin: Math.floor((price * 0.01 * 0.01) % 10000) || 0,
                yin: Math.floor((price * 0.01) % 100) || 0,
                tong: Math.floor(price % 100) || 0,
            };
            return result[unit];
        },
    },
};
</script>

<style lang="less">
.c-game-price {
    img {
        .y;
    }

    &.is-align {
        .u-jin {
            .u-value {
                display: inline-flex;
                width: 4ch;
                justify-content: flex-end;
                overflow: hidden;
            }
            .u-value::before {
                content: "0000";
                color: #eee;
            }
        }
        .u-yin,
        .u-tong {
            .u-value {
                display: inline-flex;
                width: 2ch;
                justify-content: flex-end;
                overflow: hidden;
            }
            .u-value::before {
                content: "00";
                color: #eee;
            }
        }
    }
}
</style>
