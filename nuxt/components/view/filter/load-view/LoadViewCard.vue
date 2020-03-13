<template>
  <div v-if="isLoaded" class="load-view-card">
    <div class="card-header">
      <div class="card-info">
        <div class="card-title">
          {{ filter.name }}
        </div>
        <div class="card-date">
          <span v-if="!filter.isCommon">{{ filter.date }}</span>
          <span v-else>System Defined</span>
        </div>
      </div>
      <div class="card-btns">
        <AppButton class="card-btn" btn-class="btnPrimary" @click="loadFilter">
          LOAD
        </AppButton>
        <AppButton
          v-if="!filter.isCommon"
          class="card-btn"
          btn-class="btnDanger"
          @click="removeFilter"
        >
          REMOVE
        </AppButton>
      </div>
    </div>
    <div class="card-content">
      <div
        v-for="(condition, index) in filter.conditions"
        :key="index"
        class="condition-info"
      >
        <NumericView
          v-if="condition[0] === constants.numeric"
          :name="condition[1]"
          :data="condition[2]"
        />
        <LoadViewCardContent v-else :condition="condition" />
      </div>
    </div>
  </div>
</template>

<script>
import { STAT_NUMERIC } from "~/assets/js/constants.js"
import AppButton from "~/components/UI/Controls/Button.vue"
import NumericView from "~/components/view/filter/conditions/NumericView.vue"
import LoadViewCardContent from "./LoadViewCardContent"
export default {
  name: "LoadViewCard",
  components: {
    LoadViewCardContent,
    NumericView,
    AppButton
  },
  props: {
    filter: {
      type: Object,
      required: true
    }
  },
  computed: {
    constants() {
      return {
        numeric: STAT_NUMERIC
      }
    },
    isLoaded() {
      return this.filter.conditions && this.filter.conditions.length > 0
    }
  },
  methods: {
    loadFilter() {},
    removeFilter() {}
  }
}
</script>

<style lang="scss">
.card-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  .card-info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px 0;
    .card-title {
      font-size: 18px;
      font-weight: 600;
    }
    .card-date {
      margin-left: 20px;
      color: $neutral-placeholder;
      font-size: 16px;
    }
  }
  .card-btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .card-btn {
      width: 100px;
      margin: 0 20px;
      font-size: 14px;
    }
  }
}

.card-content {
  padding: 10px 20px;
  font-size: 16px;
  background-color: $border-lightex;
}
</style>
