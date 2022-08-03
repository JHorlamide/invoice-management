<template>
  <div>
    <div v-if="!isMobileView" class="app flex flex-column">
      <Navigation />
      <div class="app-content flex flex-column">
        <InvoiceModal />
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
import Navigation from '@/components/Navigation.vue';
import InvoiceModal from './components/InvoiceModal.vue';

import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
export default {
  components: {
    Navigation,
    InvoiceModal
  },

  setup() {
    const isMobileView = ref(null);

    onMounted(() => {
      checkScreenSize();
      window.addEventListener('resize', checkScreenSize);
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
    };
  },
};
</script>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
