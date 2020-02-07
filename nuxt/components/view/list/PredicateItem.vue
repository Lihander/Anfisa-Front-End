<template>
  <div v-if="predicateData" class="predicate">
    <div class="predicate__icon" :class="getColor(predicateData)">
      <svg
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="50" cy="50" r="50" />
      </svg>
    </div>
    <BaseListItem
      :title="predicateTitle"
      :data="predicateData"
      class="predicate__data"
    />
  </div>
</template>

<script>
import BaseListItem from "~/components/UI/Lists/BaseListItem.vue"
export default {
  name: "PredicateItem",
  components: { BaseListItem },
  props: {
    predicateTitle: {
      type: String,
      required: true
    },
    predicateData: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      greenColorValues: [
        "benign",
        "B",
        "tolerated",
        "T",
        "P",
        "N",
        "L",
        "tolerated_low_confidence"
      ],
      yellowColorValues: ["possibly_damaging", "probably_damaging"],
      redColorValues: ["damaging", "D", "deleterious", "D", "A", "M", "H"]
    }
  },
  computed: {
    getColor() {
      return values => {
        let result = ""
        const value = values.split(",")[0]
        if (this.greenColorValues.includes(value)) {
          result = "predicate__icon__green"
        } else if (this.yellowColorValues.includes(value)) {
          result = "predicate__icon__yellow"
        } else if (this.redColorValues.includes(value)) {
          result = "predicate__icon__red"
        } else {
          result = "predicate__icon__undefined"
        }
        return result
      }
    }
  }
}
</script>

<style lang="scss">
.predicate {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
  padding-left: 25px;
  &__icon {
    position: absolute;
    left: 0;
    width: 20px;
    border-radius: 50%;
    margin-right: 5px;
    &__green {
      fill: $success-color;
    }
    &__yellow {
      fill: $warning-color;
    }
    &__red {
      fill: $danger-color;
    }
    &__undefined {
      fill: rgba(0, 0, 0, 0);
    }
  }
}
</style>
