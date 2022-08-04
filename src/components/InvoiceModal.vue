<template>
  <div
    @click="checkClick"
    ref="invoiceWrap"
    class="invoice-wrapper flex flex-column"
  >
    <form @submit.prevent="submitInvoice" class="invoice-form">
      <h1>New Invoice</h1>

      <!-- BILL FROM -->
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <BaseInput
            class="input"
            type="text"
            :id="billerStreetAddress"
            label="Street Address"
            v-model="billerStreetAddress"
            :labelFor="billerStreetAddress"
            required
          />
        </div>

        <!-- LOCATION DETAIL -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="billerCity"
              label="City"
              v-model="billerCity"
              :labelFor="billerCity"
              required
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="billerZipCode"
              label="Zip Code"
              v-model="billerZipCode"
              :labelFor="billerZipCode"
              required
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="billerCountry"
              label="Country"
              v-model="billerCountry"
              :labelFor="billerCountry"
              required
            />
          </div>
        </div>
      </div>

      <!-- BILL TO -->
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>

        <div class="input flex flex-column">
          <BaseInput
            class="input"
            type="text"
            :id="clientName"
            label="Client's Name"
            v-model="clientName"
            :labelFor="clientName"
            required
          />
        </div>

        <div class="input flex flex-column">
          <BaseInput
            class="input"
            type="text"
            :id="clientEmail"
            label="Client's Email"
            v-model="clientEmail"
            :labelFor="clientEmail"
            required
          />
        </div>

        <div class="input flex flex-column">
          <BaseInput
            class="input"
            type="text"
            :id="clientStreetAddress"
            label="Client's Street Address"
            v-model="clientStreetAddress"
            :labelFor="clientStreetAddress"
            required
          />
        </div>

        <!-- LOCATION DETAIL -->
        <div class="location-details flex">
          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="clientCity"
              label="Client's City"
              v-model="clientCity"
              :labelFor="clientCity"
              required
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="clientZipCode"
              label="Client's Zip Code"
              v-model="clientZipCode"
              :labelFor="clientZipCode"
              required
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="clientCountry"
              label="Client's Country"
              v-model="clientCountry"
              :labelFor="clientCountry"
              required
            />
          </div>
        </div>
      </div>

      <!-- INVOICE WORK DETAILS -->
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="invoiceDate"
              label="Invoice Date"
              v-model="invoiceDate"
              :value="invoiceDate"
              :labelFor="invoiceDate"
              disabled
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              class="input"
              type="text"
              :id="paymentDueDate"
              label="Payment Due Date"
              :value="paymentDueDate"
              v-model="paymentDueDate"
              :labelFor="paymentDueDate"
              disabled
            />
          </div>
        </div>

        <div class="input flex flex-column">
          <BaseSelect
            class="input"
            :labelFor="paymentTerms"
            label="Payment Terms"
            :id="paymentTerms"
            v-model="paymentTerms"
            :options="paymentOptions"
          >
            <option value="" selected>e.g Next 10 days</option>
          </BaseSelect>
        </div>

        <div class="input flex flex-column">
          <BaseInput
            class="input"
            type="text"
            :id="productDescription"
            label="Product Description"
            v-model="productDescription"
            :labelFor="productDescription"
            disabled
          />
        </div>

        <!-- WORK ITEMS -->
        <div class="work-items">
          <h3>Item List</h3>

          <table class="item-list">
            <!-- TABLE HEADING -->
            <tr class="table-heading">
              <th class="item-name">Item Name</th>
              <th class="qty">Quantity</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>

            <!-- TABLE DATA -->
            <tr
              class="table-items"
              v-for="(
                { itemName, qty, price, total, id }, index
              ) in invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <BaseInput
                  class="input"
                  type="text"
                  label="Item Name"
                  :labelFor="itemName"
                  :v-model="itemName"
                />
              </td>

              <td class="qty">
                <BaseInput
                  class="input"
                  type="number"
                  label="Item Quantity"
                  :labelFor="qty"
                  :v-model="qty"
                />
              </td>

              <td class="price">
                <BaseInput
                  class="input"
                  type="text"
                  label="Item Price"
                  :labelFor="price"
                  :v-model="price"
                />
              </td>

              <td class="total flex">₦{{ (total = qty * price) }}</td>

              <img
                @click="deleteInvoiceItem(id)"
                src="@/assets/images/icon-delete.svg"
                alt="delete-icon"
              />
            </tr>
          </table>

          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/images/icon-plus.svg " alt="add-item-icon" />
            Add New Item
          </div>
        </div>
      </div>

      <!-- SAVE/EXIT BUTTON -->
      <div class="save flex">
        <div class="left">
          <BaseButton @click="cancelInvoice" class="red">Cancel</BaseButton>
        </div>

        <div class="right flex">
          <BaseButton @click="saveDraft" class="dark-purple">
            Save Draft
          </BaseButton>

          <BaseButton @click="publishInvoice" class="purple">
            Create Invoice
          </BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { reactive, ref, toRefs } from "@vue/reactivity";
import BaseInput from "./CustomComponents/BaseInput.vue";
import BaseSelect from "./CustomComponents/BaseSelect.vue";
import BaseButton from "./CustomComponents/BaseButton.vue";
import { watch } from "@vue/runtime-core";
// import uid from 'uid'

export default {
  name: "InvoiceModal",
  components: {
    BaseInput,
    BaseSelect,
    BaseButton,
  },
  setup() {
    const store = useStore();
    const paymentDueDateUnix = ref("");
    const loading = ref("");
    const docId = ref("");
    const invoiceDraft = ref("");
    const invoicePending = ref("");
    const invoiceTotal = ref(0);
    const paymentTerms = ref("20");
    const invoiceItemList = ref([]);
    const invoiceDateUnix = ref(new Date());
    const paymentOptions = reactive({
      thirtyDays: "Next 30 Days",
      sixtyDays: "Next 60 Days",
    });

    const dateOptions = reactive({
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const dateFormat = ref(
      new Date(invoiceDateUnix.value).toLocaleDateString("en-us", {
        ...dateOptions,
      })
    );
    const invoiceDate = ref(dateFormat.value);

    const formData = reactive({
      billerStreetAddress: "",
      billerCity: "",
      billerZipCode: "",
      billerCountry: "",
      clientName: "",
      clientEmail: "",
      clientStreetAddress: "",
      clientCity: "",
      clientZipCode: "",
      clientCountry: "",
      paymentDueDate: "",
      productDescription: "",
    });

    function cancelInvoice() {
      store.commit("toggleInvoiceModal");
    }

    function saveDraft() {}

    function publishInvoice() {}

    watch(paymentTerms, (newVal, oldVal) => {
      console.log(newVal, oldVal);
    });

    // watch(
    //   () => formData.paymentTerms,
    //   (paymentTerms) => {
    //     const futureDate = new Date();

    //     paymentDueDateUnix.value = futureDate.setDate(
    //       futureDate.getDate() + parseInt(paymentTerms)
    //     );

    //     formData.paymentDueDate = new Date(
    //       paymentDueDateUnix
    //     ).toLocaleDateString("en-us", {
    //       ...dateOptions,
    //     });
    //   },
    //   { deep: true }
    // );

    return {
      docId,
      loading,
      saveDraft,
      invoiceDraft,
      invoiceItemList,
      cancelInvoice,
      invoiceDateUnix,
      invoiceDate,
      paymentTerms,
      invoicePending,
      paymentOptions,
      invoiceTotal,
      publishInvoice,
      paymentDueDateUnix,
      ...toRefs(formData),
    };
  },
};
</script>
