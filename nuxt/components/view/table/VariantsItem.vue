<template>
  <div
    class="variant-item"
    tabindex="-1"
    :class="getSelectedVariantClass(item)"
    @click="getVariantsDetails"
  >
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
  computed: {
    getSelectedVariantClass() {
      return item => {
        return this.$store.getters.getSelectedVariantId === item.id
          ? "variant-item__active"
          : ""
      }
    }
  },
  methods: {
    getTypeIcon(color) {
      return "background-color: " + color + ";"
    },
    getVariantsDetails() {
      if (this.getSelectedVariantsId !== this.item.id) {
        if (this.item.details === null) {
          this.$store.dispatch("getVariantDetails", this.item.id)
          this.$store.dispatch("getVariantTagsAndNote", this.item.id)
        }
        this.$store.commit("setSelectedVariantId", this.item.id)
      }
    }
  }
}
</script>

<style lang="scss">
.variant-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  border-bottom: 1px solid $border-base;
  transition: all ease 0.3s;
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
  &__active {
    color: $default-color;
    background-color: $primary-color;
    &:hover {
      color: $default-color;
      background-color: $primary-color;
    }
    .variant-item__type {
      opacity: 1;
      width: 30px;
    }
  }
  &:hover {
    color: $primary-color;
    background-color: $light-color;
  }
}
</style>
