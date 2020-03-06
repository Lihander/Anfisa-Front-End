<template>
  <div class="quick-filter">
    <div class="header">
      <div class="header__title">
        FILTERS
      </div>
    </div>
    <div class="filters-list">
      <AppMultiselect
        :selected-values="selectedPreset"
        :items="presets"
        :placeholder="getLabel('Preset')"
        :loading="presetsLoading"
        :searchable="false"
        :close-on-select="true"
        :show-labels="false"
        @onChange="presetChanged"
      />
      <div v-for="(zone, index) in zones" :key="index" class="filter">
        <AppMultiselect
          :selected-values="zone.selectedValues"
          :items="zone.values"
          :placeholder="getLabel(zone.defaultValue)"
          :loading="zone.zoneLoading"
          :multiple="true"
          :close-on-select="false"
          :clear-on-select="false"
          :preserve-search="true"
          @onChange="zoneChanged(zone, ...arguments)"
        >
        </AppMultiselect>
      </div>
    </div>
    <div class="footer">
      <AppButton class="footer__btn" :btn-class="'btnPrimary'">
        CUSTOM FILTER
      </AppButton>
    </div>
  </div>
</template>

<script>
import AppButton from "~/components/UI/Controls/Button.vue"
import AppMultiselect from "~/components/UI/Controls/Multiselect.vue"

export default {
  name: "QuickFilterView",
  components: { AppButton, AppMultiselect },
  data() {
    return {
      showQuickFilterViewIcon: ["fas", "filter"],
      hideQuickFilterViewIcon: ["fas", "times"],
      saveNoteIcon: ["fas", "save"],
      isQuickFilterViewShow: false
    }
  },
  computed: {
    presets() {
      const presets = this.$store.getters.getPresets
      return presets.map(preset => {
        if (!preset) {
          return ""
        }
        return preset
      })
    },
    presetsLoading() {
      return this.$store.getters.getPresetsLoading
    },
    selectedPreset() {
      return this.$store.getters.getSelectedPreset
    },
    zones() {
      return this.$store.getters.getZones
    }
  },
  methods: {
    getLabel(name) {
      return "Select " + name
    },
    presetChanged(newPreset) {
      this.$store.commit("setSelectedPreset", newPreset)
      this.$store.dispatch("getWorkspaceDetails", {
        ws: this.$store.getters.getSelectedWorkspace,
        selectedPreset: newPreset,
        zones: this.$store.getters.getZones
      })
    },
    zoneChanged(zone, values) {
      zone.selectedValues = values
      this.$store.commit("setZone", zone)
      this.$store.dispatch("getWorkspaceDetails", {
        ws: this.$store.getters.getSelectedWorkspace,
        selectedPreset: this.$store.getters.getSelectedPreset,
        zones: this.$store.getters.getZones
      })
    }
  }
}
</script>

<style lang="scss">
.quick-filter {
  width: 400px;
  padding: 5px 15px 15px 15px;
  background-color: $default-color;
  border: 5px solid $accent-color;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 5px;
    &__title {
      font-size: 20px;
      font-weight: 800;
      color: $primary-color;
    }
  }
  .filters-list {
    padding: 5px 0;
    .filter {
      margin: 10px 0;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    align-items: center;
    &__btn {
      width: 200px;
      font-size: 16px;
    }
  }
}
</style>
