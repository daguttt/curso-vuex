import Vue from "vue";
import Vuex from "vuex";
import shop from "../api/shop.js";
import cart from "./modules/cart.js";
import products from "./modules/products.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  modules: {
    cart,
    products,
  },
  state: {
    checkoutError: false,
    productSelected: {},
  },
  mutations: {
    // Products (Invetory) Mutations 
    // It's now a module
    // -**********************************-

    // Product selected Mutations
    setProductSelected(state, product) {
      state.productSelected = product;
    },
    // -**********************************-

    // Cart Mutations
    // It's now a module

    // -**********************************-

    // Checkout Error Mutations
    setCheckoutError(state, error) {
      state.checkoutError = error
    }
  },
  actions: {
    checkout({ commit, state }) {
      shop.buyProducts(state.cart.cart, () => {
        // Vaciar carrito
        commit('emptyCart')
        // Establecer que no hubo error
        commit('setCheckoutError', false)
      }, () => {
        // Establecer que ocurrió un error
        commit('setCheckoutError', true)
      })
    }
  },
  getters: {
    productSelected: state => {
      // Si hay un producto seleccionado, se retorna, si no se retorna false
      return Object.values(state.productSelected).length
        ? state.productSelected
        : false
    },
  },
});
