<template>
  <div class="search">
    <font-awesome-icon :icon="searchIcon" class="search__icon" />
    <input
      type="text"
      name="search"
      :placeholder="placeholder"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "SearchLine",
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
    }
  },
  data() {
    return {
      searchIcon: ["fas", "search"]
    }
  }
}
</script>

<style lang="scss">
.search {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  &__icon {
    color: $primary-color;
    margin-right: 5px;
  }
}
</style>
