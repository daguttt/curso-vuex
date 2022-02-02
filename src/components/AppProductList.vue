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
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "AppProductList",
  async created() {
    await this.$store.dispatch("getProducts");
  },

  // -**********************************-

  // Métodos
  // methods: {
  //   addProductToCart(product) {
  //     this.$store.dispatch("addProductToCart", product);
  //   },
  //   selectProduct(product) {
  //     this.$store.commit("setProductSelected", product);
  //   },
  // },
  methods: {
    ...mapActions(["addProductToCart"]),
    ...mapMutations({
      selectProduct: "setProductSelected",
    }),
  },

  // -**********************************-

  // Propiedades computadas
  // computed: {
  //   products() {
  //     return this.$store.getters.productsOnStock;
  //   },
  // },

  // !-*************************************************************************-
  // ! SINTAXIS MAP HELPERS
  // !-*************************************************************************-

  // * Si NO difieren los nombres usados
  // computed: mapGetters(["productsOnStock"]),
  // * Si difieren los nombres usados
  // computed: mapGetters({
  //     products: "productsOnStock"
  //   })
  // * Si se usan además propiedades o métodos propios del componente
  computed: {
    ...mapGetters({
      products: "productsOnStock",
    }),
    testing: () => null,
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
