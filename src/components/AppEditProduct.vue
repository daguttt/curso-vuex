<template>
  <div>
    <input
      type="text"
      placeholder="Selecciona un producto para actualizar"
      v-model="title"
    />
  </div>
</template>

<script>
export default {
  name: "AppEditProduct",
  computed: {
    title: {
      get() {
        return this.$store.getters.productSelected.title;
      },
      set(title) {
        this.$store.commit("editProduct", { title });
      },
    },
  },
};
</script>

<style scoped>
input {
  width: 30vw;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid lightgray;
}
</style>