import { createStore } from "vuex";

export default createStore({
  state: {
    invoiceModal: false,
    message: "Welcome to vuex store"
  },
  getters: {
    getInvoiceModal(state) {
      return state.invoiceModal;
    },
  },
  mutations: {
    toggleInvoiceModal(state) {
      state.invoiceModal = !state.invoiceModal;
    },
  },
  actions: {
    toggleInvoiceModal(context) {
      context.commit("toggleInvoiceModal");
    },
  },
  modules: {},
});
