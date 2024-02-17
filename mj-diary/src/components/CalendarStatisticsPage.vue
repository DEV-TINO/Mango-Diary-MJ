<template>
  <div class="select-month">
    <div class="month-block">
      <div class="year">{{ $store.state.date.year }}</div>
      <div class="month">{{ $store.state.date.ENG_MONTH }}</div>
    </div>
  </div>
  <div v-if="sortedStatistics.length > 0" :class="'ranking-block'" v-for="(statistic, index) in sortedStatistics" :key="index">
    <div :class="setMoodBlock(index)">
      <img :class="setMoodRank(index)" :src="`/mood/` + statistic.emoji + `.png`" />
      <div :class="'top-comment'" v-if="index === 0">
        <h3 :class="'top-count'">{{ displaySubtitle(statistic) }} {{ statistic.count }}개</h3>
        <p :class="'comment'">{{ statistic.comment }}</p>
      </div>
      <div :class="'ranking'" v-else>
        <p :class="'count'">{{ displaySubtitle(statistic) }} {{ statistic.count }}개</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rank: 0,
    };
  },
  mounted() {
    this.$store.commit('initToday');
    this.$store.commit('loadCalendar');
    this.$store.commit('setNavigationButton', false);
    this.calculateRanking();
  },
  computed: {
    sortedStatistics() {
      return this.$store.state.statisticsData ? [...this.$store.state.statisticsData].sort((a, b) => b.count - a.count) : [];
    },
  },
  methods: {
    setMoodBlock(index) {
      return index === 0 ? 'rank-top' : 'ranking-block';
    },
    setMoodRank(index) {
      return index === 0 ? 'top-mood' : 'mood';
    },
    calculateRanking() {
      if (this.sortedStatistics.length > 0) {
        const emojiToCalculateRankFor = this.sortedStatistics[0].emoji;
        this.rank = this.sortedStatistics.findIndex(statistic => statistic.emoji === emojiToCalculateRankFor) + 1;
      }
    },
    displaySubtitle(statistic) {
      for(let i = 0; i < 6; i++) {
        if(this.$store.state.emojiData[i].name == statistic.emoji) {
          return this.$store.state.emojiData[i].subtitle;
        } else {
          continue;
        }
      }
    },
  },
};
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