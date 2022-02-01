<template>
  <div>
    <h1>Carrito de compras</h1>
    <hr />
    <ul>
      <li v-for="(item, $index) in cartItems" :key="item.id">
        {{ item.title }} ({{ item.amount }})
        <button @click="decreaseItemFromCart($index)">-</button>
        <button @click="removeItemFromCart($index)">X</button>
      </li>
    </ul>
    <h4>Total: {{ cartTotalPrice }}</h4>
  </div>
</template>

<script>
import { currency } from "@/helpers/currency.js";
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
    cartTotalPrice() {
      return currency(this.$store.getters.cartTotalPrice);
    },
  },
};
</script>

<style scoped>
ul {
  text-align: left;
}
h4 {
  padding-left: 2rem;
  text-align: left;
}
</style>