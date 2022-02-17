<template>
  <div class="menu">
    <a v-for="a in menu" :key="a"> {{ a }} </a>
  </div>

  <div v-for="(a, i) in products" :key="i">
    <img class="room-img" src="./assets/room0.jpg" />
    <h4>{{ a.name }}</h4>
    <p>{{ a.price }} 만원</p>
    <button @click="increase">신고하기</button>
    <span>신고수: {{ a.report }}</span>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: ["Home", "Products", "About"],
      products: [
        { name: "역삼동원룸", price: 50, report: 0 },
        { name: "천호동원룸", price: 60, report: 0 },
        { name: "마포구원룸", price: 70, report: 0 },
      ],
      // products: ["역삼동원룸", "천호동원룸", "마포구원룸"],
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
</style>
