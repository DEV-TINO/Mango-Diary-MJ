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
      selectedMood: '',
      showNavButton: false,
      emojiData: data.emoji,
      postData: data.post,
      statisticsData: data.statistic,
    }
  },
  mutations: {
    loadCalendar(state) {
      state.days = []
      state.date.year = state.today.getFullYear()
      state.date.month = state.today.getMonth()
      state.date.ENG_MONTH = `${MONTH_MAP[state.date.month + 1]}`
      state.date.day = state.today.getDate()
      state.startDay = new Date(state.date.year, state.date.month, 1).getDay()
      state.endDay = new Date(state.date.year, state.date.month + 1, 0).getDate()
      state.basicDays = Array.from({ length: state.endDay }, (v, i) => i + 1)
      state.emptyDays = Array(state.startDay).fill(null)
      state.combinedDays = [...state.emptyDays, ...state.basicDays]

      for(let i = 0; i < 35; i++) {
        if(state.combinedDays[i] != null) {
          continue;
        }else {
          state.combinedDays.push(null)
        }
      }

      for(let i = 0; i < state.endDay + state.startDay; i += 7) {
        state.days.push(state.combinedDays.slice(i, i + 7))
      }
    },
    getTodayDate(state) {
      state.todayDate.year = state.today.getFullYear()
      state.todayDate.month = state.today.getMonth()
      state.todayDate.day = state.today.getDate()
    },
    setImageUrl(state, url) {
      state.imageUrl = url
    },
    setMood(state, mood) {
      state.todayMood = mood.name
    },
    resetOption(state) {
      state.selectedMood = ''
      state.todayMood = ''
      state.postContent = ''
      state.imageUrl = ''
    },
    setContent(state, content) {
      state.postContent = content
    },
    addPostingData(state, post) {
      state.postData.push(post)
    },
    setNavigationButton(state, bool) {
      state.showNavButton = bool
    },
    initToday(state){
      state.today = new Date()
    },
    updateStatisticsCount(state) {
      state.statisticsData.forEach(statistic => {
        statistic.count = state.postData.filter(post => post.emoji === statistic.emoji).length
      })
    },
  },
  actions: {
    submitDiary(context) {
      const postId = context.state.writeDate
      const postIndex = context.state.postData.findIndex((entry) => entry.id === postId)

      const diaryData = {
        "id": postId,
        "year": context.state.writeYear,
        "month": context.state.wirteMonth,
        "date": context.state.writeDay,
        "emoji": context.state.selectedMood,
        "content": context.state.postContent,
        "image": context.state.imageUrl
      }

      if (postIndex !== -1) {
        context.state.postData[postIndex] = diaryData
      } else {
        context.commit('addPostingData', diaryData)
      }
      
      context.commit('updateStatisticsCount')
      context.commit('resetOption')
    },
  }
})

export default store