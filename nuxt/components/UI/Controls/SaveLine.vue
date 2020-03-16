<template>
  <div class="save-line" :class="inputClass">
    <input
      type="text"
      name="search"
      :readonly="disabled"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
    <AppButton
      class="save-button"
      btn-class="btnSuccess"
      :disabled="disabled"
      @click="$emit('save')"
    >
      <font-awesome-icon :icon="['fas', 'save']" />
      <span>Save</span>
    </AppButton>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "SaveLine",
  components: { AppButton },
  props: {
    value: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default() {
        return "Search"
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    inputClass: {
      type: String,
      default() {
        return "defaultInput"
      }
    }
  }
}
</script>

<style lang="scss">
.save-line {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .save-button {
    width: 30%;
    margin-left: 0;
    border-top: none;
    border-radius: 0 !important;
    &:hover {
      border: 1px solid $default-color;
      border-top: none;
      border-left: 1px solid $success-color;
    }
  }
  input[type="text"] {
    border: none;
  }
}
</style>
