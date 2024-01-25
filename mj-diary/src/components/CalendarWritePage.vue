<template>
  <div class="diary-block">
    <div class="select-mood">
      <h3>오늘의 기분은?</h3>
      <div class="mood-list">
        <img src="/mood/happiness.png" />
        <img src="/mood/angry.png" />
        <img src="/mood/depressed.png" />
        <img src="/mood/sad.png" />
        <img src="/mood/happy.png" />
      </div>
    </div>
    <div>
      <h3>오늘은 무슨 일이 있었나요?</h3>
      <div class="write-block">
        <div class="today">{{ this.$store.state.year }}년 {{ this.$store.state.wirteMonth }}월 {{ this.$store.state.writeDay }}일</div>
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
    }
  }
}
</script>

<style>
.diary-block {
  padding-left: 16px;
  padding-right: 16px;
}
.select-mood {
  margin-bottom: 32px;
}
.mood-list {
  display: flex;
  justify-content: space-around;
}
img {
  width: 67px;
}
.write-block {
  width: calc(100% - 32px);
  height: 16.5rem;
  padding: 16px;
  background-color: rgb(255, 255, 152);
  margin-bottom: 1em;
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
.today {
  margin: 0;
  margin-bottom: 16px;
}
.input-block {
  border-style: dotted;
  cursor: pointer;
}
.input-image {
  display: none;
}
.input-label {
  height: 100%;
  cursor: pointer;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.upload-image {
  width: 100%;
  height: 150px;
  overflow: hidden;
  border: 1px solid black;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
</style>