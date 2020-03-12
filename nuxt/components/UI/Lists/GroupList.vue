<template>
  <div class="group">
    <div
      class="title"
      :class="getCollapsedClass"
      @click="collapseGroup = !collapseGroup"
    >
      <div class="preTitleControls">
        <slot name="preTitleControls" />
      </div>
      <p>{{ group }}</p>
      <CollapseButton
        :btn-class="'btnPrimaryWithoutBorder'"
        :value="collapseGroup"
        :show-icon="showIcon"
        :hide-icon="hideIcon"
      />
    </div>
    <div v-if="getCollapseGroup" class="items">
      <slot name="items" />
    </div>
  </div>
</template>

<script>
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"

export default {
  name: "GroupList",
  components: { CollapseButton },
  props: {
    group: {
      type: String,
      required: true
    },
    showIcon: {
      type: Array,
      default() {
        return ["fas", "caret-square-down"]
      }
    },
    hideIcon: {
      type: Array,
      default() {
        return ["fas", "caret-square-up"]
      }
    }
  },
  data() {
    return {
      collapseGroup: false
    }
  },
  computed: {
    getCollapseGroup() {
      return this.collapseGroup
    },
    getCollapsedClass() {
      return this.getCollapseGroup ? "active" : ""
    }
  }
}
</script>

<style lang="scss">
.group {
  border-bottom: 1px solid $border-base;
  cursor: pointer;
  .title {
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover {
      color: $primary-color;
      background-color: $light-color;
    }
    p {
      width: 90%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 16px;
      margin-bottom: 0;
    }
    button {
      width: 10%;
    }
  }
  .active {
    color: $primary-color;
    background-color: $light-color;
  }
}
</style>
