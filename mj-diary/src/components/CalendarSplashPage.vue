<template>
  <router-link class="splash" to="/main">
    <img class="splash-logo" src="/splashLogo.png" />
    <p class="splash-phrases">Touch to Start</p>
  </router-link>
</template>

<script>
export default {
  
}
</script>

<style>
.splash {
  width: 100%;
  min-height: 100svh;
  margin: 0;
  text-decoration-line: none;
  color: black;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.splash-logo {
  width: 156px;
}
</style>