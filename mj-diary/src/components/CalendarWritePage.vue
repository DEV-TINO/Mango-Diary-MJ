<template>
  <div class="diary-block">
    <div class="select-mood">
      <h3>오늘의 기분은?</h3>
      <div class="mood-list">
        <img src="../../public//mood/happiness.png" />
        <img src="../../public//mood/angry.png" />
        <img src="../../public//mood/depressed.png" />
        <img src="../../public//mood/sad.png" />
        <img src="../../public//mood/happy.png" />
      </div>
    </div>
    <div>
      <h3>오늘은 무슨 일이 있었나요?</h3>
      <div class="write-block">
        <div class="today">2024년 1월 13일</div>
        <textarea></textarea>
      </div>
    </div>
    <div>
      <ul class="input-block">
        <input id="chooseFile" accept="image/*" type="file" class="input-image" />
        <label for="file" class="input-plus">+</label>
        <label>Upload Image</label>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  
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
  height: 291px;
  padding: 16px;
  background-color: rgb(255, 255, 152);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
textarea {
  width: 95%;
  height: 85%;

  border: none;
}
.today {
  margin: 0;
  margin-bottom: 16px;
}
.input-block {
  padding-top: 32px;
  padding-bottom: 32px;
  border-style: dotted;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
}
#chooseFile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
</style>