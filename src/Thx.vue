<template>
    <div class="w-thx">
        <Like :post-id="54" post-type="paper"></Like>
        <!-- 点赞
        投币(带回调redirect)[规则]
        评分 >=32[规则]
        分享《细则》
        

        投币/评分记录

        （原创声明）创作版权声明、转载要求 -->
    </div>
</template>

<script>
import Like from './interact/Like2.vue'
export default {
   name : 'Thx',
   props:[],
   inject: [],
   components : {
       Like
   },
   data : function(){
       return {
           
       }
   },
   computed:{},
   provide () {
       return {
             //父组件传递给子组件的全部
       }
   },
   watch:{},
   methods:{},
   filters:{},
   created:function(){},
   mounted:function(){},
}
</script>