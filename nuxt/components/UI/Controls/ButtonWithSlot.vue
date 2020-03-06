<template>
  <div v-click-outside="hideSlot" class="button-with-slot">
    <CollapseButton
      style="z-index: 100"
      :class="slotVisible ? 'hide-button' : ''"
      :btn-class="btnClass"
      :hide-class="hideClass"
      :value="slotVisible"
      :show-icon="showIcon"
      :hide-icon="hideIcon"
      @change="slotVisible = !slotVisible"
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
    }
  },
  data() {
    return {
      slotVisible: false
    }
  },
  methods: {
    hideSlot() {
      this.slotVisible = false
    }
  }
}
</script>

<style lang="scss">
.button-with-slot {
  position: relative;
  margin-top: 5px;
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
    z-index: 99;
  }
}
</style>
