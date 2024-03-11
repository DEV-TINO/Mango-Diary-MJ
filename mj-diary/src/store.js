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
const HEADEREMOJI = 3

const store = createStore({
  state() {
    return {
      host: HOST,
      weeks: WEEKS,
      headerEmoji: HEADEREMOJI,
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
      selectedFile: '',
      postContent: '',
      writeYear: '',
      writeMonth: '',
      writeDay: '',
      writeDate: '',
      todayMood: '',
      selectedMood: '',
      selectedMoodId: '',
      showNavButton: false,
      emojiData: emoji,
      postData: post,
      statisticsData: statistics,
      postType: 'MJ',
      emojiUrlList: [],
      statisticsCount: 0
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
    setImageUrl(state, file) {
      state.imageUrl = file
    },
    setSelectedFile(state, file) {
      state.selectedFile = file
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
      state.writeYear = String(date.year)
      state.writeMonth = String(date.month + 1)
      state.writeDay = String(date.day)
      state.writeDate = state.writeYear + (state.writeMonth).padStart(2, "0") + (state.writeDay).padStart(2, "0")
    },
    resetPostData(state) {
      state.postData.splice(0)
    },
    resetEmojiList(state) {
      state.emojiUrlList.splice(0)
    },
    async addEmojiData(state) {
      const result = await axios.get(`${state.host}/emoji/all`)

      for(let i = 0; i < 5; i++) {
        if(result.data[i].emoji_type == 'MJ') {
          state.emojiData.push(result.data[i])
        }
      }
    },
    getStatisticsCount(state) {
      state.statisticsData.forEach(statData => {
        const emojiCount = state.emojiUrlList.filter(element => element?.emoji_name === statData.emoji).length
        statData['count'] = emojiCount
      })
    }
  },
  actions: {
    async submitDiary(context) {
      const diaryData = {
        "post_type": context.state.postType,
        "post_year": context.state.writeYear,
        "post_month": context.state.writeMonth,
        "post_date": context.state.writeDay,
        "post_emoji_id": context.state.selectedMoodId,
        "post_content": context.state.postContent,
        "post_upload_image": context.state.selectedFile
      }

      const newForm = new FormData();
      
      for (const [key, value] of Object.entries(diaryData)) {
        newForm.append(key, value);
      }

      const res = await axios.post(`${context.state.host}/post/create`, newForm)

      context.commit('getPostData', diaryData)
      context.commit('updateStatisticsCount')
      context.commit('resetOption')
      context.commit('resetPostData')
      context.commit('resetEmojiList')
      context.commit('initToday')
      context.commit('loadCalendar')
    },
    async findPostData(context) {
      context.state.postData.forEach(async postData => {
        if (
          context.state.writeYear === postData?.post_year &&
          context.state.writeMonth === postData?.post_month &&
          context.state.writeDay === postData?.post_date
        ) {
          const result = await axios.get(`${context.state.host}/emoji/search/${postData.post_emoji_id}`)
    
          context.commit('setSelectedMood', result.data)
          context.commit('setContent', postData.post_content)
    
          const url = `${context.state.host}${postData.post_upload_image}`
          context.commit('setImageUrl', url)
        }
      })
    },
    async addPostData(context) {
      const postDate = {
        "post_month": String(context.state.date.month + 1),
        "post_year": String(context.state.date.year),
        "post_type": context.state.postType
      }

      const request = await axios.post(`${context.state.host}/post/all`, postDate)
      
      for(let i = 0; i < context.state.endDay; i++) {
        if(request.data[i]?.post_id) {
          const post = await axios.get(`${context.state.host}/post/search/${request.data[i].post_id}`)
          const postDate = parseInt(post?.data.post_date, 10) - 1

          if(post && postDate) {
            context.state.postData[postDate] = post.data
          } else {
            context.state.postData[i] = false
          }
        }
      }
      context.dispatch('findEmojiData')
    },
    async findEmojiData(context) {
      context.commit('resetEmojiList')
      for(let i = 0; i < context.state.endDay; i++) {
        const post = context.state.postData.find(entry => String(entry?.post_year) == String(context.state.date.year) && String(entry?.post_month) == String(context.state.date.month + 1) && String(entry?.post_date) == (i + 1).toString())
        const emojiId = post?.post_emoji_id

        if(post && emojiId) {
          const emoji = await axios.get(`${context.state.host}/emoji/search/${post.post_emoji_id}`)
          context.state.emojiUrlList[i] = emoji.data
        } else {
          context.state.emojiUrlList[i] = false
        }
      }
      context.commit('getStatisticsCount')
      context.dispatch('getStatisticsDisplay')
    },
    getStatisticsDisplay(context) {
      context.state.statisticsCount = 0
      for (let i = 0; i < 5; i++) {
        if (context.state.statisticsData[i]['count'] !== 0) {
          context.state.statisticsCount++
        }
      }
    }
  }
})

export default store