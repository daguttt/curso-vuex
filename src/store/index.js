import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    },
    decreaseProductInventory(state, idProduct) {
      const product = state.products.find(el => el.id === idProduct);
      product.inventory--;
    },
    addProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        amount: 1,
      })
    },
    incrementProductInCart(state, idProduct) {
      const product = state.cart.find(el => el.id === idProduct);
      product.amount++;
    },
  },
  actions: {
    getProducts(context) {
      return new Promise((resolve) => {
        api.getProducts((products) => {
          context.commit('setProducts', products)
          resolve()
        })
      })
    },
    addProductToCart(context, product) {
      // ¿Existe inventario del producto? 
      if (product.inventory < 0) return

      // ¿Está el producto en el carrito?
      const item = context.state.cart.find(el => el.id === product.id)

      // 👇 Si no está, se agrega
      !item ?
        context.commit('addProductToCart', product) :
        // Si está, se aumenta su cantidad
        context.commit('incrementProductInCart', product.id)

      // Restar cantidad de inventario del producto
      context.commit('decreaseProductInventory', product.id)
    }
  },
  getters: {
    productsOnStock: state => state.products.filter(product => product.inventory > 0)
  },
  modules: {}
});
