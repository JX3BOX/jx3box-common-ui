<template>
    <span class="c-game-price">
        <span v-if="price < 0">-</span>
        <span v-if="formartPrice(price, 'zhuan')">
            {{ formartPrice(price, "zhuan") }}
            <img src="../../assets/img/price/zhuan.png" alt="砖" />
        </span>
        <span v-if="formartPrice(price, 'jin')">
            {{ formartPrice(price, "jin") }}
            <img src="../../assets/img/price/jin.png" alt="金" />
        </span>
        <span v-if="formartPrice(price, 'yin')">
            {{ formartPrice(price, "yin") }}
            <img src="../../assets/img/price/yin.png" alt="银" />
        </span>
        <span v-if="formartPrice(price, 'tong')">
            {{ formartPrice(price, "tong") }}
            <img src="../../assets/img/price/tong.png" alt="铜" />
        </span>
    </span>
</template>

<script>
export default {
    name: "GamePrice",
    props: ["price"],
    methods: {
        formartPrice(price = 0, unit) {
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
}
</style>
