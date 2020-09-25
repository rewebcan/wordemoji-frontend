<template>
  <div id="app" class="has-text-centered">
    <div class="header container">
      <img src="/images/logo.png" alt="logo">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  metaInfo: {
    title: "Wordemoji",
  }
};
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
  background: #e2e2e2 url("/images/background.png") repeat;
}
#app {
  width: 60%;
}
/* The emerging W3C standard
   that is currently Firefox-only */
* {
  scrollbar-width: thin;
  scrollbar-color: #e2e2e2 white;
}
/* Works on Chrome/Edge/Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: white;
}
*::-webkit-scrollbar-thumb {
  background-color: #e2e2e2;
  border-radius: 20px;
  border: 3px solid white;
}
.header {
  display: flex;
}
.header img {
  width: 100px;
  margin-right: auto;
  margin-left: 6px; 
  margin-bottom: 10px;
}
</style>