<template>
  <div id="app">
    <!-- <app-blog/> -->
    <router-view />
  </div>
</template>

<script>
import Blog from '@/components/Blog.vue'
export default {
  name : 'app',
  components: {
    'app-blog': Blog
  }
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
