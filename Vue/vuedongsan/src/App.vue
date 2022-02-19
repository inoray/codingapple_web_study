<template>
  <Modal @closeModal="modalState=false"
    :onerooms="onerooms" :selected="selected" :modalState="modalState" />

  <div class="menu">
    <a v-for="a in menu" :key="a"> {{ a }} </a>
  </div>

  <Discount />
  <Card @openModal="modalState=true; selected=$event"
    :oneroom="a" v-for="(a,i) in onerooms" :key="i"/>
</template>

<script>
import data from "./assets/oneroom.js";
import Discount from "./Discount.vue";
import Modal from "./Modal.vue";
import Card from "./Card.vue";

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
  components: {
    Discount: Discount,
    Modal: Modal,
    Card: Card,
  },
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
