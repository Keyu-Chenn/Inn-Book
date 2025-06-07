<template>
  <div id="app">
    <AppHeader current-page="creation" :username="currentUser" />
    <div class="main-container">
      <router-view />
    </div>
    <AppFooter />
  </div>

</template>

<script setup>
import { ref } from 'vue'

const currentUser = ref('李白')
</script>

<style>
#app {
  width: 100%;
  min-height: 100vh;
  /* margin: 0;
  padding: 0; */
  display: flex;
  flex-direction: column;
}

.main-container {
  margin-top: 70px;
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 全局重置，确保没有默认边距 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0 !important;
  padding: 0 !important;
}
</style>