<template>
  <div class="numeric-view">
    <span class="numeric-view__text">{{ name }}</span>
    &nbsp;is <span v-if="isBetween">between</span>
    <span class="numeric-view__text"> {{ data[0] }} </span> &nbsp;&nbsp;
    <span v-if="isBetween">and</span>
    <span class="numeric-view__text"> {{ data[1] }}</span>
  </div>
</template>

<script>
export default {
  name: "NumericView",
  props: {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  computed: {
    isBetween() {
      return this.data[0] && this.data[1]
    }
  }
}
</script>

<style lang="scss">
.numeric-view {
  text-align: left;
  padding: 5px 10px;
  &__text {
    font-weight: 600;
  }
}
</style>
