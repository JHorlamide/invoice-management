import { ref } from "vue";

export function useHandleInvoice(invoiceFormObject) {
  const loading = ref(false);
  const data = ref(null);
  const error = ref(false);
  const errorMessage = ref("");

  async function createInvoice() {
    loading.value = true;
    data.value = null;
    error.value = false;

    try {
      console.log("NEW INVOICE CREATED: ", invoiceFormObject);

      data.value = data;
      loading.value = false;
    } catch (error) {
      error.value = true;
      errorMessage.value = error.message;
    }
  }

  return { loading, data, createInvoice };
}
