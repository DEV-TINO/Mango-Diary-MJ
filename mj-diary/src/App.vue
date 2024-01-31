<template>
  <div v-if="$route.path != `/`" class="header">
    <router-link @click="this.$store.commit('setShowButton')" class="header-button-left" v-if="this.$store.state.showNavButton" to="/main">
      Prev
    </router-link>
    <img src="/mood/happiness.png" class="logo" />
    <router-link @click="this.$store.dispatch('submitDiary')" class="header-button-right" v-if="this.$store.state.showNavButton" to="/main">
      Submit
    </router-link>
  </div>

  <router-view />

  <div class="footer" v-if="$route.path != `/`">
    <router-link class="footer-button" v-if="$route.path != `/statistics`" to="/statistics">통계</router-link>
    <router-link class="footer-button" v-if="$route.path == `/statistics`" to="/main">HOME</router-link>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
.header {
  width: 100%;
  background-color: white;
  padding-top: 1.5rem;
  padding-bottom: 1.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.header-button-left {
  color: black;
  float: left;
  width: 50px;
  padding-left: 21px;
  cursor: pointer;
  margin-top: 10px;
  list-style-type: none;
  text-decoration-line: none;
  font-size: 1.25rem;
}
.header-button-right {
  color: black;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
  padding-right: 21px;
  list-style-type: none;
  text-decoration-line: none;
  font-size: 1.25rem;
}
.logo {
  width: 4.25rem;
  margin: auto;
}
.footer {
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 152);
  position: fixed;
  left: 0;
  bottom: 0;
}
.footer-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgb(255, 248, 156);
  margin: auto;
  box-shadow: 0px 5px 15px gray;
  text-decoration-line: none;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
}
#app {
  width: 100%;
  box-sizing: border-box;
  margin-top: 60px;
  margin: auto;
  position: relative;
  font-family: 'Cafe24Oneprettynight';
}
body {
  margin: 0 8px 0 8px
}
</style>
