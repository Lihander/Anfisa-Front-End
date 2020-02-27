<template>
  <div class="infinity-list__wrapper default-scroll" @scroll="onScroll">
    <slot />
  </div>
</template>

<script>
export default {
  name: "InfinityList",
  props: {
    itemPerPage: {
      type: Number,
      default() {
        return 10
      }
    }
  },
  data() {
    return {
      page: 1
    }
  },
  methods: {
    onScroll(event) {
      const el = event.target

      if (
        el.scrollTop + el.clientHeight >=
        el.scrollHeight - el.scrollHeight * 0.1
      ) {
        this.page = this.page + 1
        const lastElementIndex = this.itemPerPage * this.page
        this.$emit("updateList", lastElementIndex)
      }
    }
  }
}
</script>

<style lang="scss">
.infinity-list__wrapper {
  height: 100%;
}
</style>
