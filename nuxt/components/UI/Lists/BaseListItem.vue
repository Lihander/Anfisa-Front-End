<template>
  <div v-if="data" class="base-item">
    <div v-if="title" class="base-item__title">
      {{ getTitle }}
    </div>
    <div class="base-item__data">
      {{ data }}
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseListItem",
  props: {
    title: {
      type: String,
      default() {
        return ""
      }
    },
    data: {
      type: String,
      required: true
    }
  },
  computed: {
    getTitle() {
      return this.title + " :"
    }
  }
}
</script>

<style lang="scss">
.base-item {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &__title {
    font-weight: 800;
    white-space: nowrap;
  }
  &__data {
    margin-left: 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
