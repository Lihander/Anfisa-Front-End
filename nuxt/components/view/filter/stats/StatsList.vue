<template>
  <div class="stats-list">
    <div class="search-line">
      <SearchLine v-model="searchQuery" />
    </div>
    <div class="controls">
      <div class="nonzero">
        <BaseCheckbox v-model="isNonzeroOnly" :label="nonzeroLabel" />
      </div>
      <div class="collapse-buttons">
        <AppButton
          class="collapse-button"
          :btn-class="'btnPrimaryWithoutBorder'"
          @click="changeAllStatsCollapse(true)"
        >
          <font-awesome-icon :icon="expandAllIcon" />
        </AppButton>
        <AppButton
          class="collapse-button"
          :btn-class="'btnPrimaryWithoutBorder'"
          @click="changeAllStatsCollapse(false)"
        >
          <font-awesome-icon :icon="compressAllIcon" />
        </AppButton>
      </div>
    </div>
    <div class="stats">
      <div v-for="stat in stats" :key="stat.name" class="stats-item">
        <GroupList :group="stat.title || stat.name">
          <div slot="preTitleControls">
            <BaseCheckbox
              :checked="hasCurrentConditions(stat)"
              :disabled="true"
            />
          </div>
          <div slot="items">
            <div v-if="stat.type === 'group'" class="stats-group">
              <GroupList
                v-for="subStat in stat.data"
                :key="subStat.name"
                :group="subStat.title || subStat.name"
                :show-icon="groupShowIcon"
                :hide-icon="groupHideIcon"
              >
                <div slot="preTitleControls">
                  <BaseCheckbox
                    :checked="hasCurrentConditions(subStat)"
                    :disabled="true"
                  />
                </div>
                <div slot="items">
                  <StatsItem :stat="subStat" />
                </div>
              </GroupList>
            </div>
            <StatsItem :stat="stat" />
          </div>
        </GroupList>
      </div>
    </div>
  </div>
</template>

<script>
import { STAT_GROUP } from "~/assets/js/constants.js"
import SearchLine from "~/components/UI/Controls/SearchLine.vue"
import AppButton from "~/components/UI/Controls/Button.vue"
import BaseCheckbox from "~/components/UI/Controls/BaseCheckbox.vue"
import GroupList from "~/components/UI/Lists/GroupList.vue"
import StatsItem from "~/components/view/filter/stats/StatsItem.vue"

export default {
  name: "StatsList",
  components: { StatsItem, GroupList, BaseCheckbox, SearchLine, AppButton },
  data() {
    return {
      expandAllIcon: ["fas", "expand-arrows-alt"],
      compressAllIcon: ["fas", "compress-arrows-alt"],
      groupShowIcon: ["fas", "caret-down"],
      groupHideIcon: ["fas", "caret-up"],
      nonzeroLabel: "Nonzero Only",
      searchQuery: ""
    }
  },
  computed: {
    isNonzeroOnly: {
      get() {
        return this.$store.getters.getNonzeroOnly
      },
      set(value) {
        this.$store.commit("setNonzeroOnly", value)
      }
    },
    stats() {
      return this.searchQuery
        ? this.$store.getters.getFilteredStats(this.searchQuery)
        : this.$store.getters.getStats
    },
    hasCurrentConditions() {
      const vm = this
      return stat => {
        const currentConditions = vm.$store.getters.getCurrentConditions
        return Boolean(
          currentConditions[stat.name] ||
            (stat.type === STAT_GROUP &&
              stat.data.filter(subStat => currentConditions[subStat.name])
                .length)
        )
      }
    }
  },
  methods: {
    changeAllStatsCollapse(collapseStats) {
      // const selectedVariantId = this.$store.getters.getSelectedVariantId
      // this.$store.commit("setCollapseStatsById", {
      //   selectedVariantId,
      //   collapseStats
      // })
    }
  }
}
</script>

<style lang="scss">
.stats-list {
  min-height: 100%;
  width: 100%;
  background-color: $border-lightex;
  .search-line {
    padding: 5px 10px;
  }
  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px dotted $neutral-placeholder;
    border-bottom: 1px dotted $neutral-placeholder;
    .nonzero {
      width: 50%;
      padding: 5px 20px;
      border-right: 1px dotted $neutral-placeholder;
    }
    .collapse-buttons {
      width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .collapse-button {
        width: 10%;
        margin: 0 10px;
      }
    }
  }
  .stats-group {
    padding: 5px 20px;
    .group {
      &:last-child {
        border: none;
      }
      .title {
        p {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
