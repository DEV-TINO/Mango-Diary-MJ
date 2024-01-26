<template>
  <div class="select-date">
    <div class="select-month">
    <div class="last-month" @click="reloadCalendar(-1)">{{ this.$store.state.prev }}</div>
    <div class="month-block">
      <div class="year">{{ this.$store.state.year }}</div>
      <div class="month">{{ this.$store.state.month + 1 }}</div>
    </div>
    <div class="next-month" @click="reloadCalendar(1)">></div>
  </div>
  </div>
  <div class="calendar-block">
    <table class="calendar">
      <thead class="week-block">
        <tr class="week" v-for="week, index in this.$store.state.weeks" :key="index">
          <th>{{ week }}</th>
        </tr>
      </thead>
      <tbody class="day-body">
        <tr class="day-row" v-for="index, i in this.$store.state.days" :key="i">
          <td class="day-block" v-for="day in index" :key="day">
            <div class="day" @click="goWrite(this.$store.state.year, this.$store.state.month, day)">{{ day }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="write-button" @click="goWrite(this.$store.state.year, this.$store.state.month, this.$store.state.day)">write</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('loadCalendar');
  },
  methods: {
    reloadCalendar(v) {
      this.$store.state.today = new Date(this.$store.state.today.setMonth(this.$store.state.today.getMonth() + v, 1));
      this.$store.commit('loadCalendar');
    },
    goWrite(year, month, day) {
      this.$store.state.wirteMonth = String(month + 1).padStart(2, "0");
      this.$store.state.writeDay = String(day).padStart(2, "0");
      this.$store.state.writeDate = String(year) + this.$store.state.wirteMonth + this.$store.state.writeDay;
      this.$router.push(`/write/${this.$store.state.writeDate}`)
    }
  }
}
</script>

<style>
.select-month {
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.last-month {
  cursor: pointer;
}
.next-month {
  cursor: pointer;
}
.month-block {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.calendar-block {
  display: flex;
  justify-content: center;
}
.calendar {
  width: calc(100% - 24px);
  padding: 12px;
  background-color: rgb(255, 255, 152);
}
.week-block {
  width: 100%;	
  margin-bottom: 16px;
  display: flex;
  justify-content: space-around;
}
.week {
  width: 42px;
  background-color: rgb(255, 226, 64);
  display: flex;
  justify-content: center;
}
.day-row {
  color: black;
  display: flex;
  justify-content: space-around;
}
.day-body {
  width: 100%;
}
.day-block {
  width: 42px;
  height: 50px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.day {
  text-decoration-line: none;
  color: black
}
.write-button {
  width: 64px;
  height: 64px;
  background-color: rgb(255, 248, 156);
  border-radius: 50%;
  border: none;
  box-shadow: 0px 5px 15px gray;
  cursor: pointer;
  text-decoration-line: none;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 7.5rem;
  right: 32px;
}
</style>