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
            type="text"
            :id="billerStreetAddress"
            label="Street Address"
            v-model="billerStreetAddress"
            :labelFor="billerStreetAddress"
            required
          />
        </div>

        <!-- LOCATION DETAIL -->
        <div class="location-detail flex">
          <div class="input flex flex-column">
            <BaseInput
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
            type="text"
            :id="clientStreetAddress"
            label="Client's Street Address"
            v-model="clientStreetAddress"
            :labelFor="clientStreetAddress"
            required
          />
        </div>

        <!-- LOCATION DETAIL -->
        <div class="location-detail flex">
          <div class="input flex flex-column">
            <BaseInput
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
        <!-- -- PAYMENT -- -->
        <div class="payment flex">
          <div class="input flex flex-column">
            <BaseInput
              type="text"
              :id="invoiceDate"
              label="Invoice Date"
              v-model="invoiceDate"
              :labelFor="invoiceDate"
              disabled
            />
          </div>

          <div class="input flex flex-column">
            <BaseInput
              type="text"
              :id="paymentDueDate"
              label="Payment Due Date"
              v-model="paymentDueDate"
              :labelFor="paymentDueDate"
              disabled
            />
          </div>
        </div>

        <!-- -- PAYMENT TERMS -- -->
        <div class="input flex flex-column">
          <BaseSelect
            :labelForm="paymentTerms"
            label="Payment Terms"
            :id="paymentTerms"
            v-model="paymentTerms"
            :options="paymentTermsOptions"
          />
        </div>

        <div class="input flex flex-column">
          <BaseInput
            type="text"
            :id="productDescription"
            label="Product Description"
            v-model="productDescription"
            :labelFor="productDescription"
            disabled
          />
        </div>

        <!-- --- WORK ITEMS --- -->
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading">
              <th class="item-name">Item Name</th>
              <th class="qty">Quantity</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr
              class="table-items"
              v-for="(item, index) in invoiceItemList"
              :key="index"
            >
              <td class="item-name">
                <BaseInput
                  type="text"
                  label="Item Name"
                  :labelFor="item.itemName"
                  :v-model="item.itemName"
                />
              </td>
              <td class="qty">
                <BaseInput
                  type="number"
                  label="Item Quantity"
                  :labelFor="item.qty"
                  :v-model="item.qty"
                />
              </td>
              <td class="price">
                <BaseInput
                  type="text"
                  label="Item Price"
                  :labelFor="item.price"
                  :v-model="item.price"
                />
              </td>
              <td class="total flex">
                ${{ (item.total = item.qty * item.price) }}
              </td>
            </tr>
            <img
              @click="deleteInvoiceItem(item.id)"
              src="@/assets/images/icon-delete.svg"
              alt="delete-icon"
            />
          </table>
          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/images/icon-plus.svg " alt="add-item-icon" />
            Add New Item
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity';
import BaseInput from './CustomComponents/BaseInput.vue';
import BaseSelect from './CustomComponents/BaseSelect.vue';
// import uid from 'uid'

export default {
  name: 'InvoiceModal',
  components: {
    BaseInput,
    BaseSelect,
  },
  set() {
    const paymentTermsOptions = ref({
      thirtyDays: 'Next 30 Days',
      sixtyDays: 'Next 60 Days',
    });

    const invoiceItemList = ref([]);

    const formData = reactive({
      dateOptions: { year: 'numeric', month: 'short', day: 'numeric' },
      docId: null,
      loading: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceTotal: 0,
    });

    return {
      paymentTermsOptions,
      invoiceItemList,
      ...toRefs(formData),
    };
  },
};
</script>
