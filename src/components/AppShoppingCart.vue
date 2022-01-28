<template>
  <div>
    <h1>Carrito de compras</h1>
    <ul>
      <li v-for="item in cartItems" :key="item.id">
        {{ item.title }} ({{ item.amount }})
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppShoppingCart",
  computed: {
    cartItems() {
      return this.$store.getters.productsInCart;
    },
  },
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>