<template>
  <div id="main-banner">
    <h1>Hambúrguer Delivery</h1>
  </div>
</template>

<script>
  export default {
    name: "Banner"
  }
</script>

<style scoped>
#main-banner {
  background-image: url("/public/img/burger.jpg");
  background-position: right bottom -200px;
  background-size: cover;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#main-banner h1 {
  color: #fff;
  text-align: center;
  font-size: 50px;
  background-color: #222;
  padding: 20px 40px;
}
@media (max-width: 1061px) {
  #main-banner {
    background-position: right bottom;
  }
}
</style>