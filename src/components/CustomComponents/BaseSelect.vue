<template>
  <div>
    <label :for="labelForm">{{ label }}</label>
    <select v-bind="$attrs" :value="value" @input="update" required>
      <option
        v-for="(value, key, index) in options"
        :key="index"
        :value="value"
      >
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    label: String,
    labelForm: String,
    options: [Object, Array],
    value: String,
  },
  setup(props, { emit }) {
    function update(e) {
      emit('input', e.target.value);
    }

    return {
      update,
    };
  },
};
</script>

<style lang="scss" scoped></style>
