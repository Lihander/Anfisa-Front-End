<template>
  <div class="item">
    <EnumItem
      v-if="isEnumItem"
      :stat="stat"
      :selected="selected"
      :button-text="buttonText"
    />
    <CoordinateItem
      v-else-if="isCoordinateItem"
      :stat="stat"
      :button-text="buttonText"
      :selected="selected"
    />
    <LinearItem
      v-else-if="isLinear"
      :is-simple="isSimple"
      :step="step"
      :stat="stat"
      :button-text="buttonText"
      :selected="selected"
    />
    <LinearItem
      v-else-if="isLogarithmic"
      :is-logarithmic="true"
      :min="0"
      :max="1"
      :stat="stat"
      :button-text="buttonText"
      :selected="selected"
    />
  </div>
</template>

<script>
import {
  STAT_TYPE_INT,
  STAT_TYPE_ENUM,
  STAT_TYPE_STATUS,
  ENUM_DEFAULT_OPERATOR,
  STAT_NUMERIC,
  STAT_TYPE_ZYGOSITY,
  STAT_TYPE_TRANSCRIPT_MULTISET,
  STAT_TYPE_TRANSCRIPT_STATUS,
  NUMERIC_RENDER_TYPES
} from "~/assets/js/constants.js"
import EnumItem from "~/components/view/filter/stats/EnumItem.vue"
import CoordinateItem from "~/components/view/filter/stats/CoordinateItem.vue"
import LinearItem from "~/components/view/filter/stats/LinearItem.vue"

export default {
  name: "StatsItem",
  components: {
    LinearItem,
    CoordinateItem,
    EnumItem
  },
  props: {
    stat: {
      type: Object,
      required: true
    }
  },
  computed: {
    selected() {
      const selectedConditions = this.$store.getters.getConditionsByName(
        this.stat.name
      )
      if (this.stat.type === STAT_TYPE_ENUM && selectedConditions) {
        return selectedConditions[3]
      } else if (this.stat.type === STAT_TYPE_ZYGOSITY && selectedConditions) {
        return selectedConditions[4]
      } else if (selectedConditions) {
        return selectedConditions[2]
      }
      return []
    },
    statTypes() {
      return {
        int: STAT_TYPE_INT,
        enum: STAT_TYPE_ENUM,
        status: STAT_TYPE_STATUS,
        zygosity: STAT_TYPE_ZYGOSITY,
        transcript_multiset: STAT_TYPE_TRANSCRIPT_MULTISET,
        transcript_status: STAT_TYPE_TRANSCRIPT_STATUS,
        linear: NUMERIC_RENDER_TYPES.LINEAR,
        coordinate: NUMERIC_RENDER_TYPES.COORDINATE,
        logarithmic: NUMERIC_RENDER_TYPES.LOGARITHMIC
      }
    },
    isEnumItem() {
      const type = this.stat.type
      const enumTypes = [
        this.statTypes.status,
        this.statTypes.enum,
        this.statTypes.transcript_multiset,
        this.statTypes.transcript_status,
        this.statTypes.zygosity
      ]
      return enumTypes.includes(type)
    },
    isCoordinateItem() {
      const render = this.stat.render
      return render && render === this.statTypes.coordinate
    },
    isLinear() {
      return (
        this.stat.render === this.statTypes.linear ||
        this.isSimple ||
        (this.isInt && this.stat.render === this.statTypes.logarithmic)
      )
    },
    isLogarithmic() {
      return (
        this.stat.type !== this.statTypes.int &&
        this.stat.render === this.statTypes.logarithmic
      )
    },
    isInt() {
      return this.stat.type === this.statTypes.int
    },
    isSimple() {
      return this.stat.name === "Dist_from_Exon"
    },
    buttonText() {
      const currentConditions = this.$store.getters.getConditionsByName(
        this.stat.name
      )
      return currentConditions ? "UPDATE" : "ADD"
    },
    step() {
      if (!this.isInt) {
        const min = this.stat.data[0].toString()
        const minDecimal =
          min.indexOf(".") !== -1 ? min.split(".")[1].length : 0
        const max = this.stat.data[1].toString()
        const maxDecimal =
          max.indexOf(".") !== -1 ? max.split(".")[1].length : 0
        const decimal = minDecimal > maxDecimal ? minDecimal : maxDecimal
        return decimal === 0 ? 1 : 1 / Math.pow(10, decimal)
      }
      return 1
    }
  }
}
</script>

<style lang="scss">
.item {
  background-color: $default-color;
  border-radius: 5px;
  margin: 10px 10px 10px 20px;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
}
</style>
