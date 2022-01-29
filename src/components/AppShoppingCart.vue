<template>
  <div>
    <h1>Carrito de compras</h1>
    <ul>
      <li v-for="(item, $index) in cartItems" :key="item.id">
        {{ item.title }} ({{ item.amount }})
        <button @click="decreaseItemFromCart($index)">-</button>
        <button @click="removeItemFromCart($index)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppShoppingCart",
  methods: {
    decreaseItemFromCart(indexItem) {
      this.$store.dispatch("decreaseProductInCart", indexItem);
    },
    removeItemFromCart(indexItem) {
      this.$store.dispatch("removeProductFromCart", indexItem);
    },
  },
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