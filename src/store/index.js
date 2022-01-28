import Vue from "vue";
import Vuex from "vuex";
import api from "../api/shop.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [
      { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2 },
      { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10 },
      { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5 }
    ]
  },
  mutations: {
    setProducts(state, products) {
      state.products = products
    }
  },
  actions: {
    getProducts(context) {
      return new Promise((resolve) => {
        api.getProducts((products) => {
          context.commit('setProducts', products)
          resolve()
        })
      })
    }
  },
  getters: {
    productsOnStock: state => state.products.filter(product => product.inventory > 0)
  },
  modules: {}
});
