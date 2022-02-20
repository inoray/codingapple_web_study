<template>
  <div class="discount">
    <h4>지금 결제하면 {{discount}}% 할인</h4>
  </div>
</template>

<script>
export default {
  name: "Discount",
  data() {
    return {
      discount: 20,
    }
  },
  mounted() {
    let timerId = setInterval(()=>{
      if (this.discount == 1){
        clearInterval(timerId);
      }
      this.discount--;
    }, 1000);
  },
};
</script>

<style>
.discount {
  background: #eee;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
