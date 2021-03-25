<template>
    <div
        class="c-header-logo"
        id="c-header-logo"
        @click="toggleBox($event)"
        title="点击展开魔盒矩阵"
    >
        <i class="u-pic"
            ><img svg-inline src="../../assets/img/header/logo.svg"
        /></i>
        <span class="u-txt">魔盒</span>
    </div>
</template>

<script>
import Bus from "../../service/bus";
export default {
    name : 'c-header-logo',
    props:[],
    data : function(){
        return {
            
        }
    },
    computed:{},
    methods:{
        // 盒子
        toggleBox: function(e) {
            e.stopPropagation();
            Bus.$emit("toggleBox");
        },
    },
    mounted:function(){},
    components : {
    }
}
</script>