<template>
  <div class="group">
    <div
      class="title"
      :class="getCollapsedClass"
      @click="collapseGroup = !collapseGroup"
    >
      <p>{{ group }}</p>
      <CollapseButton
        :btn-class="'btnPrimaryWithoutBorder'"
        :value="collapseGroup"
        :show-icon="collapseShowIcon"
        :hide-icon="collapseHideIcon"
      />
    </div>
    <div v-if="getCollapseGroup" class="items">
      <VariantsItem
        v-for="variant in getVariantsByGroup[group]"
        :key="variant.id"
        :item="variant"
        tabindex="-1"
      />
    </div>
  </div>
</template>

<script>
import CollapseButton from "~/components/UI/Controls/CollapseButton.vue"
import VariantsItem from "~/components/view/table/VariantsItem.vue"
export default {
  name: "VariantsGroup",
  components: { VariantsItem, CollapseButton },
  props: {
    group: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      collapseGroup: false,
      collapseShowIcon: ["fas", "chevron-circle-down"],
      collapseHideIcon: ["fas", "chevron-circle-up"]
    }
  },
  computed: {
    getCollapseGroup() {
      return this.collapseGroup
    },
    getVariantsByGroup() {
      return this.$store.getters.getVariantsByGroups
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
