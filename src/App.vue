<template>
  <div>
    <div v-if="!isMobileView" class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <transition name="invoice">
          <InvoiceModal v-if="showInvoiceModal" />
        </transition>

        <router-view />
      </div>
    </div>

    <div v-else class="mobile-message flex flex-column">
      <h2>Sorry, this app is not supported on mobile devices</h2>
      <p>To use this app, please use a computer or Tablet</p>
    </div>
  </div>
</template>

<script>
/* CUSTOM COMPONENT */
import Navigation from "@/components/Navigation.vue";
import InvoiceModal from "./components/InvoiceModal.vue";

import { useStore } from "vuex";
import { ref, computed } from "vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: {
    Navigation,
    InvoiceModal,
  },

  setup() {
    const isMobileView = ref(null);
    const store = useStore();

    const welcomeMessage = computed(() => store.state.message);
    const showInvoiceModal = computed(() => store.state.invoiceModal);

    onMounted(() => {
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);
    });

    const checkScreenSize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth <= 750) {
        isMobileView.value = true;
        return;
      }

      isMobileView.value = false;
    };

    return {
      checkScreenSize,
      isMobileView,
      showInvoiceModal,
      welcomeMessage,
    };
  },
};
</script>

<style lang="scss">
@import "./assets/scss/app.scss";
</style>
