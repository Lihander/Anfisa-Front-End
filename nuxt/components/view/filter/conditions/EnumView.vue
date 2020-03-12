<template>
  <div class="enum-view">
    <div class="condition">
      <div class="condition__name">
        {{ condition[1] }}
      </div>
      <div v-if="!isZygosity && condition[2]" class="condition__operator">
        is
        <Multiselect
          v-model="operators[selectedOperator]"
          class="condition__select"
          :options="options"
          :searchable="false"
          :close-on-select="true"
          :show-labels="false"
        />
        of the following:
      </div>
    </div>
    <div class="enum-view-list">
      <div v-for="(item, index) in items" :key="index" class="conditions-item">
        {{ item }}
        <AppButton
          class="remove-btn"
          :btn-class="'btnDangerWithoutBorder'"
          @click="removeConditionItem(index)"
        >
          <font-awesome-icon :icon="removeIcon" />
        </AppButton>
      </div>
    </div>
  </div>
</template>

<script>
import {
  STAT_TYPE_ENUM,
  LOGICAL_OPERATORS,
  LOGICAL_OPERATORS_STATUS,
  STAT_TYPE_ZYGOSITY
} from "~/assets/js/constants.js"
import Multiselect from "vue-multiselect"
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "EnumView",
  components: { Multiselect, AppButton },
  props: {
    condition: {
      type: Array,
      required: true
    },
    conditionIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      removeIcon: ["fas", "times"],
      selectedOperator: this.condition[2],
      operators:
        this.condition[0] === STAT_TYPE_ENUM
          ? LOGICAL_OPERATORS
          : LOGICAL_OPERATORS_STATUS
    }
  },
  computed: {
    items() {
      if (this.isZygosity) {
        return this.condition[4]
      }
      return this.condition[3]
    },
    options() {
      return Object.entries(this.operators).map(operator => {
        return operator[1]
      })
    },
    isZygosity() {
      return this.condition[0] === STAT_TYPE_ZYGOSITY
    }
  },
  methods: {
    removeConditionItem(index) {
      const conditionIndex = this.conditionIndex
      this.$store.commit("removeConditionsItemByIndex", {
        conditionIndex,
        index
      })
    }
  }
}
</script>

<style lang="scss">
.enum-view {
  padding: 5px 10px;
  .condition {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__name {
      font-weight: 600;
      margin-right: 5px;
    }
    &__operator {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      white-space: nowrap;
    }
    &__select {
      margin: 0 5px;
    }
  }
  .enum-view-list {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
    .conditions-item {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $neutral-placeholder;
      border-radius: 5px;
      padding: 5px 20px;
      margin: 5px;
      color: $default-color;
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      .remove-btn {
        font-size: 18px;
        margin-left: 10px;
        padding: 0;
      }
    }
  }
}
</style>
