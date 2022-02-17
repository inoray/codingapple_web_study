<template>
  <div v-for="(a, i) in onerooms" :key="i">
    <img class="room-img" :src="a.image" />
    <!-- <h4
      @click="
        modalState = true;
        selected = i;
      "
    > -->
    <h4>
      {{ a.title }}
    </h4>
    <p>{{ a.price }} 원</p>
    <!-- <button @click="increase">신고하기</button>
    <span>신고수: {{ a.report }}</span> -->
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    onerooms: Object,
  },
};
</script>

<style></style>
