<template>
  <div class="diary-block">
    <div class="select-mood">
      <div class="title">오늘의 기분은?</div>
      <div class="mood-list">
        <img :class="setImageMood('happiness')" @click="this.$store.commit('setMood', 'happiness')" src="/mood/happiness.png" />
        <img :class="setImageMood('angry')" @click="this.$store.commit('setMood', 'angry')" src="/mood/angry.png" />
        <img :class="setImageMood('depressed')" @click="this.$store.commit('setMood', 'depressed')" src="/mood/depressed.png" />
        <img :class="setImageMood('sad')" @click="this.$store.commit('setMood', 'sad')" src="/mood/sad.png" />
        <img :class="setImageMood('happy')" @click="this.$store.commit('setMood', 'happy')" src="/mood/happy.png" />
      </div>
    </div>
    <div>
      <div class="title">오늘은 무슨 일이 있었나요?</div>
      <div class="write-block">
        <div class="today-block">{{ this.$store.state.date.year }}년 {{ this.$store.state.wirteMonth }}월 {{ this.$store.state.writeDay }}일</div>
        <textarea class="text-write"></textarea>
      </div>
    </div>

    <div v-if="this.$store.state.imageUrl == ''" class="input-block" @change="uploadImage($event)">
      <input accept="image/*" type="file" id="input-file" class="input-image" />
      <label for="input-file" class="input-label">
        <div>+</div>
        <div>Upload Image</div>
      </label>
    </div>
    <div v-else class="upload-image" :style="{ backgroundImage: `url(${this.$store.state.imageUrl})` }">
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    uploadImage(event) {
      const file = event.target.files;
      this.$store.commit('setImageUrl', URL.createObjectURL(file[0]));
    },
    setImageMood(mood) {
      return this.$store.state.todayMood == mood ? 'color-mood' : 'grey-mood'
    }
  }
}
</script>

<style>
.diary-block {
  padding-left: 16px;
  padding-right: 16px;
}
.title {
  margin-top: 1rem;
  margin-bottom: 1rem;
  font-size: 1.15rem;
  font-weight: bold;
  background-color: rgb(255, 226, 64);
  display: inline-block;
}
.select-mood {
  margin-bottom: 1rem;
}
.mood-list {
  display: flex;
  justify-content: space-around;
}
.color-mood {
  width: 4.25rem;
}
.grey-mood {
  width: 4.25rem;
  filter: grayscale(100%);
}
.write-block {
  width: calc(100% - 32px);
  height: 16.5rem;
  padding: 16px;
  background-color: rgb(255, 255, 152);
  margin-bottom: 1em;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.text-write {
  width: 95%;
  height: 85%;
  border: none;
  resize: none;
}
.today-block {
  margin: 0;
  margin-bottom: 16px;
  font-size: 1.15rem;
}
.input-block {
  border-style: dotted;
  border-radius: 1rem;
  cursor: pointer;
}
.input-image {
  display: none;
}
.input-label {
  height: 100%;
  cursor: pointer;
  padding: 2.75rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border: 1px solid grey;
  border-radius: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>