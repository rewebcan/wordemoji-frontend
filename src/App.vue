<template>
  <div id="app" class="has-text-centered">
      <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    background-color: #e2e2e2;
  }
  #app {
    width: 60%;
  }
</style>