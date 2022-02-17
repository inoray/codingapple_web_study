<template>
  <div class="black-bg" v-if="modalState" @click="modalState = false">
    <div class="white-bg">
      <img class="room-img" :src="onerooms[selected].image" />
      <h4>{{ onerooms[selected].title }}</h4>
      <p>{{ onerooms[selected].price }} 만원</p>
      <p>{{ onerooms[selected].content }}</p>
    </div>
  </div>

  <div class="menu">
    <a v-for="a in menu" :key="a"> {{ a }} </a>
  </div>

  <div v-for="(a, i) in onerooms" :key="i">
    <img class="room-img" :src="a.image" />
    <h4
      @click="
        modalState = true;
        selected = i;
      "
    >
      {{ a.title }}
    </h4>
    <p>{{ a.price }} 만원</p>
    <!-- <button @click="increase">신고하기</button>
    <span>신고수: {{ a.report }}</span> -->
  </div>
</template>

<script>
import data from "./assets/oneroom.js";

export default {
  name: "App",
  data() {
    return {
      modalState: false,
      selected: 0,
      menu: ["Home", "Products", "About"],
      products: [
        { title: "역삼동원룸", price: 50, report: 0 },
        { title: "천호동원룸", price: 60, report: 0 },
        { title: "마포구원룸", price: 70, report: 0 },
      ],
      onerooms: data,
    };
  },
  methods: {
    increase() {
      this.products[0].report++;
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.menu {
  background: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}
.menu a {
  color: white;
  padding: 10px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}

body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}
</style>
