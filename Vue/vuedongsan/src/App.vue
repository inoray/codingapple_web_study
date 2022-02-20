<template>
  <transition name="fade">
    <Modal @closeModal="modalState=false"
      :onerooms="onerooms" :selected="selected" :modalState="modalState" />
  </transition>

  <div class="menu">
    <a v-for="a in menu" :key="a"> {{ a }} </a>
  </div>

  <Discount />
  <button @click="sortPrice">가격순정렬</button>
  <button @click="sortTitle">가나다순정렬</button>
  <button @click="sortPriceInverse">가격역순정렬</button>
  <button @click="filterUnderPrice">50만원 이하 필터링</button>
  <button @click="backOriData">원래대로보여주기</button>
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
      oriOnerooms: data,
      onerooms: [...data],
    };
  },
  methods: {
    increase() {
      this.products[0].report++;
    },
    sortPrice() {
      this.onerooms.sort((a, b)=>{
        return a.price - b.price;
      })
    },
    sortTitle() {
      this.onerooms.sort((a,b) => {
        if(a.title < b.title)
          return -1;
        if (a.title > b.title)
          return 1;
        if (a.title === b.title)
          return 0;
      })
    },
    sortPriceInverse() {
      this.onerooms.sort((a,b) => {
        return b.price - a.price;
      });
    },
    filterUnderPrice() {
      this.onerooms = this.onerooms.filter(a => a.price <= 500000);
    },
    backOriData() {
      this.onerooms = [...this.oriOnerooms];
    }
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

.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}

</style>
