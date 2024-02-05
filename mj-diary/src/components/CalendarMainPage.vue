<template>
  <div class="select-date">
    <div class="select-month">
    <div class="last-month" @click="reloadCalendar(-1)">{{ prev }}</div>
    <div class="month-block">
      <div class="year">{{ this.$store.state.date.year }}</div>
      <div class="month">{{ this.$store.state.date.ENG_MONTH }}</div>
    </div>
    <div class="next-month" @click="reloadCalendar(1)">></div>
  </div>
  </div>
  <div class="calendar-block">
    <table class="calendar">
      <thead class="week-block">
        <tr :class="setWeekStyle(week)" v-for="week, index in this.$store.state.weeks" :key="index">
          <th>{{ week }}</th>
        </tr>
      </thead>
      <tbody class="day-body">
        <tr class="day-row" v-for="index, i in this.$store.state.days" :key="i">
          <td class="day-block" v-for="day in index" :key="day" @click="handleClickWriteButton(this.$store.state.date.year, this.$store.state.date.month, day)">
            <img v-if="setDay(day) != false" :src="`/mood/` + setDay(day).emoji_name + `.png`" class="calendarEmoji" />
            <div v-if="setDay(day) == false" :class="today(day)">{{ day }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="write-button" @click="handleClickWriteButton(this.$store.state.todayDate.year, this.$store.state.todayDate.month, this.$store.state.todayDate.day)">write</div>
</template>

<script>
export default {
  data() {
    return {
      prev: "<",
    }
  },
  mounted() {
    this.$store.commit('initToday');
    this.$store.commit('loadCalendar');
    this.$store.commit('getTodayDate');
    this.$store.commit('setNavigationButton', false);
  },
  methods: {
    reloadCalendar(moveMonth) {
      this.$store.state.today = new Date(this.$store.state.today.setMonth(this.$store.state.today.getMonth() + moveMonth, 1));
      this.$store.commit('loadCalendar');
    },
    handleClickWriteButton(year, month, day) {
      this.$store.state.writeYear = String(year);
      this.$store.state.wirteMonth = String(month + 1).padStart(2, "0");
      this.$store.state.writeDay = String(day).padStart(2, "0");
      this.$store.state.writeDate = this.$store.state.writeYear + this.$store.state.wirteMonth + this.$store.state.writeDay;
      
      const todayDateStr = String(this.$store.state.todayDate.year) + String(this.$store.state.todayDate.month + 1).padStart(2, "0") + String(this.$store.state.todayDate.day).padStart(2, "0");

      if(this.$store.state.writeDate <= todayDateStr)
        this.$router.push(`/write/${this.$store.state.writeDate}`)
    },
    today(day) {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      const date = today.getDate();

      return this.$store.state.date.year == year && this.$store.state.date.month == month && date == day ? 'today' : 'day';
    },
    setWeekStyle(week) {
      if(week == 'SUN') {
        return 'sun';
      } else if(week == 'SAT') {
        return 'sat'
      } else {
        return 'week';
      }
    },
    setDay(day) {
      if(day != null) {
        if(this.$store.state.postData[day - 1]?.post_id == this.getDiaryId(this.$store.state.date.year, this.$store.state.date.month, day)) {
          return this.$store.state.emojiData[this.$store.state.postData[day - 1]?.post_emoji_id]
        } else {
          return false;
        }
      } else if(day == null) {
        return false;
      }
    },
    getDiaryId(year, month, day) {
      return String(year) + String(month + 1).padStart(2, "0") + String(day).padStart(2, "0");
    }
  }
}
</script>

<style>
.select-month {
  margin-top: 0.75rem;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.year {
  font-size: 1.25rem;
}
.month {
  font-size: 1.5rem;
}
.last-month {
  cursor: pointer;
  font-size: 1.5rem;
}
.next-month {
  cursor: pointer;
  font-size: 1.5rem;
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
  padding: 16px;
  background-color: rgb(255, 255, 152);
  border-radius: 1rem;
}
.week-block {
  width: 100%;	
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
}
.week {
  width: 42px;
  background-color: rgb(255, 226, 64);
  font-size: 1rem;
  display: flex;
  justify-content: center;
}
.sun {
  width: 42px;
  background-color: rgb(255, 226, 64);
  color: red;
  display: flex;
  justify-content: center;
}
.sat {
  width: 42px;
  background-color: rgb(255, 226, 64);
  color: rgb(0, 110, 255);
  display: flex;
  justify-content: center;
}
.day-row {
  color: black;
  display: flex;
  justify-content: space-between;
}
.day-body {
  width: 100%;
}
.day-block {
  width: 42px;
  height: 50px;
  padding-top: 8px;
  padding-bottom: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.day {
  text-decoration-line: none;
  color: black;
  font-size: 1.25rem;
}
.today {
  width: 40px;
  height: 40px;
  text-decoration-line: none;
  color: black;
  background-color: white;
  border-radius: 50%;
  font-size: 1.25rem;
  box-shadow: 0px 3px 10px rgb(177, 158, 52);
  display: flex;
  justify-content: center;
  align-items: center;
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
.calendarEmoji {
  width: 42px;
}
</style>