<template>
  <div class="conditions">
    <div
      v-for="(condition, index) in currentConditions"
      :key="index"
      class="condition-view-item"
    >
      <ConditionViewWrapper @remove="remove(index)">
        <EnumView
          v-if="isEnumItem(condition) || isZygosity(condition)"
          :condition="condition"
          :condition-index="index"
        />
        <NumericView
          v-else-if="isNumeric(condition)"
          :name="condition[1]"
          :data="condition[2]"
        />
      </ConditionViewWrapper>
    </div>
  </div>
</template>

<script>
import {
  STAT_TYPE_ZYGOSITY,
  STAT_TYPE_ENUM,
  STAT_NUMERIC,
  STAT_TYPE_STATUS
} from "~/assets/js/constants.js"
import ConditionViewWrapper from "~/components/view/filter/conditions/ConditionViewWrapper.vue"
import EnumView from "~/components/view/filter/conditions/EnumView.vue"
import NumericView from "~/components/view/filter/conditions/NumericView"
export default {
  name: "ConditionsView",
  components: { NumericView, EnumView, ConditionViewWrapper },
  computed: {
    currentConditions() {
      return this.$store.getters.getCurrentConditionsArray
    }
  },
  methods: {
    isEnumItem(condition) {
      return (
        condition[0] === STAT_TYPE_ENUM || condition[0] === STAT_TYPE_STATUS
      )
    },
    isNumeric(condition) {
      return condition[0] === STAT_NUMERIC
    },
    isZygosity(condition) {
      return condition[0] === STAT_TYPE_ZYGOSITY
    },
    remove(index) {
      this.$store.commit("removeConditionsByIndex", index)
    }
  }
}
</script>

<style lang="scss"></style>
