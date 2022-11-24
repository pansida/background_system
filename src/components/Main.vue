<template>
  <el-container>
    <el-aside width="auto">
        <Aside/>
    </el-aside>
    <el-container>
        <el-header>
          <Header/>
        </el-header>
        <HenuCode/>
        <el-main>
        <router-view></router-view>
        </el-main>
    </el-container>
</el-container>
</template>

<script>
import Aside from './Aside';
import Header from './Header';
import HenuCode from '../views/MenuCode.vue';

export default {
  name: 'Main',
  components: {
    Aside,Header,HenuCode
  }
}
</script>
<style lang='less' scoped>
body{
  min-width: 1150px;
}
*{
  margin: 0;
  padding: 0;
}
.el-main{
  padding: 20px;
}
</style>