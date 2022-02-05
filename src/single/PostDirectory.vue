<template>
    <div class="m-single-directory"></div>
</template>

<script>
export default {
   name : 'PostDirectory',
   props:[],
   components : {},
   data : function(){
       return {
           
       }
   },
   computed:{},
   watch:{},
   methods:{},
   created:function(){},
   mounted:function(){},
}
</script>

<style lang="less">
.c-article-directory {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        margin: 0;
        padding: 0;
        cursor: pointer;
        font-weight: normal;
        white-space: nowrap;
        word-wrap: normal;
        word-break: keep-all;
        text-overflow: ellipsis;
        overflow: hidden;
        letter-spacing: 0.2px;
        line-height: 20px;
        padding: 8px 0;
        &:hover {
            // font-weight: 600;
            color: #0366d6;
        }
        font-size: 12px;
    }
    a {
        color: @color;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        &::before {
            content: "\e78b";

            font-family: element-icons !important;
            speak: none;
            font-style: normal;
            font-weight: 400;
            font-variant: normal;
            text-transform: none;
            line-height: 1;
            vertical-align: baseline;
            display: inline-block;
            -webkit-font-smoothing: antialiased;
            margin-right: 5px;
            font-size: 16px;
        }
    }

    // .hasChild {
    //     font-size: 14px;
    //     &::before {
    //         content: "\e784";
    //     }
    // }

    // h2,h3,h4,h5,h6{
    //     margin-left: 20px;
    // }
    // .hasChild{
    //     margin-left: 0;
    // }

    // h3 + h2,h4 + h3,h5 + h4,h6 + h5{
    //     margin-left: 0;
    // }

    .lv2 {
        padding-left: 20px;
    }

    .lv3 {
        padding-left: 40px;
    }

    .lv0 {
        display: none;
    }
}

.c-article-directory-title {
    margin-bottom: 5px;
    .c-article-directory-title-label {
        font-weight: 300;
        font-size: 20px;
        // cursor: pointer;
        // &:hover {
        //     color: #f39;
        // }
    }
    .c-article-directory-title-skip,
    .c-article-directory-title-folder {
        font-size: 14px;
        float: right;
        padding: 0 5px;
        line-height: 25px;
        color: darken(#dcdfe6, 5%);
        cursor: pointer;
        &:hover {
            color: darken(#dcdfe6, 20%);
        }
    }
}
.c-article-directory-content {
    padding: 10px 15px;
}

@keyframes focusFade {
    from {
        background-color: #c3fcff;
    }
    to {
        background-color: transparent;
    }
}

.c-article .isScrollFocus {
    animation: focusFade 0.5s ease-in-out;
}
</style>
