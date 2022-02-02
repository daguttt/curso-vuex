<template>
  <div>
    <h1>Listado de productos</h1>
    <hr />
    <ul>
      <li
        :class="{ 'sold-out': $store.getters.productNearlySoldOut(product.id) }"
        v-for="product in products"
        :key="product.id"
        @click="selectProduct(product)"
      >
        {{ product.title }} | {{ product.price }} |
        <i>{{ product.inventory }} </i>
        <button @click.stop="addProductToCart(product)">Cart</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "AppProductList",
  async created() {
    await this.$store.dispatch("getProducts");
  },
  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
    selectProduct(product) {
      this.$store.commit("setProductSelected", product);
    },
  },
  computed: {
    products() {
      return this.$store.getters.productsOnStock;
    },
  },
};
</script>

<style scoped>
ul {
  text-align: left;
}
.sold-out {
  background-color: lightpink;
  color: tomato;
  padding: 0.25rem;
  margin: 0.3rem;
}
</style>
