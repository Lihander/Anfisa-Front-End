<template>
  <div class="load-view-card-content">
    <span class="text">{{ name }}</span>
    &nbsp;=&nbsp;
    <span v-for="(item, index) in data" :key="item">
      <span class="text"> {{ item }}</span>
      <span v-if="index + 1 < data.length">
        &nbsp;
        <span v-if="!isZygosity">{{ operator }}</span>
        &nbsp;
      </span>
    </span>
  </div>
</template>

<script>
import { STAT_TYPE_ZYGOSITY } from "~/assets/js/constants.js"
export default {
  name: "LoadViewCardContent",
  props: {
    condition: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      type: this.condition[0],
      name: this.condition[1],
      operator: this.condition[2]
    }
  },
  computed: {
    isZygosity() {
      return this.condition[0] === STAT_TYPE_ZYGOSITY
    },
    data() {
      return this.isZygosity ? this.condition[4] : this.condition[3]
    }
  }
}
</script>

<style lang="scss">
.load-view-card-content {
  text-align: left;
  letter-spacing: 0;
  .text {
    font-weight: bold;
  }
}
</style>
