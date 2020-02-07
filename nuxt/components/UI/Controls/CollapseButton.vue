<template>
  <AppButton :btn-class="btnClass" @click="$emit('change')">
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
    }
  }
}
</script>

<style scoped></style>
