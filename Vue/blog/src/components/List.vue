<template>
  <div>
    <h5>{{a.title}}</h5>
    <p>{{a.date}}</p>
  </div>
</template>

<script>
export default {
  name: 'ListList',
  props: {
    a: Object,
  }
}
</script>

<style>

</style>