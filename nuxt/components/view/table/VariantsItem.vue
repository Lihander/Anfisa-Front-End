<template>
  <div class="variant-item">
    <div class="variant-item__type" :style="getTypeIcon(item.type)"></div>
    <div class="variant-item__name">
      <span v-html="item.name"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "VariantsItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTypeIcon(color) {
      return "background-color: " + color + ";"
    }
  }
}
</script>

<style lang="scss">
.variant-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__type {
    width: 15px;
    height: 20px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    border: 1px solid $border-base;
    border-left: none;
    margin-right: 10px;
    opacity: 0.6;
    transition: all ease 0.5s;
  }
  &__name {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
