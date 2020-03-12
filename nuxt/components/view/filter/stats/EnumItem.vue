<template>
  <div class="enum-item">
    <div v-if="showEnumHeader" class="enum-header">
      <SearchLine
        v-if="stat.data.length > 10"
        v-model="search"
        class="enum-header__search"
      />
      <BaseCheckbox
        v-if="!isOperativeRender"
        v-model="selectAll"
        class="enum-header__checkbox"
        :label="selectAllLabel"
      />
    </div>
    <div v-else class="zygosity-header">
      <BaseCheckbox
        v-for="(item, index) in stat.data.family"
        :key="index"
        :checked="selectedFamily.includes(index)"
        class="enum-header__checkbox"
        :label="item"
        @change="changeFamily(index)"
      />
    </div>
    <div class="enum-list default-scroll">
      <div v-for="(data, index) in items" :key="index" class="enum-item-data">
        <BaseCheckbox
          class="enum-item-data__checkbox"
          :checked="selectedConditions.includes(data[0])"
          @change="changeConditions(data[0])"
        >
          <div slot="label" class="label-content">
            <div class="label-content__name">
              {{ data[0] }}
            </div>
            <span v-if="data[1]">({{ data[1] }})</span>
          </div>
        </BaseCheckbox>
      </div>
    </div>
    <AppButton
      class="save-button"
      :btn-class="'btnPrimary'"
      @click="saveConditions"
    >
      {{ buttonText }}
    </AppButton>
  </div>
</template>

<script>
import {
  STAT_TYPE_ZYGOSITY,
  STAT_TYPE_ENUM,
  ENUM_DEFAULT_OPERATOR,
  RENDER_OPERATIVE
} from "~/assets/js/constants.js"
import SearchLine from "~/components/UI/Controls/SearchLine.vue"
import BaseCheckbox from "~/components/UI/Controls/BaseCheckbox.vue"
import AppButton from "~/components/UI/Controls/Button.vue"
export default {
  name: "EnumItem",
  components: { BaseCheckbox, SearchLine, AppButton },
  props: {
    stat: {
      type: Object,
      required: true
    },
    selected: {
      type: Array,
      default() {
        return []
      }
    },
    buttonText: {
      type: String,
      default() {
        return "ADD"
      }
    }
  },
  data() {
    return {
      search: "",
      selectAll: false,
      selectAllLabel: "Select All",
      selectedFamily: this.stat.data.selectedFamily
        ? this.stat.data.selectedFamily.slice()
        : [],
      selectedConditions: this.selected.slice() || []
    }
  },
  computed: {
    items() {
      const nonzeroOnly = this.$store.getters.getNonzeroOnly
      let items = []
      if (this.stat.type !== STAT_TYPE_ZYGOSITY) {
        items = this.stat.data
      } else {
        items = this.stat.data.variants
      }
      return items.filter(
        item =>
          item[0].toLowerCase().includes(this.search) &&
          !(nonzeroOnly && item[1] === 0)
      )
    },
    showEnumHeader() {
      return this.stat.type !== STAT_TYPE_ZYGOSITY
    },
    isOperativeRender() {
      return this.stat.render && this.stat.render === RENDER_OPERATIVE
    }
  },
  watch: {
    selected(value) {
      this.selectedConditions = value
    },
    selectAll(value) {
      if (value) {
        this.selectedConditions = this.items.map(item => {
          return item[0]
        })
      } else {
        this.selectedConditions = []
      }
    }
  },
  methods: {
    changeFamily(index) {
      if (this.selectedFamily.includes(index)) {
        this.selectedFamily.splice(this.selectedFamily.indexOf(index), 1)
      } else {
        this.selectedFamily = this.selectedFamily.concat(index)
      }
      this.selectedConditions = []
      this.$store.dispatch("updateZygosityByName", {
        family: this.selectedFamily,
        name: this.stat.name
      })
    },
    changeConditions(name) {
      if (this.selectedConditions.includes(name)) {
        this.selectedConditions = JSON.parse(
          JSON.stringify(this.selectedConditions)
        )
        this.selectedConditions.splice(this.selectedConditions.indexOf(name), 1)
      } else {
        this.selectedConditions = this.selectedConditions.concat(name)
      }
    },
    saveConditions() {
      if (this.selectedConditions.length === 0) {
        this.$store.commit("resetConditionsByName", this.stat.name)
        return
      }
      const condition =
        this.stat.type === STAT_TYPE_ENUM
          ? [
              STAT_TYPE_ENUM,
              this.stat.name,
              ENUM_DEFAULT_OPERATOR,
              this.selectedConditions
            ]
          : [
              STAT_TYPE_ZYGOSITY,
              this.stat.name,
              this.selectedFamily,
              "",
              this.selectedConditions
            ]
      this.$store.commit("setCurrentConditions", condition)
    }
  }
}
</script>

<style lang="scss">
.enum-header {
  padding: 5px 10px;
  border-bottom: 1px dotted $neutral-placeholder;
  &__checkbox {
    width: 40%;
    margin: 5px auto;
  }
}
.zygosity-header {
  padding: 5px 10px;
  border-bottom: 1px dotted $neutral-placeholder;
}
.enum-list {
  max-height: 300px;
  padding: 5px 10px;
  .enum-item-data {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    &__checkbox {
      width: 100%;
      label {
        width: 100%;
        .label-content {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
      }
    }
  }
}
.save-button {
  border-top-right-radius: 0;
  border-top-left-radius: 0;
}
</style>
