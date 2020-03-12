<template>
  <div class="base-checkbox">
    <input
      :id="id"
      type="checkbox"
      :checked="checked"
      :disabled="disabled"
      @change="$emit('change', $event.target.checked)"
    />
    <label :for="id">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
  </div>
</template>

<script>
export default {
  name: "BaseCheckbox",
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    checked: Boolean,
    label: {
      type: String,
      default() {
        return ""
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      id: null
    }
  },
  mounted() {
    this.id = this._uid
  }
}
</script>

<style lang="scss">
.base-checkbox {
  position: relative;
  line-height: 24px;
  font-size: 16px;
  box-sizing: border-box;
  color: $neutral-placeholder;
  text-align: left;
  input[type="checkbox"] {
    display: none;
  }
  label {
    display: inline-block;
    cursor: pointer;
    padding-left: 22px;
  }
  label::before,
  label::after {
    position: absolute;
    content: "";
    display: inline-block;
  }
  label::before {
    height: 18px;
    width: 18px;
    border: 1px solid $neutral-placeholder;
    border-radius: 5px;
    left: 0;
    top: 3px;
    transition: all 0.3s ease;
  }
  label::after {
    height: 8px;
    width: 10px;
    border-left: 2px solid $primary-color;
    border-bottom: 2px solid $primary-color;

    transform: rotate(-45deg);
    left: 4px;
    top: 6px;
  }
  input[type="checkbox"] + label::after {
    content: none;
  }
  input[type="checkbox"]:checked + label {
    color: $secondary-color;
  }
  input[type="checkbox"]:checked + label::before {
    border-color: $primary-color;
    background-color: $primary-color;
  }
  input[type="checkbox"]:checked + label::after {
    border-color: $default-color;
    content: "";
  }
}
</style>
