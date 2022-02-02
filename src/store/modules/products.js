import Vue from 'vue';
import shop from '../../api/shop';
export default {
    state: () => ({
        products: [],
    }),
    mutations: {
        setProductsInventory(state, products) {
            state.products = products
        },
        restoreProductInventory(state, product) {
            let productToIncrement = state.products.find(el => el.id === product.id)
            productToIncrement.inventory += product.amount
        },
        incrementProductInventory(state, product) {
            const productToIncrement = state.products.find(el => el.id === product.id)
            productToIncrement.inventory++
        },
        decreaseProductInventory(state, product) {
            const productToDecreaseInventory = state.products.find(el => el.id === product.id);
            productToDecreaseInventory.inventory--;
        },
        editProduct(state, dataToUpdate) {
            // Indice del producto seleccionado en el array de productos
            // -*************************************************************************-
            // -*************************************************************************-
            // ! Es necesario this para acceder al GLOBAL STATE
            // Fuente: https://qastack.mx/programming/41366388/vuex-access-state-from-another-module
            const indexProduct = state.products.findIndex(product => product.id === this.state.productSelected.id)
            // -*************************************************************************-
            // -*************************************************************************-

            // Actualizar el producto (Se crea un nuevo obj)
            // - Tutorial way
            // const productUpdated = Object.assign({}, state.products[indexProduct], dataToUpdate)
            // - My way
            const productUpdated = { ...state.products[indexProduct], title: dataToUpdate.title }

            // Actualizar activando la reactividad
            Vue.set(state.products, indexProduct, productUpdated)
        },
    },
    actions: {
        getProducts(context) {
            return new Promise((resolve) => {
                shop.getProducts((products) => {
                    context.commit('setProductsInventory', products)
                    resolve()
                })
            })
        },
    },
    getters: {
        productsOnStock: state => state.products.filter(product => product.inventory > 0),
        productNearlySoldOut: state => id => {
            const product = state.products.find(prod => prod.id === id)
            return product.inventory < 2;
        },
    },
}