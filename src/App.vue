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
#nprogress .bar {
  background: #4096ff !important;  /* 更改为你想要的颜色 */
}

</style>
