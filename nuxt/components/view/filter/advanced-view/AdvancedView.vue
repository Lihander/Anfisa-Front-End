<template>
  <div class="advanced">
    <AdvancedToolbar
      @close="$emit('close')"
      @openParams="openParams"
      @applyChanges="applyChanges"
      @resetChanges="resetChanges"
    />
    <div class="advanced-content">
      <div class="advanced-filters">
        <div
          v-for="(rule, index) in rulesData"
          :key="index + '-' + rule"
          :class="[
            rule[0] === selectedRule ? 'advanced-filters_selected' : '',
            'advanced-filters__item'
          ]"
          @click="() => openData(index)"
        >
          {{ rule[0] }}
        </div>
      </div>
      <div class="advanced-editor">
        <textarea v-model="selectedData" @keydown.stop />
      </div>
    </div>
  </div>
</template>

<script>
import AdvancedToolbar from "~/components/view/filter/advanced-view/AdvancedToolbar.vue"
export default {
  name: "AdvancedView",
  components: { AdvancedToolbar },
  data() {
    return {
      selectedRule: null,
      selectedData: null,
      paramsView: false
    }
  },
  computed: {
    rulesData() {
      return this.$store.getters.getRulesData
    },
    rulesParams() {
      return this.$store.getters.getRulesParams
    }
  },
  methods: {
    openData(index) {
      const [ruleName, data] = this.rulesData[index]
      this.selectedRule = ruleName
      this.selectedData = data
      this.paramsView = false
    },
    openParams() {
      this.selectedRule = null
      this.paramsView = true
      this.selectedData = this.rulesParams
    },
    resetChanges() {
      if (this.paramsView) {
        this.paramsView = true
        this.selectedData = this.rulesParams
      } else {
        const [, data] = this.rulesData.find(
          rule => rule[0] === this.selectedRule
        )
        this.selectedData = data
      }
    },
    applyChanges() {
      const name = this.paramsView ? "--param" : this.selectedRule
      this.$store.dispatch("updateRules", {
        ws: this.$store.getters.getSelectedWorkspace,
        name,
        data: this.selectedData
      })
    }
  }
}
</script>

<style lang="scss">
.advanced {
  height: 100%;
  width: 100%;
  background-color: $default-color;
  .advanced-content {
    height: 93%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .advanced-filters {
      height: 100%;
      width: 30%;
      background-color: $border-lightex;
      &__item {
        cursor: pointer;
        padding: 6px 20px;
        &:hover {
          background-color: $accent-color;
        }
      }
      &_selected {
        background-color: $default-color;
      }
    }
    .advanced-editor {
      height: 100%;
      width: 70%;
      textarea {
        height: 100%;
        padding: 5px 15px;
        resize: none;
        border: none;
        &:focus {
          border: none;
          outline: none;
        }
      }
    }
  }
}
</style>
