<template>
  <label :for="labelFor">{{ label }}</label>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  name: "InvoiceModal",
  // inheritAttrs: false,
  props: {
    modelValue: [String, Number],
    label: String,
    labelFor: String,
  },
};
</script>
