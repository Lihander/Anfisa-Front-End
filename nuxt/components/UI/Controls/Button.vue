<template>
  <button class="btn" :class="btnClass" v-bind="$attrs" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    btnClass: {
      type: String,
      default: () => {
        return "btnDefault"
      }
    }
  }
}
</script>

<style lang="scss"></style>
