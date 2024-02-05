<template>
  <div class="select-month">
    <div class="month-block">
      <div class="year">{{ this.$store.state.date.year }}</div>
      <div class="month">{{ this.$store.state.date.month_ENG }}</div>
    </div>
  </div>
  <div :class="'ranking-block'" v-for="statistics, index in this.$store.state.statisticsData" :key="index">
    <div :class="setMoodBlock(statistics.statistic_rank)">
      <img :class="setMoodRank(statistics.statistic_rank)" :src="`/mood/` + this.$store.state.emojiData[statistics.statistic_emoji_id].emoji_name + `.png`" />
      <div :class="'top-comment'" v-if="statistics.statistic_rank == 1">
        <h3 :class="'top-count'">{{ this.$store.state.emojiData[statistics.statistic_emoji_id].emoji_subtitle }} {{ statistics.statistic_count }}개</h3>
        <p :class="'comment'">{{ statistics.statistic_comment }}</p>
      </div>
      <div :class="'ranking'" v-if="statistics.statistic_rank != 1">
        <p :class="'count'">{{ this.$store.state.emojiData[statistics.statistic_emoji_id].emoji_subtitle }} {{ statistics.statistic_count }}개</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.state.today = new Date();
    this.$store.commit('loadCalendar');
    this.$store.state.showNavButton = false;
  },
  methods: {
    setMoodBlock(rank) {
      if(rank == 1) {
        return 'rank-top';
      } else {
        return 'ranking-block';
      }
    },
    setMoodRank(rank) {
      if(rank == 1) {
        return 'top-mood';
      } else {
        return 'mood';
      }
    }
  }
}
</script>

<style>
.rank-top {
  width: 19rem;
  padding: 1rem;
  border-style: double;
  border-width: 3px;
  border-color: rgb(255, 226, 64);
  border-radius: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.top-mood {
  width: 6rem;
  margin-right: 16px;
}
.top-comment {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.top-count {
  margin: 0;
  margin-bottom: 0.5rem;
}
.count {
  margin: 0;
  font-size: 1.25rem;
}
.comment {
  margin: 0;
  font-size: 1rem;
}
.ranking-block {
  width: 100%;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.ranking {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.mood {
  width: 5rem;
  margin-right: 2rem;
}
</style>