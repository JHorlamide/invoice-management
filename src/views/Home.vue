<template>
    <div class="home container">
        <!-- HEADER -->
        <div class="header flex">
            <!-- LEFT -->
            <div class="left flex flex-column">
                <h1>Invoices</h1>
                <span>There are 4 total invoices</span>
            </div>

            <!-- RIGHT -->
            <div class="right flex">
                <div @click="toggleFilterMenu" class="filter flex">
                    <span>Filter by status</span>
                    <img src="@/assets/images/icon-arrow-down.svg" alt="toggle-filter-icon">
                    <ul v-show="showFilterMenu" class="filter-menu">
                        <li>Draft</li>
                        <li>Pending</li>
                        <li>Paid</li>
                        <li>Clear Filter</li>
                    </ul>
                </div>

                <!-- BUTTON -->
                <div @click="newInvoice" class="button flex">
                    <div class="inner-button flex">
                        <img src="@/assets/images/icon-plus.svg" alt="" />
                    </div>
                    <span>New Invoice</span>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
import { ref } from '@vue/reactivity';

export default {
    name: "HomeComponent",
    components: {},
    setup() {
        const showFilterMenu = ref(true);
        const showInvoiceModal = ref(true);

        function toggleFilterMenu() {
            showFilterMenu.value = !showFilterMenu.value;
        }

        function newInvoice() {

        }

        return {
            showFilterMenu,
            showInvoiceModal,
            toggleFilterMenu,
            newInvoice
        }
    }
}
</script>