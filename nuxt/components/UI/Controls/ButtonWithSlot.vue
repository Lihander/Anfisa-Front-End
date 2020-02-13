<template>
  <div class="button-with-slot__wrapper">
    <AppButton
      class="slot__btn"
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
</style>
