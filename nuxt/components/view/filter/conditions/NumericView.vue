<template>
  <div class="numeric-view">
    <span class="numeric-view__text">{{ name }}</span>
    &nbsp;is between&nbsp;
    <span class="numeric-view__text"> {{ data[0] }} </span>
    &nbsp;and&nbsp;
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
