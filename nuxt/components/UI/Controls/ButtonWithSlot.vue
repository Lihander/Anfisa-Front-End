<template>
  <div v-click-outside="hideSlot" class="button-with-slot">
    <CollapseButton
      style="z-index: 1"
      :class="slotVisible ? 'hide-button' : ''"
      :btn-class="btnClass"
      :hide-class="hideClass"
      :value="slotVisible"
      :show-icon="showIcon"
      :hide-icon="hideIcon"
      @change="changeSlotVisible"
    />
    <div v-show="slotVisible" class="slot">
      <slot />
    </div>
  </div>
</template>

<script>
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"

export default {
  name: "ButtonWithSlot",
  components: { CollapseButton },
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
        return "btnDanger"
      }
    },
    showIcon: {
      type: Array,
      required: true
    },
    hideIcon: {
      type: Array,
      default: () => {
        return ["fas", "times"]
      }
    },
    show: {
      type: Boolean,
      default: () => {
        return false
      }
    }
  },
  data() {
    return {
      slotVisible: this.show
    }
  },
  watch: {
    show() {
      this.slotVisible = this.show
    },
    slotVisible() {
      this.$emit("changeSlotVisible", this.slotVisible)
    }
  },
  methods: {
    hideSlot() {
      this.slotVisible = false
    },
    changeSlotVisible() {
      this.slotVisible = !this.slotVisible
    }
  }
}
</script>

<style lang="scss">
.button-with-slot {
  position: relative;
  margin-top: 5px;
  z-index: 100;
  .btn {
    transition: none;
  }
  .hide-button {
    width: calc(100% + 10px);
    border-radius: 20px 0 0 20px !important;
    border-width: 5px !important;
    border-right: none !important;
  }
  .slot {
    position: absolute;
    top: 0;
    left: calc(100% + 5px);
  }
}
</style>
