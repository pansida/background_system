<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted(){
    if(window.name === ''){
      window.name = 'isRefresh'
    }
  }
  }
</script>

<style lang="less">
.app{
  min-width: 1300px;
}
*{
  padding: 0;
  margin: 0;
}
.app{
  margin: 0;
}
</style>
