<template>
  <div>
    <h1>Listado de productos</h1>
    <hr />
    <ul>
      <li
        v-for="product in products"
        :key="product.id"
        @click="selectProduct(product)"
      >
        {{ product.title }} | {{ product.price }} |
        <i>{{ product.inventory }} </i>
        <button @click="addProductToCart(product)">Cart</button>
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
</style>
