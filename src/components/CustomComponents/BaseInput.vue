<template>
    <label :for="labelFor">{{ label }}</label>
    <input v-bind="$attrs" :value="value" @input="updateValue" />
</template>

<script>
export default {
    name: "InvoiceModal",
    inheritAttrs: false,
    props: {
        value: [String, Number],
        label: String,
        labelFor: String
    },

    setup(props, { emit }) {
        function updateValue(e) {
            emit("input", e.target.value)
        }

        return {
            updateValue
        }
    }
}
</script>
