<template>
  <div class="variants-filter">
    <div v-if="loadView" class="load-view">
      <LoadView @close="loadView = false" />
    </div>
    <div v-else class="conditions-view">
      <div class="second-header">
        <VariantsFilterSecondHeader @showLoadView="loadView = true" />
      </div>
      <div class="variants-filter-content">
        <div class="stats-list-view default-scroll">
          <StatsList />
        </div>
        <div class="conditions-view default-scroll">
          <ConditionsView />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VariantsFilterSecondHeader from "~/components/view/filter/VariantsFilterSecondHeader.vue"
import StatsList from "~/components/view/filter/stats/StatsList.vue"
import ConditionsView from "~/components/view/filter/conditions/ConditionsView.vue"
import LoadView from "~/components/view/filter/load-view/LoadView.vue"
export default {
  name: "VariantsFilter",
  components: {
    LoadView,
    ConditionsView,
    StatsList,
    VariantsFilterSecondHeader
  },
  data() {
    return {
      loadView: false,
      advancedView: false
    }
  }
}
</script>

<style lang="scss">
.variants-filter {
  height: 100%;
}
.load-view {
  height: 100%;
}
.conditions-view {
  height: 100%;
  .second-header {
    width: 100%;
    height: 8%;
  }
  .variants-filter-content {
    width: 100%;
    height: 92%;
    display: flex;
    justify-content: center;
    align-items: center;
    .stats-list-view {
      width: 30%;
      height: 100%;
    }
    .conditions-view {
      width: 70%;
      height: 100%;
    }
    .default-scroll {
      &::-webkit-scrollbar {
        width: 5px;
      }
    }
  }
}
</style>
