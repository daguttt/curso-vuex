<template>
  <div id="app">
    <AppProductList />
    <AppEditProduct v-if="productSelected" />
    <br />
    <br />
    <AppShoppingCart />
  </div>
</template>

<script>
import AppProductList from "./components/AppProductList.vue";
import AppShoppingCart from "./components/AppShoppingCart.vue";
import AppEditProduct from "./components/AppEditProduct.vue";
export default {
  name: "app",
  components: {
    AppProductList,
    AppShoppingCart,
    AppEditProduct,
  },
  computed: {
    productSelected() {
      return this.$store.getters.productSelected;
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
