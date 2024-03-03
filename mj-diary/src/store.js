import axios from 'axios';
import { createStore } from 'vuex';
import post from './data/postData.js';
import emoji from './data/emojiData.js';
import statistics from './data/statisticsData.js'

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

const WEEKS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

const HOST = 'http://18.117.80.209:3333'

const store = createStore({
  state() {
    return {
      host: HOST,
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
      selectedMoodId: '',
      showNavButton: false,
      emojiData: emoji,
      postData: post,
      statisticsData: statistics,
      postType: 'MJ'
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
    setSelectedMood(state, mood) {
      state.selectedMood = mood.emoji_name
      state.selectedMoodId = mood.emoji_id
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
    getPostData(state, post) {
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
    setWriteDate(state, date) {
      state.writeYear = String(date.y)
      state.wirteMonth = String(date.m + 1)
      state.writeDay = String(date.d)
      state.writeDate = state.writeYear + state.wirteMonth + state.writeDay
    },
    async addPostData(state) {
      const postDate = {
        "post_month": String(state.date.month + 1),
        "post_year": String(state.date.year),
        "post_type": state.postType
      }

      const request = await axios.post(`${state.host}/post/all`, postDate)

      for(let i=0; i < request.data.length; i++) {
        const result = await axios.get(`${state.host}/post/search/${request.data[i].post_id}`)
        state.postData.push(result.data)
      }
      console.log(state.postData)
    },
    async addEmojiData(state) {
      const result = await axios.get(`${state.host}/emoji/all`)

      for(let i = 0; i < 5; i++) {
        if(result.data[i].emoji_type == 'MJ') {
          state.emojiData.push(result.data[i])
        }
      }
      console.log(state.emojiData)
    }
  },
  actions: {
    async submitDiary(context) {
      const diaryData = {
        "post_type": context.state.postType,
        "post_year": context.state.writeYear,
        "post_month": context.state.wirteMonth,
        "post_date": context.state.writeDay,
        "post_emoji_id": context.state.selectedMoodId,
        "post_content": context.state.postContent,
        "post_upload_image": context.state.imageUrl
      }

      const res = await axios.post(`${context.state.host}/post/create`, diaryData)

      context.commit('getPostData', diaryData)
      console.log(res)

      context.commit('updateStatisticsCount')
      context.commit('resetOption')
    },
    async findPostData(context) {
      for(let i = 0; i < context.state.postData.length; i++) {
        if(context.state.writeYear == context.state.postData[i].post_year && context.state.wirteMonth == context.state.postData[i].post_month && context.state.writeDay == context.state.postData[i].post_date) {
          const result = await axios.get(`${context.state.host}/emoji/search/${context.state.postData[i].post_emoji_id}`)
          
          context.commit('setSelectedMood', result.data)
          context.commit('setContent', context.state.postData[i].post_content)
          context.commit('setImageUrl', context.state.postData[i].post_upload_image)
        }
      }
    }
  }
})

export default store