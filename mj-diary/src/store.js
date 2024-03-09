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
      emojiUrlList: []
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
      state.writeYear = String(date.y)
      state.writeMonth = String(date.m + 1)
      state.writeDay = String(date.d)
      state.writeDate = state.writeYear + state.writeMonth + state.writeDay
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
      for(let i = 0; i < state.statisticsData.length; i++) {
        const emojiCount = state.emojiUrlList.filter(element => element?.emoji_name == state.statisticsData[i].emoji).length
        state.statisticsData[i]['count'] = emojiCount
      }
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
      
      for(let i = 0; i < Object.keys(diaryData).length; i++) {
        newForm.append(Object.keys(diaryData)[i], diaryData[Object.keys(diaryData)[i]])
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
      for(let i = 0; i < context.state.postData.length; i++) {
        if(context.state.writeYear == context.state.postData[i]?.post_year && context.state.writeMonth == context.state.postData[i]?.post_month && context.state.writeDay == context.state.postData[i]?.post_date) {
          const result = await axios.get(`${context.state.host}/emoji/search/${context.state.postData[i].post_emoji_id}`)

          context.commit('setSelectedMood', result.data)
          context.commit('setContent', context.state.postData[i].post_content)

          const url = `${context.state.host}${context.state.postData[i].post_upload_image}`
          context.commit('setImageUrl', url)
        }
      }
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
        const post = context.state.postData.find(entry => entry?.post_year == String(context.state.date.year) && entry?.post_month == String(context.state.date.month + 1) && entry?.post_date == (i + 1).toString())
        const emojiId = post?.post_emoji_id

        if(post && emojiId) {
          const emoji = await axios.get(`${context.state.host}/emoji/search/${post.post_emoji_id}`)
          context.state.emojiUrlList[i] = emoji.data
        } else {
          context.state.emojiUrlList[i] = false
        }
      }
      context.commit('getStatisticsCount')
    }
  }
})

export default store