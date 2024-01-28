import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      weeks: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      date: {
        year: 0,
        month: 0,
        day: 0,
      },
      today: '',
      days: [],
      startDay: 0,
      endDay: 0,
      basicDays: 0,
      emptyDays: 0,
      combinedDays: 0,
      imageUrl: '',
      wirteMonth: '',
      writeDay: '',
      writeDate: '',
      todayMood: '',
    }
  },
  mutations: {
    loadCalendar(state) {
      state.today = new Date();
      state.days = [];
      state.date.year = state.today.getFullYear();
      state.date.month = state.today.getMonth();
      state.date.day = state.today.getDate();
      state.startDay = new Date(state.date.year, state.date.month, 1).getDay();
      state.endDay = new Date(state.date.year, state.date.month + 1, 0).getDate();
      state.basicDays = Array.from({ length: state.endDay }, (v, i) => i + 1);
      state.emptyDays = Array(state.startDay).fill(null);
      state.combinedDays = [...state.emptyDays, ...state.basicDays];

      for(let i = 0; i < 35; i++) {
        if(state.combinedDays[i] != null) {
          continue;
        }else {
          state.combinedDays.push(null);
        }
      }

      for(let i = 0; i < state.endDay + state.startDay; i += 7) {
        state.days.push(state.combinedDays.slice(i, i + 7));
      }
    },
    setImageUrl(state, url) {
      state.imageUrl = url;
    },
    setMood(state, mood) {
      state.todayMood = mood;
    }, 
    submitDiary(state) {
      state.todayMood = '';
      state.imageUrl = '';
    }
  }
})

export default store