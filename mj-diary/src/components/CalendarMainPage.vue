<template>
  <div class="select-date">
    <div class="select-month">
    <div class="last-month">&lt</div>
    <div class="month-block">
      <div class="year">2024</div>
      <div class="month">01</div>
    </div>
    <div class="next-month">></div>
  </div>
  </div>
  <div class="calendar-block">
    <table class="calendar">
      <thead class="week-block">
        <tr class="week" v-for="week, index in weeks" :key="index">
          <th>{{ week }}</th>
        </tr>
      </thead>
      <tbody class="date-body">
        <tr v-for="index, i in dates" :key="i">
          <router-link class="date-row" to="/write/1">
            <td class="date-block" v-for="date, secIndex in index" :key="secIndex">{{ date }}</td>
          </router-link>
        </tr>
      </tbody>
    </table>
  </div>
  <router-link class="write-button" to="/write/1">write</router-link>
</template>

<script>
export default {
  data() {
    return {
      weeks: ['MON',	'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      dates: [[1, 2, 3, 4, 5, 6, 7],
              [8, 9, 10, 11, 12, 13, 14],
              [15, 16, 17, 18, 19, 20, 21],
              [22, 23, 24, 25, 26, 27, 28],
              [29, 30, 31, , , , ,]]
    }
  }
}
</script>

<style>
.select-month {
  margin-top: 8px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
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
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 12px;
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
.date-row {
  text-decoration-line: none;
  color: black;
  display: flex;
  justify-content: space-around;
}
.date-body {
  width: 100%;
}
.date-block {
  width: 42px;
  height: 72px;
  background-color: rgb(255, 226, 64);
  margin-bottom: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
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
  bottom: 104px;
  right: 32px;
}
</style>