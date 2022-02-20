<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img class="room-img" :src="onerooms[selected].image" />
      <h4>{{ onerooms[selected].title }}</h4>
      <p>{{ onerooms[selected].price * month }} 원</p>
      <p>{{ onerooms[selected].content }}</p>
      <button @click="$emit('closeModal')">닫기</button>
      <p>입력값: {{month}}</p>
      <!-- <input @input="month = $event.target.value"> -->
      <input v-model.number="month">
      <!-- 위에 있는 @input과 동일한 기능을 함 -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    onerooms: Object,
    selected: Number,
    modalState: Boolean,
  },
  data() {
    return {
      month: 0
    }
  },
  watch: {
    month(a) {
      if (isNaN(a)) {
        alert("문자입력 금지");
        this.month = 1;
      }
    }
  },
  beforeUpdate(){
    if(this.month == 2){
      alert("2를 입력했습니다.");
    }
  },
};
</script>

<style></style>
