<template>
  <div >
    <img class="room-img" :src="oneroom.image" />
    <h4 @click="$emit('openModal', oneroom.id)"> {{ oneroom.title }} </h4>
    <p>{{ oneroom.price }} 원</p>
    <!-- <button @click="increase">신고하기</button>
    <span>신고수: {{ oneroom.report }}</span> -->
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    oneroom: Object,
  },
};
</script>

<style></style>
