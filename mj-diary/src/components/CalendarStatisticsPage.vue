<template>
  <div class="select-month">
    <div class="month-block">
      <div class="year">{{ this.$store.state.date.year }}</div>
      <div class="month">{{ this.$store.state.date.month_ENG }}</div>
    </div>
  </div>
  <div class="rank-top">
    <img class="top-mood" src="/mood/happy.png" />
    <div class="top-comment">
      <p class="comment">기쁜 일이 많았나 봐요</p>
      <h3 class="comment">기쁨 16개</h3>
    </div>
  </div>
  <div class="ranking-block">
    <div class="ranking">
      <h3>2위</h3>
      <img class="mood" src="/mood/happiness.png" />
      <p>7개</p>
    </div>
    <div class="ranking">
      <h3>3위</h3>
      <img class="mood" src="/mood/depressed.png" />
      <p>5개</p>
    </div>
    <div class="ranking">
      <h3>4위</h3>
      <img class="mood" src="/mood/sad.png" />
      <p>2개</p>
    </div>
    <div class="ranking">
      <h3>5위</h3>
      <img class="mood" src="/mood/angry.png" />
      <p>1개</p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.today = new Date();
    this.$store.commit('loadCalendar');
    this.$store.state.showNavButton = false;
  }
}
</script>

<style>
.rank-top {
  margin-bottom: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.top-mood {
  width: 123px;
  margin-right: 16px;
}
.top-comment {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.comment {
  margin: 0;
}
.ranking-block {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.ranking {
  margin-bottom: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mood {
  width: 88px;
}
</style>