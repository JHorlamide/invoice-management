<template>
    <button v-bind="$attrs">
        <slot />
    </button>
</template>

<script>
export default {
    name: "BaseButton"
}
</script>