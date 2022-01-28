<template>
  <div>
    <h1>Listado de productos</h1>
    <hr />
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.title }} | {{ product.price }}
        <i>{{ product.inventory }} </i>
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
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>

<style scoped>
ul {
  text-align: left;
}
</style>
