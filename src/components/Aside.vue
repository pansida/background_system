<template>
   <el-menu
   :collapse="isCollapse"
      default-active="1-4-1"
      class="el-menu-vertical-demo menu_list"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <h3 class="aside_title">{{!isCollapse?"后台管理系统":"后台"}}</h3>
      <el-menu-item :index="single.name" v-for="single in singles" :key='single.name' @click="creareRou(single)">
        <i :class="`el-icon-${single.icon}`"></i>
        <span slot="title">{{single.label}}</span>
      </el-menu-item>
      <el-submenu :index="more.label" v-for="more in mores" :key="more.label">
        <template slot="title">
          <i :class="`el-icon-${more.icon}`"></i>
          <span>{{more.label}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="morez.name" v-for="morez in more.children" :key='morez.name'  @click="creareRou(morez)">{{morez.label}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    name:'Aside',
    data() {
        return {}
    },
    computed:{
      // 引入全局开关
      isCollapse() {
      return this.$store.state.menu.collapse
        },
        singles(){
            return this.presons.filter((item)=>{return !item.children})
        },
        mores(){
            return this.presons.filter((item)=>{return item.children})
        },
        presons(){
          return JSON.parse(Cookie.get('menu')) || this.$store.state.menu.menu
        }
    },
    methods:{
      creareRou(list){
        if(this.$route.path !== list.path && !(this.$route.path === '/home' && (list.path === '/'))){
          this.$router.push(list.path);
          this.$store.commit('menu/SELECTMENUS', list);
        }
      }
    },
}
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
    border-right: none;
    height: 100vh+30px;
    h3 {
        color: #fff;
        text-align: center;
        line-height: 48px;
        font-size: 16px;
        font-weight: 400;
    }
}
</style>>