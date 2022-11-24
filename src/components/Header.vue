<template>
  <el-row class="header_list">
    <el-col :span="24" class="header_container">
        <div class="grid-content bg-purple-dark header_nv">
            <el-button  icon="el-icon-menu" size="mini" @click="MenuFolding"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for='item in selectMenu' :key="item.path" :to="{ path: item.path }">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="../assets/user.png" alt="" width="40" height="40">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
        </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
import Cookie from 'js-cookie'
import {mapMutations,mapState} from "vuex"
export default {
    name:'Header',
    methods:{
        ...mapMutations('menu',{MenuFolding:'CLICKMUNE'}),
        handleCommand(command){
            if(command === 'logout'){
                Cookie.remove('token')
                Cookie.remove('menu')
                this.$router.push('login')
            }
        }
    },
    computed:{
        ...mapState('menu',['selectMenu'])
    },
}
</script>

<style lang="less" scoped>
    .header_list{
        background-color: #333333;
        height: 60px;
        padding: 0;
        padding: 0 20px;
        .header_container{
            width: 100%;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .el-dropdown-link{
                img{
                    border-radius: 50%;
                }
                
            }
        }
        /deep/.header_nv{
            display: flex;
            align-items: center;
            .el-button{
                margin-right: 20px;
            }
            .el-breadcrumb__inner{
                color: #666;
            }
            .el-breadcrumb__item:last-child{
                .el-breadcrumb__inner{
                    color: #fff;
                } 
            }
        }

    }
</style>