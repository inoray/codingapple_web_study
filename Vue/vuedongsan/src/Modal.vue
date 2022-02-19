<template>
  <div class="black-bg" v-if="modalState">
    <div class="white-bg">
      <img class="room-img" :src="onerooms[selected].image" />
      <h4>{{ onerooms[selected].title }}</h4>
      <p>{{ onerooms[selected].price }} 원</p>
      <p>{{ onerooms[selected].content }}</p>
      <button @click="$emit('closeModal')">닫기</button>
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
};
</script>

<style></style>
