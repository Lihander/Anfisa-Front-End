<template>
  <div class="switch">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="switch__item"
      :class="{'switch__item__active': item.isActive, 'not_active': !item.isActive}"
      @click="toggle(item)"
    >
      <font-awesome-icon v-if="item.icon" :icon="item.icon"/>
      {{item.name}}
    </div>
  </div>
</template>

<script>
  export default {
    name: "DefaultSwitcher",
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    methods: {
      toggle(item) {
        this.$emit('selected', item)
      }
    }
  }
</script>

<style lang="scss">
  .switch {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $default-color;
    color: $primary-color;
    border-radius: 5px;
    &__item {
      height: 100%;
      flex: 1 1 0;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-align: center;
      padding: 0 10px;
      border: 1px solid $default-color;
      transition: .5s ease all;
      &:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      &:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
      }
      &__active {
        border-radius: 5px;
        color: $default-color;
        background-color: $primary-color;
      }
    }
  }

  .not_active {
    &:hover {
      opacity: .6;
    }
  }
</style>
