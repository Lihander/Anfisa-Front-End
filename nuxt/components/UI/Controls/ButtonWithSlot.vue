<template>
  <div class="button-with-slot__wrapper">
    <AppButton
      class="button-focus"
      :btn-class="btnClass"
      @click="$emit('change')"
      @focus="slotVisible = true"
      @blur="hideSlot"
    >
      <font-awesome-icon :icon="icon" />
    </AppButton>
    <div v-show="slotVisible" class="slot__wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "ButtonWithSlot",
  components: { AppButton },
  props: {
    btnClass: {
      type: String,
      default: () => {
        return "btnDefault"
      }
    },
    icon: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      slotVisible: false
    }
  },
  methods: {
    hideSlot() {
      setTimeout(() => {
        this.slotVisible = false
      }, 200)
    }
  }
}
</script>

<style lang="scss">
.button-with-slot__wrapper {
  position: relative;
}
.slot__wrapper {
  position: absolute;
  top: -5px;
  right: -70px;
}
.button-focus {
  &:focus {
    color: $default-color;
    background-color: $primary-color;
    border: 1px solid $default-color;
  }
}
</style>
