<template>
  <div id="app">
    
    <Home />

  </div>
</template>

<script>
import Home from "./views/Home";

export default {
  name: 'App',
  components : {
    Home
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
}
</style>>
