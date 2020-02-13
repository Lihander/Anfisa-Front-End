<template>
  <AppButton :btn-class="getCollapseButtonClass" @click="$emit('change')">
    <font-awesome-icon :icon="getCollapseButtonIcon" />
  </AppButton>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "CollapseButton",
  components: { AppButton },
  props: {
    btnClass: {
      type: String,
      default: () => {
        return "btnDefault"
      }
    },
    hideClass: {
      type: String,
      default: () => {
        return ""
      }
    },
    value: {
      type: Boolean,
      required: true
    },
    showIcon: {
      type: Array,
      required: true
    },
    hideIcon: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    getCollapseButtonIcon() {
      if (this.hideIcon.length > 0) {
        return this.value ? this.hideIcon : this.showIcon
      } else {
        return this.showIcon
      }
    },
    getCollapseButtonClass() {
      if (this.hideClass) {
        return this.value ? this.hideClass : this.btnClass
      } else {
        return this.btnClass
      }
    }
  }
}
</script>

<style scoped></style>
