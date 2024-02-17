<template>
  <div class="diary-block">
    <div class="select-mood">
      <div class="title">오늘의 기분은?</div>
      <div class="mood-list">
        <div v-for="emoji, index in this.$store.state.emojiData" :key="index">
          <img :src="`/mood/` + emoji.name + `.png`" :class="emojiClass(emoji.name)" @click="selectMood(emoji.name)" />
        </div>
      </div>
    </div>
    <div>
      <div class="title">오늘은 무슨 일이 있었나요?</div>
      <div class="write-block">
        <div class="today-block">{{ this.$store.state.date.year }}년 {{ this.$store.state.wirteMonth }}월 {{ this.$store.state.writeDay }}일</div>
        <textarea class="text-write" @input="handleContentInput">{{ this.$store.state.postContent }}</textarea>
      </div>
    </div>
    <div v-if="this.$store.state.imageUrl == ''" class="input-block" @change="uploadImage($event)">
      <input accept="image/*" type="file" id="input-file" class="input-image" />
      <label for="input-file" class="input-label">
        <div>+</div>
        <div>Upload Image</div>
      </label>
    </div>
    <div v-else class="upload-image" :style="{ backgroundImage: `url(${this.$store.state.imageUrl})` }"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('setNavigationButton', true);
    this.loadPostData();
  },
  methods: {
    loadPostData() {
      const postId = this.$store.state.writeDate;
      const post = this.$store.state.postData.find((entry) => entry.id === postId);

      if (post) {
        this.$store.state.selectedMood = post.emoji;
        this.$store.commit('setContent', post.content);
        this.$store.commit('setImageUrl', post.image);
      }
    },
    handleContentInput(event) {
      this.$store.commit('setContent', event.target.value);
    },
    uploadImage(event) {
      const file = event.target.files;
      this.$store.commit('setImageUrl', URL.createObjectURL(file[0]));
    },
    selectMood(emoji) {
      this.$store.state.selectedMood = emoji;
    },
    updateMood() {
      this.$store.commit('setMood', this.$store.state.selectedMood);
    },
  },
  computed: {
    emojiClass() {
      return (mood) => {
        if (this.$store.state.selectedMood === mood) {
          return 'color-mood';
        } else if (!this.$store.state.selectedMood && this.$store.state.todayMood === mood) {
          return 'color-mood';
        } else {
          return 'grey-mood';
        }
      };
    },
  },
};
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
  margin-bottom: 0.25rem;
}
.mood-list {
  display: flex;
  justify-content: space-around;
}
.color-mood {
  width: 4.25rem;
  cursor: pointer;
}
.grey-mood {
  width: 4.25rem;
  filter: grayscale(100%);
  cursor: pointer;
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
  font-family: 'Cafe24Oneprettynight';
  font-size: 1rem;
  outline: none;
}
.today-block {
  margin: 0;
  margin-bottom: 16px;
  font-size: 1.15rem;
}
.input-block {
  border: 5px dotted rgb(255, 226, 64);
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
  padding: 2.5rem;
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-image {
  width: 100%;
  height: 8rem;
  overflow: hidden;
  border: 1px solid rgb(255, 226, 64);
  border-radius: 1rem;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>