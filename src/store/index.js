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
    decreaseProductInventory(state, item) {
      const productToDecreaseInventory = state.products.find(el => el.id === item.id);
      productToDecreaseInventory.inventory--;
    },
    addProductToCart(state, product) {
      state.cart.push({
        id: product.id,
        amount: 1,
      })
    },
    incrementProductInCart(state, item) {
      const productToIncrement = state.cart.find(el => el.id === item.id);
      productToIncrement.amount++;
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
      if (product.inventory === 0) return

      // ¿Está el producto en el carrito?
      const item = context.state.cart.find(el => el.id === product.id)

      // 👇 Si no está, se agrega
      !item ?
        context.commit('addProductToCart', product) :
        // Si está, se aumenta su cantidad
        context.commit('incrementProductInCart', item)

      // Restar cantidad de inventario del producto
      context.commit('decreaseProductInventory', product)
    }
  },
  getters: {
    productsOnStock: state => state.products.filter(product => product.inventory > 0),
    productsInCart: state => {
      // Construir un arrary con base en los productos del carrito
      return state.cart.map(item => {
        // Es necesario buscar cada item del carrito en el array
        // de todos los productos para poder extraer el 'title' y el 'price'
        const currentProduct = state.products.find(el => el.id === item.id)
        return {
          title: currentProduct.title,
          price: currentProduct.price,
          amount: item.amount
        }
      })
    }
  },
  modules: {}
});
