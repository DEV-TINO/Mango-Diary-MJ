import { createStore } from 'vuex';
import data from './data/data.js';

const MONTH_MAP = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'Jun',
  7: 'Jul',
  8: 'Aug',
  9: 'Sep',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const store = createStore({
  state() {
    return {
      weeks: WEEKS,
      todayDate: {
        year: 0,
        month: 0,
        day: 0
      },
      date: {
        year: 0,
        month: 0,
        ENG_MONTH: '',
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
      postContent: '',
      writeYear: '',
      wirteMonth: '',
      writeDay: '',
      writeDate: '',
      todayMood: '',
      showNavButton: false,
      emojiData: data.emoji,
      postData: data.post,
      statisticsData: data.statistics
    }
  },
  mutations: {
    loadCalendar(state) {
      state.days = [];
      state.date.year = state.today.getFullYear();
      state.date.month = state.today.getMonth();
      state.date.month_ENG = `${MONTH_MAP[state.date.month + 1]}`;
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
    getTodayDate(state) {
      state.todayDate.year = state.today.getFullYear();
      state.todayDate.month = state.today.getMonth();
      state.todayDate.day = state.today.getDate();
    },
    setImageUrl(state, url) {
      state.imageUrl = url;
    },
    setMood(state, mood) {
      state.todayMood = mood;
    },
    resetOption(state) {
      state.todayMood = '';
      state.postContent = '';
      state.imageUrl = '';
    },
    setContent(state, content) {
      state.postContent = content;
    },
    addPostingData(state, post) {
      state.postData.push(post);
    }
  },
  actions: {
    submitDiary(context) {
      const diaryData = {
        "post_id": context.state.writeDate,
        "post_year": context.state.writeYear,
        "post_month": context.state.wirteMonth,
        "post_date": context.state.writeDay,
        "post_emoji_id": context.state.todayMood.emoji_id,
        "post_content": context.state.postContent,
        "post_upload_image": context.state.imageUrl
      }

      context.commit('resetOption');
    }
  }
})

export default store