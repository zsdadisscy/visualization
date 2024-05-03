<template>
  <!-- <NavBar /> -->
  <!-- key属性指明使用完整路径 -->
  <router-view :key="$route.fullPath"/>
</template>

<script>


export default {
  name: 'App',
  components: {
    // NavBar: NavBar,
  }
}

</script>

<style>
/* 重写进度条颜色 */
#nprogress .bar {
  background: #4096ff !important;  
}

</style>
