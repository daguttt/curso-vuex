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
    <div class="checkout">
      <h4>Total: {{ cartTotalPrice }}</h4>
      <button v-if="cartItems.length" @click="checkout">Comprar</button>
      <p v-if="$store.state.checkoutError">
        Ocurrió un error al hacer la compra
      </p>
    </div>
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
    checkout() {
      this.$store.dispatch("checkout");
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
.checkout {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.checkout button {
  padding: 0.75rem 1rem;
}
</style>