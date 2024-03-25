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

</style>
