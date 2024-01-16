<template>
  <div v-if="this.$store.state.step != 0" class="header">
    <ul class="header-button-left">
      <li v-if="this.$store.state.step == 2" @click="this.$store.commit('decreaseStep')">Prev</li>
    </ul>
    <img src="/mood/happiness.png" class="logo" />
    <ul class="header-button-right">
      <li v-if="this.$store.state.step == 2" @click="this.$store.commit('resetStep')">Submit</li>
    </ul>
  </div>

  <SplashPage v-if="this.$store.state.step == 0" />
  <MainPage v-if="this.$store.state.step == 1" />
  <WritePage v-if="this.$store.state.step == 2" />
  <StatisticsPage v-if="this.$store.state.step == 3" />

  <div class="footer" v-if="this.$store.state.step != 0">
    <div class="statistics-button">
      <p v-if="this.$store.state.step != 3" @click="this.$store.state.step = 3">통계</p>
      <p v-else @click="this.$store.commit('resetStep')">HOME</p>
    </div>
  </div>
</template>

<script>
import SplashPage from './components/CalendarSplashPage.vue'
import MainPage from './components/CalendarMainPage.vue'
import WritePage from './components/CalendarWritePage.vue'
import StatisticsPage from './components/CalendarStatisticsPage.vue'

export default {
  name: 'app',
  components: {
    SplashPage,
    MainPage,
    WritePage,
    StatisticsPage
  },
  data() {
    return {
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  background-color: white;
  padding-top: 8px;
  padding-bottom: 16px;
  
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.header-button-left {
  color: black;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: black;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
  padding-right: 20px;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 80px;
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
.statistics-button {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: rgb(255, 248, 156);
  margin: auto;
  box-shadow: 0px 5px 15px gray;
  
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
}
body {
  margin: 0 8px 0 8px
}
</style>
