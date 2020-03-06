<template>
  <multiselect
    v-model="selected"
    :options="items"
    :placeholder="placeholder"
    v-bind="$attrs"
  >
    <template slot="selection" slot-scope="{ values, search, isOpen }">
      <span v-if="values.length &amp;&amp; !isOpen" class="multiselect__single">
        {{ values.length }} options selected
      </span>
    </template>
  </multiselect>
</template>

<script>
import Multiselect from "vue-multiselect"
export default {
  name: "AppMultiselect",
  components: { Multiselect },
  props: {
    placeholder: {
      type: String,
      required: false,
      default() {
        return "Select"
      }
    },
    items: {
      type: Array,
      required: true
    },
    selectedValues: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selected: this.selectedValues
    }
  },
  watch: {
    "$route.query.ws"() {
      this.selected = []
    },
    selected(values) {
      this.$emit("onChange", values)
    }
  }
}
</script>

<style lang="scss">
.multiselect__content-wrapper {
  overflow-x: auto;
  overflow-y: auto;
  scrollbar-face-color: $accent-color; /* Firefox 63 compatibility */
  scrollbar-track-color: $accent-color; /* Firefox 63 compatibility */
  scrollbar-color: $accent-color;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: $border-lighter;
  }
  &::-webkit-scrollbar-thumb {
    background-color: $accent-color;
    outline: 1px solid $accent-color;
  }
  .multiselect__content {
    padding-left: 0;
  }
}
</style>
