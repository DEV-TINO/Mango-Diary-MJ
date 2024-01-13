<template>
  <div v-if="step != 0" class="header">
    <ul class="header-button-left">
      <li v-if="step == 2">Prev</li>
    </ul>
    <img src="../public/mood/happiness.png" class="logo" />
    <ul class="header-button-right">
      <li v-if="step == 2">Submit</li>
    </ul>
  </div>

  <CalendarSplash v-if="step == 0" />

  <CalendarMain v-if="step == 1" />

  <CalendarWrite v-if="step == 2" />

  <CalendarStatistics v-if="step == 3" />

  <div class="footer" v-if="step != 0">
    <div class="statistics-button">
      <p>통계</p>
    </div>
  </div>
</template>

<script>
import CalendarSplash from './components/CalendarSplashPage.vue'
import CalendarMain from './components/CalendarMainPage.vue'
import CalendarWrite from './components/CalendarWritePage.vue'
import CalendarStatistics from './components/CalendarStatisticsPage.vue'

export default {
  name: 'app',
  components: {
    CalendarSplash,
    CalendarMain,
    CalendarWrite,
    CalendarStatistics
  },
  data() {
    return {
      step: 2,
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
  box-shadow: 0px 0px 5px gray;
  
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
}
#app {
  box-sizing: border-box;
  margin-top: 60px;
  width: 100%;
  margin: auto;
  position: relative;
}
</style>
