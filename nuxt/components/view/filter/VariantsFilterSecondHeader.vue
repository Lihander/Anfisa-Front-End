<template>
  <div class="variant-filter-second-header">
    <div class="filter-info">
      <div class="filter-status">
        New Filter
      </div>
      <div class="v-separator"></div>
      <div class="filter-counter">
        <span>{{ activeFilters }}</span>
        {{ activeFilterLabel }}
      </div>
      <div class="clear-btn">
        <AppButton
          :btn-class="'btnDanger'"
          :disabled="activeFilters === 0"
          @click="clearAllConditions"
        >
          <font-awesome-icon :icon="['fas', 'times-circle']" />
          <span>Clear All</span>
        </AppButton>
      </div>
    </div>
    <div class="save-load-btns">
      <AppButton :btn-class="'btnSuccess'" :disabled="activeFilters === 0">
        <font-awesome-icon :icon="['fas', 'save']" />
        <span>Save</span>
      </AppButton>
      <AppButton :btn-class="'btnAccent'">
        <font-awesome-icon :icon="['fas', 'folder']" />
        <span>Load</span>
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "VariantsFilterSecondHeader",
  components: { AppButton },
  computed: {
    activeFilters() {
      return this.$store.getters.getCurrentConditionsArray.length
    },
    activeFilterLabel() {
      if (this.activeFilters > 1) {
        return "Active Filters"
      }
      return "Active Filter"
    }
  },
  methods: {
    clearAllConditions() {
      this.$store.commit("setAllCurrentConditions", [])
    }
  }
}
</script>

<style lang="scss">
.variant-filter-second-header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $primary-color;
  font-size: 18px;
  white-space: nowrap;
  color: $default-color;
  .btn {
    border-radius: 20px;
    span {
      margin-left: 7px;
      margin-right: 5px;
    }
  }
  .filter-info {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .filter-status {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 5px 20px;
    }
    .v-separator {
      height: 100%;
      width: 1px;
      border-right: 1px dotted $neutral-placeholder;
    }
    .filter-counter {
      padding: 5px 20px;
      span {
        font-weight: 800;
      }
    }
    .clear-btn {
      width: 150px;
      margin: 0 10px;
      button[disabled] {
        border: 1px solid $secondary-color;
        background-color: $secondary-color;
        color: $primary-color;
      }
    }
  }
  .save-load-btns {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 20px;
    .btn {
      width: 110px;
      margin: 0 10px;
    }
    button[disabled] {
      border: 1px solid $secondary-color;
      background-color: $secondary-color;
      color: $primary-color;
    }
  }
}
</style>
