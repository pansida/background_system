<template>
  <el-form :model="form" :inline='true' class="login-container" :rules="rules" ref="form">
    <h3 class="login_title">系统登录</h3>
    <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
        <el-button type="primary" class="logins" @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Cookie from "js-cookie"
import {getMenu} from '../api'
export default {
    name:'Login',
    data() {
        return {
            form:{
                username:'',
                password:'',
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password:[
                     { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        login(){
            this.$refs.form.validate((valid)=>{
                if(valid){
                    getMenu(this.form).then(({data})=>{
                        if(data.code === 20000){
                            const token = data.data.token
                            Cookie.set('token',token)
                            // 读取侧边栏列表数据
                            this.$store.commit('menu/SETMENU', data.data.menu);
                            // 将router路由传递给vuex
                            this.$store.commit('menu/ADDMENU', this.$router);
                            this.$router.push('home')
                        }
                        else{
                            this.$message.error('用户名或密码错误！');
                        }
                    })
                }
            })
        }
    },
}
</script>

<style lang='less' scoped>
    .login-container{
        width:350px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        background-color: #fff;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        .el-form-item{
            :deep(.el-form-item__label){
                width: 70px;
            }
            .el-input{
                width: 198px;
            }
        }
        .login_title{
            text-align: center;
            margin-bottom: 40px;
            color: #505458;
        }
        .logins{
            margin-left: 100px;
            margin-top:10px;
        }
    }
</style>