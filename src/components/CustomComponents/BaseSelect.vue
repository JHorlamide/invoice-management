<template>
  <div>
    <label :for="labelFor">{{ label }}</label>
    <select
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    >
      <slot />
      <option
        v-for="(value, key, index) in options"
        :key="index"
        :value="value"
      >
        {{ key }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: "BaseSelect",
  inheritAttrs: false,
  props: {
    label: String,
    labelFor: String,
    options: [Object, Array],
    modelValue: String,
  },
};
</script>