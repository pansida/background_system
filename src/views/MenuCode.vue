<template>
  <div class="menu">
    <el-tag
        v-for="(item,index) in selectMenu"
        :key="item.path"
        :closable="item.name !== 'home'"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        size='small'
        @click="changeMenu(item)"
        @close="removeTag(item,index)"
        >
        {{ item.label }}
  </el-tag>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name:'MenuCode',
    computed:{
        ...mapState('menu',['selectMenu'])
    },
    methods:{
        ...mapMutations('menu',['CLOSETAG']),
        changeMenu(item){
            this.$router.push({ name: item.name })
        },
        removeTag(item,index){
            this.CLOSETAG(item)
            const length = this.selectMenu.length
            // 点击路由不是当前路由
            if(item.name !== this.$route.name){
                return
            }
            // 如果删除的最后一个是当前路由，则路由跳转为倒数第二个
            if(index === length){
                this.$router.push({
                    name:this.selectMenu[index-1].name
                })
            }
            else{
                this.$router.push({
                    name:this.selectMenu[index].name
                })
            }
        }
    }
}
</script>

<style lang='less' scoped>
.menu{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>